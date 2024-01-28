package clients

import (
	"context"
	"github.com/redis/go-redis/v9"
)

func NewRedis(address, username, password string, database int) (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     address,
		Username: username,
		Password: password,
		DB:       database,
	})

	if err := client.Ping(context.Background()).Err(); err != nil {
		return nil, err
	}

	return client, nil
}
