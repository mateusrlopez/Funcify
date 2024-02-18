package responses

import (
	"github.com/mateusrlopez/funcify/entities"
	"time"
)

type DataSource struct {
	ID            string                 `json:"id"`
	Name          string                 `json:"name"`
	Type          string                 `json:"type"`
	Configuration map[string]interface{} `json:"configuration"`
	HealthStatus  string                 `json:"healthStatus"`
	CreatedAt     time.Time              `json:"createdAt"`
	UpdatedAt     *time.Time             `json:"updatedAt"`
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
