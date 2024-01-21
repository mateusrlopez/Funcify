package models

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/utils"
	"gorm.io/gorm"
	"time"
)

type Function struct {
	ID                           string                 `gorm:"column:id;primaryKey;type:char(36)"`
	Name                         string                 `gorm:"column:name;unique;not null"`
	SourceCode                   string                 `gorm:"column:source_code;not null"`
	MethodToExecute              string                 `gorm:"column:method_to_execute;not null"`
	Status                       string                 `gorm:"column:status;type:varchar(8);not null"`
	InputConnectorType           string                 `gorm:"column:input_connector_type;type:varchar(8);not null"`
	InputConnectorConfiguration  map[string]interface{} `gorm:"column:input_connector_configuration;not null;type:json"`
	OutputConnectorType          string                 `gorm:"column:output_connector_type;type:varchar(8);not null"`
	OutputConnectorConfiguration map[string]interface{} `gorm:"column:output_connector_configuration;not null;type:json"`
	CreatedAt                    time.Time              `gorm:"column:created_at;type:timestamp;not null"`
	UpdatedAt                    *time.Time             `gorm:"column:updated_at;type:timestamp"`
}

func NewFunction(entity entities.Function) Function {
	return Function{
		ID:                           entity.ID,
		Name:                         entity.Name,
		SourceCode:                   entity.SourceCode,
		MethodToExecute:              entity.MethodToExecute,
		Status:                       entity.Status,
		InputConnectorType:           entity.InputConnectorType,
		InputConnectorConfiguration:  entity.InputConnectorConfiguration,
		OutputConnectorType:          entity.OutputConnectorType,
		OutputConnectorConfiguration: entity.OutputConnectorConfiguration,
		CreatedAt:                    entity.CreatedAt,
		UpdatedAt:                    entity.UpdatedAt,
	}
}

func (f *Function) ToEntity() entities.Function {
	return entities.Function{
		ID:                           f.ID,
		Name:                         f.Name,
		SourceCode:                   f.SourceCode,
		MethodToExecute:              f.MethodToExecute,
		Status:                       f.Status,
		InputConnectorType:           f.InputConnectorType,
		InputConnectorConfiguration:  f.InputConnectorConfiguration,
		OutputConnectorType:          f.OutputConnectorType,
		OutputConnectorConfiguration: f.OutputConnectorConfiguration,
		CreatedAt:                    f.CreatedAt,
		UpdatedAt:                    f.UpdatedAt,
	}
}

func (Function) TableName() string {
	return "functions"
}

func (f *Function) BeforeCreate(tx *gorm.DB) error {
	f.ID = utils.GenerateUUID()
	f.Status = entities.CREATING_STATUS
	return nil
}
