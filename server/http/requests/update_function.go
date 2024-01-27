package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/mateusrlopez/funcify/entities"
)

type UpdateFunction struct {
	Name                         string                 `json:"name"`
	SourceCode                   string                 `json:"sourceCode"`
	MethodToExecute              string                 `json:"methodToExecute"`
	InputConnectorType           string                 `json:"inputConnectorType"`
	InputConnectorConfiguration  map[string]interface{} `json:"inputConnectorConfiguration"`
	OutputConnectorType          string                 `json:"outputConnectorType"`
	OutputConnectorConfiguration map[string]interface{} `json:"outputConnectorConfiguration"`
}

func (req *UpdateFunction) ToEntity() entities.Function {
	return entities.Function{
		Name:                         req.Name,
		SourceCode:                   req.SourceCode,
		MethodToExecute:              req.MethodToExecute,
		InputConnectorType:           req.InputConnectorType,
		InputConnectorConfiguration:  req.InputConnectorConfiguration,
		OutputConnectorType:          req.OutputConnectorType,
		OutputConnectorConfiguration: req.OutputConnectorConfiguration,
	}
}

func (req *UpdateFunction) Validate() error {
	return validation.ValidateStruct(req,
		validation.Field(req.Name, validation.Required),
		validation.Field(req.SourceCode, validation.Required),
		validation.Field(req.MethodToExecute, validation.Required),
		validation.Field(req.InputConnectorType, validation.Required, validation.In(entities.KAFKA_CONNECTOR, entities.RABBITMQ_CONNECTOR)),
		validation.Field(req.InputConnectorConfiguration, validation.Required),
		validation.Field(req.OutputConnectorType, validation.Required, validation.In(entities.KAFKA_CONNECTOR, entities.RABBITMQ_CONNECTOR)),
		validation.Field(req.OutputConnectorConfiguration, validation.Required),
	)
}
