package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/mateusrlopez/funcify/entities"
)

type UpdateFunction struct {
	Name                         string                 `json:"name"`
	SourceCode                   string                 `json:"sourceCode"`
	MethodToExecute              string                 `json:"methodToExecute"`
	InputConnectorDataSourceID   string                 `json:"inputConnectorDataSourceId"`
	InputConnectorConfiguration  map[string]interface{} `json:"inputConnectorConfiguration"`
	OutputConnectorDataSourceID  string                 `json:"outputConnectorDataSourceId"`
	OutputConnectorConfiguration map[string]interface{} `json:"outputConnectorConfiguration"`
}

func (req UpdateFunction) ToEntity() entities.Function {
	return entities.Function{
		Name:                         req.Name,
		SourceCode:                   req.SourceCode,
		MethodToExecute:              req.MethodToExecute,
		InputConnectorDataSourceID:   req.InputConnectorDataSourceID,
		InputConnectorConfiguration:  req.InputConnectorConfiguration,
		OutputConnectorDataSourceID:  req.OutputConnectorDataSourceID,
		OutputConnectorConfiguration: req.OutputConnectorConfiguration,
	}
}

func (req UpdateFunction) Validate() error {
	return validation.ValidateStruct(&req,
		validation.Field(&req.Name, validation.Required),
		validation.Field(&req.SourceCode, validation.Required),
		validation.Field(&req.MethodToExecute, validation.Required),
		validation.Field(&req.InputConnectorDataSourceID, validation.Required, is.UUID),
		validation.Field(&req.InputConnectorConfiguration, validation.Required),
		validation.Field(&req.OutputConnectorDataSourceID, validation.Required, is.UUID),
		validation.Field(&req.OutputConnectorConfiguration, validation.Required),
	)
}
