package models

import (
	"encoding/json"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/utils"
	"gorm.io/gorm"
	"time"
)

type DataSourceConfiguration map[string]interface{}

func (t *DataSourceConfiguration) Scan(source interface{}) (err error) {
	var configuration map[string]interface{}

	err = json.Unmarshal(source.([]byte), &configuration)

	if err != nil {
		return
	}

	*t = configuration
	return
}

type DataSource struct {
	ID            string                  `gorm:"column:id;primaryKey;type:char(36)"`
	Name          string                  `gorm:"column:name;unique;not null"`
	Type          string                  `gorm:"column:type;type:varchar(8);not null"`
	Configuration DataSourceConfiguration `gorm:"column:configuration;type:json;not null"`
	HealthStatus  string                  `gorm:"column:health_status;type:varchar(9);not null"`
	CreatedAt     time.Time               `gorm:"column:created_at;type:timestamp;not null"`
	UpdatedAt     *time.Time              `gorm:"column:updated_at;type:timestamp"`
}

func NewDataSource(entity entities.DataSource) DataSource {
	return DataSource{
		ID:            entity.ID,
		Name:          entity.Name,
		Type:          entity.Type,
		Configuration: entity.Configuration,
		HealthStatus:  entity.HealthStatus,
		CreatedAt:     entity.CreatedAt,
		UpdatedAt:     entity.UpdatedAt,
	}
}

func (ds *DataSource) ToEntity() entities.DataSource {
	return entities.DataSource{
		ID:            ds.ID,
		Name:          ds.Name,
		Type:          ds.Type,
		Configuration: ds.Configuration,
		HealthStatus:  ds.HealthStatus,
		CreatedAt:     ds.CreatedAt,
		UpdatedAt:     ds.UpdatedAt,
	}
}

func (DataSource) TableName() string {
	return "data_sources"
}

func (ds *DataSource) BeforeCreate(tx *gorm.DB) error {
	ds.ID = utils.GenerateUUID()
	return nil
}
