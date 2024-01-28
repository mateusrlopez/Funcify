package entities

import "time"

const (
	MqttConnector  = "MQTT"
	RedisConnector = "REDIS"
)

const (
	CreatingStatus = "CREATING"
	RunningStatus  = "RUNNING"
	ErrorStatus    = "ERROR"
)

type Function struct {
	ID                           string
	Name                         string
	SourceCode                   string
	MethodToExecute              string
	Status                       string
	InputConnectorType           string
	InputConnectorConfiguration  map[string]interface{}
	OutputConnectorType          string
	OutputConnectorConfiguration map[string]interface{}
	CreatedAt                    time.Time
	UpdatedAt                    *time.Time
}
