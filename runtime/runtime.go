package runtime

import (
	"context"
	"errors"
	"github.com/dop251/goja"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/runtime/connectors"
	"github.com/mateusrlopez/funcify/services"
)

type Runtime interface {
	ExecuteExistingFunctions() error
	Run()
	Shutdown()
}

type runtimeImplementation struct {
	functionsService         services.Functions
	newFnChan                chan entities.Function
	updatedFnChan            chan entities.Function
	deletedFnChan            chan entities.Function
	shutdownChan             chan bool
	fnCancelMap              map[string]context.CancelFunc
	inputConnectorCancelMap  map[string]context.CancelFunc
	outputConnectorCancelMap map[string]context.CancelFunc
}

var (
	ErrInputConnectorTypeNotImplemented  = errors.New("given input connector type not yet implemented")
	ErrOutputConnectorTypeNotImplemented = errors.New("given output connector type not yet implemented")
)

func NewRuntime(functionsService services.Functions, newFnChan, updatedFnChan, deletedFnChan chan entities.Function) Runtime {
	return &runtimeImplementation{
		functionsService:         functionsService,
		newFnChan:                newFnChan,
		updatedFnChan:            updatedFnChan,
		deletedFnChan:            deletedFnChan,
		shutdownChan:             make(chan bool),
		fnCancelMap:              make(map[string]context.CancelFunc),
		inputConnectorCancelMap:  make(map[string]context.CancelFunc),
		outputConnectorCancelMap: make(map[string]context.CancelFunc),
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

			for _, cancel := range r.inputConnectorCancelMap {
				cancel()
			}

			for _, cancel := range r.outputConnectorCancelMap {
				cancel()
			}

			return
		}
	}
}

func (r *runtimeImplementation) Shutdown() {
	r.shutdownChan <- true
}

func (r *runtimeImplementation) handleNewFunction(function entities.Function) {
	inputConnector, err := inputConnectorByType(function.InputConnectorType, function.InputConnectorConfiguration)

	if err != nil {
		r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
		return
	}

	inputDataChan := make(chan []byte)
	inputConnectorCtx, cancel := context.WithCancel(context.Background())

	inputConnector.Listen(inputDataChan, inputConnectorCtx)

	r.inputConnectorCancelMap[function.ID] = cancel

	outputConnector, err := outputConnectorByType(function.OutputConnectorType, function.OutputConnectorConfiguration)

	if err != nil {
		r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
		return
	}

	outputDataChan := make(chan []byte)
	outputConnectorCtx, cancel := context.WithCancel(context.Background())

	outputConnector.Publish(outputDataChan, outputConnectorCtx)

	r.outputConnectorCancelMap[function.ID] = cancel

	fnCtx, cancel := context.WithCancel(context.Background())

	go r.runFunction(function, inputDataChan, outputDataChan, fnCtx)

	r.fnCancelMap[function.ID] = cancel

	r.functionsService.UpdateOne(function, entities.Function{Status: entities.RUNNING_STATUS})
	return
}

func (r *runtimeImplementation) handleFunctionUpdate(function entities.Function) {
	inputConnectorCancel := r.inputConnectorCancelMap[function.ID]
	outputConnectorCancel := r.outputConnectorCancelMap[function.ID]
	functionCancel := r.fnCancelMap[function.ID]

	inputConnectorCancel()
	outputConnectorCancel()
	functionCancel()

	inputConnector, err := inputConnectorByType(function.InputConnectorType, function.InputConnectorConfiguration)

	if err != nil {
		r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
		return
	}

	inputDataChan := make(chan []byte)
	inputConnectorCtx, cancel := context.WithCancel(context.Background())

	inputConnector.Listen(inputDataChan, inputConnectorCtx)

	r.inputConnectorCancelMap[function.ID] = cancel

	outputConnector, err := outputConnectorByType(function.OutputConnectorType, function.OutputConnectorConfiguration)

	if err != nil {
		r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
		return
	}

	outputDataChan := make(chan []byte)
	outputConnectorCtx, cancel := context.WithCancel(context.Background())

	outputConnector.Publish(outputDataChan, outputConnectorCtx)

	r.outputConnectorCancelMap[function.ID] = cancel

	fnCtx, cancel := context.WithCancel(context.Background())

	go r.runFunction(function, inputDataChan, outputDataChan, fnCtx)

	r.fnCancelMap[function.ID] = cancel

	r.functionsService.UpdateOne(function, entities.Function{Status: entities.RUNNING_STATUS})
	return
}

func (r *runtimeImplementation) handleFunctionDelete(function entities.Function) {
	inputConnectorCancel := r.inputConnectorCancelMap[function.ID]
	outputConnectorCancel := r.outputConnectorCancelMap[function.ID]
	functionCancel := r.fnCancelMap[function.ID]

	inputConnectorCancel()
	outputConnectorCancel()
	functionCancel()

	return
}

func (r *runtimeImplementation) runFunction(function entities.Function, inputDataChan, outputDataChan chan []byte, ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		case data := <-inputDataChan:
			vm := goja.New()

			_, err := vm.RunString(function.SourceCode)

			if err != nil {
				r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
				return
			}

			fn, ok := goja.AssertFunction(vm.Get(function.MethodToExecute))

			if !ok {
				r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
				return
			}

			res, err := fn(goja.Undefined(), vm.ToValue(string(data)))

			if err != nil {
				r.functionsService.UpdateOne(function, entities.Function{Status: entities.ERROR_STATUS})
				return
			}

			outputDataChan <- []byte(res.String())
		}
	}
}

func inputConnectorByType(t string, configuration map[string]interface{}) (connectors.InputConnector, error) {
	switch t {
	default:
		return nil, ErrInputConnectorTypeNotImplemented
	}
}

func outputConnectorByType(t string, configuration map[string]interface{}) (connectors.OutputConnector, error) {
	switch t {
	default:
		return nil, ErrOutputConnectorTypeNotImplemented
	}
}
