package connectors

import "context"

type OutputConnector interface {
	Publish(dataChan chan []byte, ctx context.Context)
}
