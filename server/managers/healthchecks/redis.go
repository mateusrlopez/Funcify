package healthchecks

import (
	"context"
	"github.com/redis/go-redis/v9"
)

func RedisHealthCheckFn(connection interface{}) error {
	redisConn := connection.(*redis.Client)
	return redisConn.Ping(context.Background()).Err()
}
