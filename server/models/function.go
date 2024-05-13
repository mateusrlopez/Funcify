package models

import (
	"encoding/json"
	"github.com/mateusrlopez/funcify/entities"
	"gorm.io/gorm"
	"time"
)

type ConnectorConfiguration map[string]interface{}

func (t *ConnectorConfiguration) Scan(source interface{}) (err error) {
	var configuration map[string]interface{}

	err = json.Unmarshal(source.([]byte), &configuration)

	if err != nil {
		return
	}

	*t = configuration
	return
}

type Function struct {
	ID                           string                 `gorm:"column:id;primaryKey;type:char(36)"`
	Name                         string                 `gorm:"column:name;unique;not null"`
	SourceCode                   string                 `gorm:"column:source_code;not null"`
	MethodToExecute              string                 `gorm:"column:method_to_execute;not null"`
	Status                       string                 `gorm:"column:status;type:varchar(8);not null"`
	InputConnectorDataSourceID   string                 `gorm:"column:input_connector_data_source_id;type:char(36);not null"`
	InputConnectorDataSource     DataSource             `gorm:"foreignKey:InputConnectorDataSourceID;references:ID"`
	InputConnectorConfiguration  ConnectorConfiguration `gorm:"column:input_connector_configuration;not null;type:json"`
	OutputConnectorDataSourceID  string                 `gorm:"column:output_connector_data_source_id;type:char(36);not null"`
	OutputConnectorDataSource    DataSource             `gorm:"foreignKey:OutputConnectorDataSourceID;references:ID"`
	OutputConnectorConfiguration ConnectorConfiguration `gorm:"column:output_connector_configuration;not null;type:json"`
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
		InputConnectorDataSourceID:   entity.InputConnectorDataSourceID,
		InputConnectorConfiguration:  entity.InputConnectorConfiguration,
		OutputConnectorDataSourceID:  entity.OutputConnectorDataSourceID,
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
		InputConnectorDataSourceID:   f.InputConnectorDataSourceID,
		InputConnectorConfiguration:  f.InputConnectorConfiguration,
		OutputConnectorDataSourceID:  f.OutputConnectorDataSourceID,
		OutputConnectorConfiguration: f.OutputConnectorConfiguration,
		CreatedAt:                    f.CreatedAt,
		UpdatedAt:                    f.UpdatedAt,
	}
}

func (Function) TableName() string {
	return "functions"
}

func (f *Function) BeforeCreate(tx *gorm.DB) error {
	f.Status = entities.RunningFunctionStatus
	return nil
}
