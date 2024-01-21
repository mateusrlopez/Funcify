package connectors

import "context"

type InputConnector interface {
	Listen(dataChan chan []byte, ctx context.Context)
}
