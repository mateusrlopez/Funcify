package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/mateusrlopez/funcify/entities"
)

type CreateDataSource struct {
	Name          string
	Type          string
	Configuration map[string]interface{}
}

func (req CreateDataSource) ToEntity() entities.DataSource {
	return entities.DataSource{
		Name:          req.Name,
		Type:          req.Type,
		Configuration: req.Configuration,
	}
}

func (req CreateDataSource) Validate() error {
	return validation.ValidateStruct(&req,
		validation.Field(&req.Name, validation.Required),
		validation.Field(&req.Type, validation.Required, validation.In(entities.MqttDataSource, entities.RedisDataSource)),
		validation.Field(&req.Configuration, validation.Required),
	)
}
