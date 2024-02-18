package entities

import "time"

const (
	MqttDataSource  = "MQTT"
	RedisDataSource = "REDIS"
)

const (
	HealthyDataSourceHealthStatus   = "HEALTHY"
	UnhealthyDataSourceHealthStatus = "UNHEALTHY"
)

type DataSource struct {
	ID            string
	Name          string
	Type          string
	Configuration map[string]interface{}
	HealthStatus  string
	CreatedAt     time.Time
	UpdatedAt     *time.Time
}
