package healthchecks

import (
	"context"
	"github.com/redis/go-redis/v9"
	"time"
)

func RedisHealthCheckFn(connection interface{}) error {
	redisConn := connection.(*redis.Client)

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	return redisConn.Ping(ctx).Err()
}
