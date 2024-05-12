package managers

import (
	"context"
	"errors"
	"github.com/mateusrlopez/funcify/clients"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/managers/disconnectors"
	"github.com/mateusrlopez/funcify/managers/healthchecks"
	"github.com/mateusrlopez/funcify/repositories"
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
	HandleNewDataSource(dataSource entities.DataSource) error
	HandleUpdateDataSource(dataSource entities.DataSource) error
	HandleDeleteDataSource(dataSource entities.DataSource) error
	RetrieveConnection(id string) DataSourceConnection
	StartExistingDataSources() error
}

type dataSourceImplementation struct {
	dataSourceRepository             repositories.DataSources
	dataSourceHealthStatusChangeChan chan entities.DataSource
	dataSourceConnections            map[string]DataSourceConnection
	dataSourceDisconnectFnMap        map[string]disconnectors.DisconnectFunction
	dataSourceHealthCheckCancelMap   map[string]context.CancelFunc
}

func NewDataSource(dataSourceHealthStatusChangeChan chan entities.DataSource, dataSourceRepository repositories.DataSources) DataSource {
	return &dataSourceImplementation{
		dataSourceRepository:             dataSourceRepository,
		dataSourceHealthStatusChangeChan: dataSourceHealthStatusChangeChan,
		dataSourceConnections:            make(map[string]DataSourceConnection),
		dataSourceDisconnectFnMap:        make(map[string]disconnectors.DisconnectFunction),
		dataSourceHealthCheckCancelMap:   make(map[string]context.CancelFunc),
	}
}

func (mgr *dataSourceImplementation) StartExistingDataSources() error {
	dataSources, err := mgr.dataSourceRepository.FindAll()

	if err != nil {
		return err
	}

	for _, dataSource := range dataSources {
		if err = mgr.HandleNewDataSource(dataSource); err != nil {
			continue
		}
	}
	
	return nil
}

func (mgr *dataSourceImplementation) RetrieveConnection(id string) DataSourceConnection {
	return mgr.dataSourceConnections[id]
}

func (mgr *dataSourceImplementation) HandleNewDataSource(dataSource entities.DataSource) error {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of new data source")

	connection, err := mgr.connectionByDataSourceType(dataSource.Type, dataSource.Configuration)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return err
	}

	mgr.dataSourceConnections[dataSource.ID] = DataSourceConnection{Type: dataSource.Type, Connection: connection}

	disconnectFn, err := mgr.disconnectFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return err
	}

	mgr.dataSourceDisconnectFnMap[dataSource.ID] = disconnectFn

	healthCheckFn, err := mgr.healthCheckFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not start the new data source")
		return err
	}

	ctx, cancel := context.WithCancel(context.Background())
	mgr.dataSourceHealthCheckCancelMap[dataSource.ID] = cancel

	go mgr.healthCheck(dataSource, connection, healthCheckFn, ctx)

	log.Debug().Str("id", dataSource.ID).Msg("successfully started connection to the data source")
	return nil
}

func (mgr *dataSourceImplementation) HandleUpdateDataSource(dataSource entities.DataSource) error {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of update of a data source")

	newConnection, err := mgr.connectionByDataSourceType(dataSource.Type, dataSource.Configuration)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return err
	}

	newDisconnectFn, err := mgr.disconnectFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return err
	}

	oldConnection := mgr.dataSourceConnections[dataSource.ID]

	oldDisconnectFn := mgr.dataSourceDisconnectFnMap[dataSource.ID]
	if err = oldDisconnectFn(oldConnection); err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not disconnect to the data source")
		return err
	}

	oldCancel := mgr.dataSourceHealthCheckCancelMap[dataSource.ID]
	oldCancel()

	ctx, newCancel := context.WithCancel(context.Background())

	mgr.dataSourceConnections[dataSource.ID] = DataSourceConnection{Type: dataSource.Type, Connection: newConnection}
	mgr.dataSourceDisconnectFnMap[dataSource.ID] = newDisconnectFn
	mgr.dataSourceHealthCheckCancelMap[dataSource.ID] = newCancel

	newHealthCheckFn, err := mgr.healthCheckFunctionByDataSourceType(dataSource.Type)

	if err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the data source")
		return err
	}

	go mgr.healthCheck(dataSource, newConnection, newHealthCheckFn, ctx)

	log.Debug().Str("id", dataSource.ID).Msg("successfully updated connection to the data source")
	return nil
}

func (mgr *dataSourceImplementation) HandleDeleteDataSource(dataSource entities.DataSource) error {
	log.Debug().Str("id", dataSource.ID).Msg("starting handling of deletion of a data source")

	connection := mgr.dataSourceConnections[dataSource.ID]

	disconnectFn := mgr.dataSourceDisconnectFnMap[dataSource.ID]
	if err := disconnectFn(connection); err != nil {
		log.Error().Err(err).Str("id", dataSource.ID).Msg("could not disconnect to the data source")
		return err
	}

	cancel := mgr.dataSourceHealthCheckCancelMap[dataSource.ID]
	cancel()

	log.Debug().Str("id", dataSource.ID).Msg("successfully deleted connection to the data source")
	return nil
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
	case entities.MqttDataSource:
		return healthchecks.MqttHealthCheckFn, nil
	default:
		return nil, ErrDataSourceNotImplemented
	}
}

func (mgr *dataSourceImplementation) healthCheck(dataSource entities.DataSource, connection interface{}, healthCheckFn healthchecks.HealthCheckFn, ctx context.Context) {
	ticker := time.NewTicker(1 * time.Minute)

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			log.Debug().Str("id", dataSource.ID).Msg("health checking a data source")

			if err := healthCheckFn(connection); err != nil && dataSource.HealthStatus != entities.UnhealthyDataSourceHealthStatus {
				log.Debug().Str("id", dataSource.ID).Msg("data source is now unhealthy")

				dataSource, err = mgr.dataSourceRepository.UpdateOne(dataSource, entities.DataSource{HealthStatus: entities.UnhealthyDataSourceHealthStatus})

				if err != nil {
					log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the health status of the data source in the database")
					continue
				}

				mgr.dataSourceHealthStatusChangeChan <- dataSource
			} else if err == nil && dataSource.HealthStatus != entities.HealthyDataSourceHealthStatus {
				log.Debug().Str("id", dataSource.ID).Msg("data source is now healthy")

				dataSource, err = mgr.dataSourceRepository.UpdateOne(dataSource, entities.DataSource{HealthStatus: entities.HealthyDataSourceHealthStatus})

				if err != nil {
					log.Error().Err(err).Str("id", dataSource.ID).Msg("could not update the health status of the data source in the database")
					continue
				}

				mgr.dataSourceHealthStatusChangeChan <- dataSource
			} else {
				log.Debug().Str("id", dataSource.ID).Msg("data source health status still the same")
			}
		}
	}
}

func (mgr *dataSourceImplementation) disconnectFunctionByDataSourceType(dataSourceType string) (disconnectors.DisconnectFunction, error) {
	switch dataSourceType {
	case entities.RedisDataSource:
		return disconnectors.RedisDisconnectFn, nil
	case entities.MqttDataSource:
		return disconnectors.MQTTDisconnectFn, nil
	default:
		return nil, ErrDataSourceNotImplemented
	}
}
