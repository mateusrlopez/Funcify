package responses

import "github.com/mateusrlopez/funcify/entities"

type Function struct {
	ID                           string                 `json:"id"`
	Name                         string                 `json:"name"`
	SourceCode                   string                 `json:"sourceCode"`
	MethodToExecute              string                 `json:"methodToExecute"`
	Status                       string                 `json:"status"`
	InputConnectorType           string                 `json:"inputConnectorType"`
	InputConnectorConfiguration  map[string]interface{} `json:"inputConnectorConfiguration"`
	OutputConnectorType          string                 `json:"outputConnectorType"`
	OutputConnectorConfiguration map[string]interface{} `json:"outputConnectorConfiguration"`
}

func NewFunction(function entities.Function) Function {
	return Function{
		ID:                           function.ID,
		Name:                         function.Name,
		SourceCode:                   function.SourceCode,
		MethodToExecute:              function.MethodToExecute,
		Status:                       function.Status,
		InputConnectorType:           function.InputConnectorType,
		InputConnectorConfiguration:  function.InputConnectorConfiguration,
		OutputConnectorType:          function.OutputConnectorType,
		OutputConnectorConfiguration: function.OutputConnectorConfiguration,
	}
}
