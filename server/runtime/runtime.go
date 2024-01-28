package runtime

import (
	"context"
	"errors"
	"github.com/dop251/goja"
	"github.com/mateusrlopez/funcify/clients"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/runtime/connectors"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
)

type Runtime interface {
	ExecuteExistingFunctions() error
	Run()
	Shutdown()
}

type runtimeImplementation struct {
	functionsService   services.Functions
	newFnChan          chan entities.Function
	updatedFnChan      chan entities.Function
	deletedFnChan      chan entities.Function
	fnStatusChangeChan chan entities.Function
	shutdownChan       chan bool
	fnCancelMap        map[string]context.CancelFunc
}

var (
	ErrConnectorTypeNotImplemented = errors.New("given connector type not yet implemented")
)

func NewRuntime(functionsService services.Functions, newFnChan, updatedFnChan, deletedFnChan, fnStatusChangeChan chan entities.Function) Runtime {
	return &runtimeImplementation{
		functionsService:   functionsService,
		newFnChan:          newFnChan,
		updatedFnChan:      updatedFnChan,
		deletedFnChan:      deletedFnChan,
		fnStatusChangeChan: fnStatusChangeChan,
		shutdownChan:       make(chan bool),
		fnCancelMap:        make(map[string]context.CancelFunc),
	}
}

func (r *runtimeImplementation) ExecuteExistingFunctions() error {
	functions, err := r.functionsService.FindAll()

	if err != nil {
		return err
	}

	for _, function := range functions {
		go r.handleNewFunction(function)
	}

	return nil
}

func (r *runtimeImplementation) Run() {
	for {
		select {
		case function := <-r.newFnChan:
			go r.handleNewFunction(function)
		case function := <-r.updatedFnChan:
			go r.handleFunctionUpdate(function)
		case function := <-r.deletedFnChan:
			go r.handleFunctionDelete(function)
		case <-r.shutdownChan:
			close(r.newFnChan)
			close(r.updatedFnChan)
			close(r.deletedFnChan)

			for _, cancel := range r.fnCancelMap {
				cancel()
			}

			close(r.shutdownChan)
		}
	}
}

func (r *runtimeImplementation) Shutdown() {
	r.shutdownChan <- true
}

func (r *runtimeImplementation) handleNewFunction(function entities.Function) {
	ctx, cancel := context.WithCancel(context.Background())
	r.fnCancelMap[function.ID] = cancel

	errorChan := make(chan error)

	inputConnector, err := connectorByType(function.InputConnectorType, function.InputConnectorConfiguration)

	if err != nil {
		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
		if err != nil {
			panic(err)
		}
		r.fnStatusChangeChan <- function
		return
	}

	inputDataChan := make(chan []byte)
	inputConnector.Listen(inputDataChan, errorChan, ctx)

	outputConnector, err := connectorByType(function.OutputConnectorType, function.OutputConnectorConfiguration)

	if err != nil {
		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
		if err != nil {
			panic(err)
		}
		r.fnStatusChangeChan <- function
		return
	}

	outputDataChan := make(chan []byte)
	outputConnector.Publish(outputDataChan, errorChan, ctx)

	go r.runFunction(function, inputDataChan, outputDataChan, errorChan, ctx)

	function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.RunningStatus})
	if err != nil {
		panic(err)
	}

	r.fnStatusChangeChan <- function
}

func (r *runtimeImplementation) handleFunctionUpdate(function entities.Function) {
	oldCancel := r.fnCancelMap[function.ID]
	oldCancel()

	ctx, cancel := context.WithCancel(context.Background())
	r.fnCancelMap[function.ID] = cancel

	errorChan := make(chan error)

	inputConnector, err := connectorByType(function.InputConnectorType, function.InputConnectorConfiguration)

	if err != nil {
		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
		if err != nil {
			panic(err)
		}
		r.fnStatusChangeChan <- function
		return
	}

	inputDataChan := make(chan []byte)
	inputConnector.Listen(inputDataChan, errorChan, ctx)

	outputConnector, err := connectorByType(function.OutputConnectorType, function.OutputConnectorConfiguration)

	if err != nil {
		function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
		if err != nil {
			panic(err)
		}
		r.fnStatusChangeChan <- function
		return
	}

	outputDataChan := make(chan []byte)
	outputConnector.Publish(outputDataChan, errorChan, ctx)

	go r.runFunction(function, inputDataChan, outputDataChan, errorChan, ctx)

	function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.RunningStatus})
	if err != nil {
		panic(err)
	}
	r.fnStatusChangeChan <- function
}

func (r *runtimeImplementation) handleFunctionDelete(function entities.Function) {
	cancel := r.fnCancelMap[function.ID]
	cancel()
	return
}

func (r *runtimeImplementation) runFunction(function entities.Function, inputDataChan, outputDataChan chan []byte, errorChan chan error, ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case <-errorChan:
			updated, err := r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
			if err != nil {
				panic(err)
			}
			r.fnStatusChangeChan <- updated
			return
		case data := <-inputDataChan:
			vm := goja.New()

			_, err := vm.RunString(function.SourceCode)

			if err != nil {
				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
				if err != nil {
					panic(err)
				}
				r.fnStatusChangeChan <- function
				return
			}

			fn, ok := goja.AssertFunction(vm.Get(function.MethodToExecute))

			if !ok {
				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
				if err != nil {
					panic(err)
				}
				r.fnStatusChangeChan <- function
				return
			}

			res, err := fn(goja.Undefined(), vm.ToValue(string(data)))

			if err != nil {
				function, err = r.functionsService.UpdateOne(function, entities.Function{Status: entities.ErrorStatus})
				if err != nil {
					panic(err)
				}
				r.fnStatusChangeChan <- function
				return
			}

			outputDataChan <- []byte(res.String())
		}
	}
}

func connectorByType(t string, rawSettings map[string]interface{}) (connectors.Connector, error) {
	switch t {
	case entities.MqttConnector:
		s := settings.NewMqtt(rawSettings)

		if err := s.Validate(); err != nil {
			return nil, err
		}

		client, err := clients.NewMqtt(s.Brokers)

		if err != nil {
			return nil, err
		}

		return connectors.NewMqttConnector(client, s.Topic, s.QoS), nil
	case entities.RedisConnector:
		s := settings.NewRedis(rawSettings)

		if err := s.Validate(); err != nil {
			return nil, err
		}

		client, err := clients.NewRedis(s.Address, s.Username, s.Password, s.Database)

		if err != nil {
			return nil, err
		}

		return connectors.NewRedisConnector(client, s.Channel), nil
	default:
		return nil, ErrConnectorTypeNotImplemented
	}
}
