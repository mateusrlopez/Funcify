package disconnects

import "github.com/redis/go-redis/v9"

func RedisDisconnectionFn(connection interface{}) {
	redisConn := connection.(*redis.Client)
	redisConn.Close()
}
