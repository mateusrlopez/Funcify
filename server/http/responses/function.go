package responses

import "github.com/mateusrlopez/funcify/entities"

type Function struct {
	ID                           string                 `json:"id"`
	Name                         string                 `json:"name"`
	SourceCode                   string                 `json:"sourceCode"`
	MethodToExecute              string                 `json:"methodToExecute"`
	Status                       string                 `json:"status"`
	InputConnectorDataSourceID   string                 `json:"inputConnectorDataSourceId"`
	InputConnectorConfiguration  map[string]interface{} `json:"inputConnectorConfiguration"`
	OutputConnectorDataSourceID  string                 `json:"outputConnectorDataSourceId"`
	OutputConnectorConfiguration map[string]interface{} `json:"outputConnectorConfiguration"`
}

func NewFunction(function entities.Function) Function {
	return Function{
		ID:                           function.ID,
		Name:                         function.Name,
		SourceCode:                   function.SourceCode,
		MethodToExecute:              function.MethodToExecute,
		Status:                       function.Status,
		InputConnectorDataSourceID:   function.InputConnectorDataSourceID,
		InputConnectorConfiguration:  function.InputConnectorConfiguration,
		OutputConnectorDataSourceID:  function.OutputConnectorDataSourceID,
		OutputConnectorConfiguration: function.OutputConnectorConfiguration,
	}
}
