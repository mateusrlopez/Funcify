package entities

import "time"

const (
	RunningFunctionStatus = "RUNNING"
	ErrorFunctionStatus   = "ERROR"
)

type Function struct {
	ID                           string
	Name                         string
	SourceCode                   string
	MethodToExecute              string
	Status                       string
	InputConnectorDataSourceID   string
	InputConnectorConfiguration  map[string]interface{}
	OutputConnectorDataSourceID  string
	OutputConnectorConfiguration map[string]interface{}
	CreatedAt                    time.Time
	UpdatedAt                    *time.Time
}
