package connectors

import (
	"context"
	"github.com/redis/go-redis/v9"
)

type redisConnector struct {
	client  *redis.Client
	channel string
}

func NewRedisConnector(client *redis.Client, channel string) Connector {
	return redisConnector{
		client:  client,
		channel: channel,
	}
}

func (c redisConnector) Listen(dataChan chan []byte, errorChan chan error, ctx context.Context) {
	subscriber := c.client.Subscribe(context.Background(), c.channel)
	subscriberChannel := subscriber.Channel()

	for {
		select {
		case <-ctx.Done():
			c.client.Close()
			return
		case message := <-subscriberChannel:
			dataChan <- []byte(message.Payload)
		}
	}
}

func (c redisConnector) Publish(dataChan chan []byte, errorChan chan error, ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			c.client.Close()
			return
		case data := <-dataChan:
			if err := c.client.Publish(context.Background(), c.channel, data).Err(); err != nil {
				errorChan <- err
				return
			}
		}
	}
}
