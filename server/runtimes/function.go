package runtimes

import (
	"context"
	"errors"
	"github.com/dop251/goja"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/managers"
	"github.com/mateusrlopez/funcify/runtimes/connectors"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
	"github.com/rs/zerolog/log"
)

var (
	ErrConnectorForDataSourceTypeNotImplemented = errors.New("connector for given data source type not yet implemented")
)

type Function interface {
	ExecuteExistingFunctions() error
	Run()
	Shutdown()
}

type functionImplementation struct {
	functionsService   services.Functions
	dataSourceManager  managers.DataSource
	fnCreateChan       chan entities.Function
	fnUpdateChan       chan entities.Function
	fnDeleteChan       chan entities.Function
	fnStatusChangeChan chan entities.Function
	shutdownChan       chan bool
	fnCancelMap        map[string]context.CancelFunc
}

func NewRuntime(functionsService services.Functions, dataSourceManager managers.DataSource, fnCreateChan, fnUpdateChan, fnDeleteChan, fnStatusChangeChan chan entities.Function) Function {
	return &functionImplementation{
		functionsService:   functionsService,
		fnStatusChangeChan: fnStatusChangeChan,
		fnCreateChan:       fnCreateChan,
		fnUpdateChan:       fnUpdateChan,
		fnDeleteChan:       fnDeleteChan,
		dataSourceManager:  dataSourceManager,
		shutdownChan:       make(chan bool),
		fnCancelMap:        make(map[string]context.CancelFunc),
	}
}

func (r *functionImplementation) ExecuteExistingFunctions() error {
	functions, err := r.functionsService.FindAll()

	if err != nil {
		return err
	}

	log.Debug().Int("total", len(functions)).Msg("starting the execution of the already existing functions")

	for _, function := range functions {
		r.handleNewFunction(function)
	}

	return nil
}

func (r *functionImplementation) Run() {
	for {
		select {
		case function := <-r.fnCreateChan:
			go r.handleNewFunction(function)
		case function := <-r.fnUpdateChan:
			go r.handleFunctionUpdate(function)
		case function := <-r.fnDeleteChan:
			go r.handleFunctionDelete(function)
		case <-r.shutdownChan:
			close(r.fnCreateChan)
			close(r.fnUpdateChan)
			close(r.fnDeleteChan)

			for _, cancel := range r.fnCancelMap {
				cancel()
			}

			close(r.shutdownChan)
			return
		}
	}
}

func (r *functionImplementation) Shutdown() {
	r.shutdownChan <- true
}

func (r *functionImplementation) handleNewFunction(function entities.Function) {
	log.Debug().Str("id", function.ID).Msg("starting handle of new function")

	ctx, cancel := context.WithCancel(context.Background())
	r.fnCancelMap[function.ID] = cancel

	errorChan := make(chan error)

	inputConnection := r.dataSourceManager.RetrieveConnection(function.InputConnectorDataSourceID)
	inputConnector, err := connectorByDataSourceType(inputConnection.Type, inputConnection.Connection, function.InputConnectorConfiguration)

	if err != nil {
		log.Error().Err(err).Str("id", function.ID).Str("dataSourceType", inputConnection.Type).Msg("could not instantiate the new function input connector")

		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
		if err != nil {
			log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
			return
		}

		r.fnStatusChangeChan <- function
		return
	}

	outputConnection := r.dataSourceManager.RetrieveConnection(function.OutputConnectorDataSourceID)
	outputConnector, err := connectorByDataSourceType(outputConnection.Type, outputConnection.Connection, function.OutputConnectorConfiguration)

	if err != nil {
		log.Error().Err(err).Str("id", function.ID).Str("dataSourceType", outputConnection.Type).Msg("could not instantiate the new function output connector")

		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
		if err != nil {
			log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
			return
		}

		r.fnStatusChangeChan <- function
		return
	}

	inputDataChan := make(chan []byte)
	outputDataChan := make(chan []byte)

	go r.runFunction(function, inputDataChan, outputDataChan, errorChan, ctx)
	go outputConnector.Publish(outputDataChan, errorChan, ctx)
	go inputConnector.Listen(inputDataChan, errorChan, ctx)

	function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.RunningFunctionStatus})
	if err != nil {
		log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
		return
	}

	log.Debug().Str("id", function.ID).Msg("function is running")

	r.fnStatusChangeChan <- function
	return
}

