package managers

import (
	"context"
	"errors"
	"github.com/mateusrlopez/funcify/clients"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/managers/disconnects"
	"github.com/mateusrlopez/funcify/managers/healthchecks"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
	"github.com/rs/zerolog/log"
	"time"
)

type DataSourceConnection struct {
	Type       string
	Connection interface{}
}

var (
	ErrDataSourceNotImplemented = errors.New("given data source type is not yet implemented")
)

type DataSource interface {
	ExecuteExistingDataSources() error
	Run()
	Shutdown()
	RetrieveConnection(id string) DataSourceConnection
}

type dataSourceImplementation struct {
	dataSourceService                services.DataSources
	dataSourceCreateChan             chan entities.DataSource
	dataSourceUpdateChan             chan entities.DataSource
	dataSourceDeleteChan             chan entities.DataSource
	dataSourceHealthStatusChangeChan chan entities.DataSource
	shutdownChan                     chan bool
	dataSourceConnections            map[string]DataSourceConnection
	dataSourceDisconnectFnMap        map[string]disconnects.DisconnectFunction
	dataSourceHealthCheckCancelMap   map[string]context.CancelFunc
}

func NewDataSource(dataSourceService services.DataSources, dataSourceCreateChan, dataSourceUpdateChan, dataSourceDeleteChan, dataSourceHealthStatusChangeChan chan entities.DataSource) DataSource {
	return &dataSourceImplementation{
		dataSourceService:                dataSourceService,
		dataSourceCreateChan:             dataSourceCreateChan,
		dataSourceUpdateChan:             dataSourceUpdateChan,
		dataSourceDeleteChan:             dataSourceDeleteChan,
		dataSourceHealthStatusChangeChan: dataSourceHealthStatusChangeChan,
		shutdownChan:                     make(chan bool),
		dataSourceConnections:            make(map[string]DataSourceConnection),
		dataSourceDisconnectFnMap:        make(map[string]disconnects.DisconnectFunction),
		dataSourceHealthCheckCancelMap:   make(map[string]context.CancelFunc),
	}
}

func (mgr *dataSourceImplementation) ExecuteExistingDataSources() error {
	dataSources, err := mgr.dataSourceService.FindAll()

	if err != nil {
		return err
	}

	log.Debug().Int("total", len(dataSources)).Msg("starting the execution of the already existing data sources")

	for _, dataSource := range dataSources {
		mgr.handleNewDataSource(dataSource)
	}

	return nil
}

func (mgr *dataSourceImplementation) Run() {
	for {
		select {
		case dataSource := <-mgr.dataSourceCreateChan:
			go mgr.handleNewDataSource(dataSource)
		case dataSource := <-mgr.dataSourceUpdateChan:
			go mgr.handleUpdateDataSource(dataSource)
		case dataSource := <-mgr.dataSourceDeleteChan:
			go mgr.handleDeleteDataSource(dataSource)
		case <-mgr.shutdownChan:
			close(mgr.dataSourceCreateChan)
			close(mgr.dataSourceUpdateChan)
			close(mgr.dataSourceDeleteChan)

			for _, cancel := range mgr.dataSourceHealthCheckCancelMap {
				cancel()
			}

			for idx, disconnect := range mgr.dataSourceDisconnectFnMap {
				connection := mgr.dataSourceConnections[idx]
				disconnect(connection)
			}

			close(mgr.shutdownChan)
			return
		}
	}
}

func (mgr *dataSourceImplementation) Shutdown() {
	mgr.shutdownChan <- true
}

func (mgr *dataSourceImplementation) RetrieveConnection(id string) DataSourceConnection {
	return mgr.dataSourceConnections[id]
}

func (mgr *dataSourceImplementation) handleNewDataSource(dataSource entities.DataSource) {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of new data source")

	connection, err := mgr.connectionByDataSourceType(dataSource.Type, dataSource.Configuration)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return
	}

	mgr.dataSourceConnections[dataSource.ID] = DataSourceConnection{Type: dataSource.Type, Connection: connection}

	disconnectFn, err := mgr.disconnectFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return
	}

	mgr.dataSourceDisconnectFnMap[dataSource.ID] = disconnectFn

	healthCheckFn, err := mgr.healthCheckFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return
	}

	ctx, cancel := context.WithCancel(context.Background())
	mgr.dataSourceHealthCheckCancelMap[dataSource.ID] = cancel

	go mgr.healthCheck(dataSource, connection, healthCheckFn, ctx)

	log.Debug().Str("id", dataSource.ID).Msg("successfully started connection to the data source")
	return
}

