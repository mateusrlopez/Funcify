package disconnectors

import "github.com/redis/go-redis/v9"

func RedisDisconnectFn(connection interface{}) error {
	redisConn := connection.(*redis.Client)
	return redisConn.Close()
}
