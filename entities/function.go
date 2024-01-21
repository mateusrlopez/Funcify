package entities

import "time"

const (
	RABBITMQ_CONNECTOR = "RABBITMQ"
	KAFKA_CONNECTOR    = "KAFKA"
)

const (
	CREATING_STATUS = "CREATING"
	RUNNING_STATUS  = "RUNNING"
	STOPPED_STATUS  = "STOPPED"
	ERROR_STATUS    = "ERROR"
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