func (r *functionImplementation) handleFunctionUpdate(function entities.Function) {
	log.Debug().Str("id", function.ID).Msg("starting process to update the execution of the function")

	oldCancel := r.fnCancelMap[function.ID]
	oldCancel()

	ctx, cancel := context.WithCancel(context.Background())
	r.fnCancelMap[function.ID] = cancel

	errorChan := make(chan error)

	inputConnection := r.dataSourceManager.RetrieveConnection(function.InputConnectorDataSourceID)
	inputConnector, err := connectorByDataSourceType(inputConnection.Type, inputConnection.Connection, function.InputConnectorConfiguration)

	if err != nil {
		log.Error().Err(err).Str("dataSourceType", inputConnection.Type).Str("id", function.ID).Msg("could not instantiate the new function input connector")

		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
		if err != nil {
			log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
			return
		}

		r.fnStatusChangeChan <- function
		return
	}

	outputConnection := r.dataSourceManager.RetrieveConnection(function.InputConnectorDataSourceID)
	outputConnector, err := connectorByDataSourceType(outputConnection.Type, outputConnection.Connection, function.InputConnectorConfiguration)

	if err != nil {
		log.Error().Err(err).Str("dataSourceType", outputConnection.Type).Str("id", function.ID).Msg("could not instantiate the new function output connector")

		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
		if err != nil {
			log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
			return
		}

		r.fnStatusChangeChan <- function
		return
	}

	inputDataChan := make(chan []byte)
	outputDataChan := make(chan []byte)

	go r.runFunction(function, inputDataChan, outputDataChan, errorChan, ctx)
	go outputConnector.Publish(outputDataChan, errorChan, ctx)
	go inputConnector.Listen(inputDataChan, errorChan, ctx)

	function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.RunningFunctionStatus})
	if err != nil {
		log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
		return
	}

	log.Debug().Str("id", function.ID).Msg("function is running")

	r.fnStatusChangeChan <- function
}

func (r *functionImplementation) handleFunctionDelete(function entities.Function) {
	log.Debug().Str("id", function.ID).Msg("starting process to kill the execution of the function")

	cancel := r.fnCancelMap[function.ID]
	cancel()

	log.Debug().Str("id", function.ID).Msg("function execution is killed")
}

func (r *functionImplementation) runFunction(function entities.Function, inputDataChan, outputDataChan chan []byte, errorChan chan error, ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case err := <-errorChan:
			log.Error().Err(err).Str("id", function.ID).Msg("received error from connector")

			updated, err := r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
			if err != nil {
				log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
				return
			}

			r.fnStatusChangeChan <- updated
			return
		case data := <-inputDataChan:
			log.Debug().Str("id", function.ID).Bytes("data", data).Msg("received data from input")

			vm := goja.New()

			_, err := vm.RunString(function.SourceCode)

			if err != nil {
				log.Error().Err(err).Str("id", function.ID).Msg("error executing function")

				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
				if err != nil {
					log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
					return
				}

				r.fnStatusChangeChan <- function
				return
			}

			fn, ok := goja.AssertFunction(vm.Get(function.MethodToExecute))

			if !ok {
				log.Error().Str("id", function.ID).Msg("error executing function")

				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
				if err != nil {
					log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
					return
				}

				r.fnStatusChangeChan <- function
				return
			}

			res, err := fn(goja.Undefined(), vm.ToValue(string(data)))

			if err != nil {
				log.Error().Err(err).Str("id", function.ID).Msg("error executing function")

				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorFunctionStatus})
				if err != nil {
					log.Error().Err(err).Str("id", function.ID).Msg("could not update function status")
					return
				}

				r.fnStatusChangeChan <- function
				return
			}

			log.Debug().Str("id", function.ID).Str("data", res.String()).Msg("sending processed data to output")

			outputDataChan <- []byte(res.String())
		}
	}
}

func connectorByDataSourceType(t string, connection interface{}, rawSettings map[string]interface{}) (connectors.Connector, error) {
	switch t {
	case entities.MqttDataSource:
		if err := settings.ValidateRawMqttConnector(rawSettings); err != nil {
			return nil, err
		}

		s := settings.NewMqttConnector(rawSettings)
		connector := connectors.NewMqttConnector(connection, s.Topic, s.QoS)

		return connector, nil
	case entities.RedisDataSource:
		if err := settings.ValidateRawRedisConnector(rawSettings); err != nil {
			return nil, err
		}

		s := settings.NewRedisConnector(rawSettings)
		connector := connectors.NewRedisConnector(connection, s.Channel)

		return connector, nil
	default:
		return nil, ErrConnectorForDataSourceTypeNotImplemented
	}
}
