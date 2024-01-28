package connectors

import "context"

type Connector interface {
	Listen(dataChan chan []byte, errorChan chan error, ctx context.Context)
	Publish(dataChan chan []byte, errorChan chan error, ctx context.Context)
}