func (mgr *dataSourceImplementation) handleUpdateDataSource(dataSource entities.DataSource) {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of update of a data source")

	connection := mgr.dataSourceConnections[dataSource.ID]

	disconnectFn := mgr.dataSourceDisconnectFnMap[dataSource.ID]
	disconnectFn(connection)

	cancel := mgr.dataSourceHealthCheckCancelMap[dataSource.ID]
	cancel()

	newConnection, err := mgr.connectionByDataSourceType(dataSource.Type, dataSource.Configuration)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return
	}

	mgr.dataSourceConnections[dataSource.ID] = DataSourceConnection{Type: dataSource.Type, Connection: newConnection}

	newDisconnectFn, err := mgr.disconnectFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return
	}

	mgr.dataSourceDisconnectFnMap[dataSource.ID] = newDisconnectFn

	healthCheckFn, err := mgr.healthCheckFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return
	}

	ctx, newCancel := context.WithCancel(context.Background())
	mgr.dataSourceHealthCheckCancelMap[dataSource.ID] = newCancel

	go mgr.healthCheck(dataSource, newConnection, healthCheckFn, ctx)

	log.Debug().Str("id", dataSource.ID).Msg("successfully updated connection to the data source")
	return
}

func (mgr *dataSourceImplementation) handleDeleteDataSource(dataSource entities.DataSource) {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of deletion of a data source")

	connection := mgr.dataSourceConnections[dataSource.ID]

	disconnectFn := mgr.dataSourceDisconnectFnMap[dataSource.ID]
	disconnectFn(connection)

	cancel := mgr.dataSourceHealthCheckCancelMap[dataSource.ID]
	cancel()

	log.Debug().Str("id", dataSource.ID).Msg("successfully deleted connection to the data source")
	return
}

func (mgr *dataSourceImplementation) connectionByDataSourceType(dataSourceType string, configuration map[string]interface{}) (interface{}, error) {
	switch dataSourceType {
	case entities.RedisDataSource:
		if err := settings.ValidateRawRedisDataSource(configuration); err != nil {
			return nil, err
		}

		s := settings.NewRedisDataSource(configuration)

		client, err := clients.NewRedis(s.Address, s.Username, s.Password, s.Database)

		if err != nil {
			return nil, err
		}

		return client, nil
	default:
		return nil, ErrDataSourceNotImplemented
	}
}

func (mgr *dataSourceImplementation) healthCheckFunctionByDataSourceType(dataSourceType string) (healthchecks.HealthCheckFn, error) {
	switch dataSourceType {
	case entities.RedisDataSource:
		return healthchecks.RedisHealthCheckFn, nil
	default:
		return nil, ErrDataSourceNotImplemented
	}
}

func (mgr *dataSourceImplementation) healthCheck(dataSource entities.DataSource, connection interface{}, healthCheckFn healthchecks.HealthCheckFn, ctx context.Context) {
	ticker := time.NewTicker(30 * time.Second)

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			log.Debug().Str("id", dataSource.ID).Msg("health checking a data source")

			if err := healthCheckFn(connection); err != nil && dataSource.HealthStatus != entities.UnhealthyDataSourceHealthStatus {
				log.Debug().Str("id", dataSource.ID).Msg("data source is now unhealthy")

				dataSource, err = mgr.dataSourceService.UpdateOne(dataSource, entities.DataSource{HealthStatus: entities.UnhealthyDataSourceHealthStatus})

				if err != nil {
					log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the health status of the data source in the database")
					return
				}

				mgr.dataSourceHealthStatusChangeChan <- dataSource
			} else if err == nil && dataSource.HealthStatus != entities.HealthyDataSourceHealthStatus {
				log.Debug().Str("id", dataSource.ID).Msg("data source is now healthy")

				dataSource, err = mgr.dataSourceService.UpdateOne(dataSource, entities.DataSource{HealthStatus: entities.HealthyDataSourceHealthStatus})

				if err != nil {
					log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the health status of the data source in the database")
					return
				}

				mgr.dataSourceHealthStatusChangeChan <- dataSource
			} else {
				log.Debug().Str("id", dataSource.ID).Msg("data source health status still the same")
			}
		}
	}
}

func (mgr *dataSourceImplementation) disconnectFunctionByDataSourceType(dataSourceType string) (disconnects.DisconnectFunction, error) {
	switch dataSourceType {
	case entities.RedisDataSource:
		return disconnects.RedisDisconnectionFn, nil
	default:
		return nil, ErrDataSourceNotImplemented
	}
}
