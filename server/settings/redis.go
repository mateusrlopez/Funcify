package settings

import (
	"errors"
	"reflect"
)

type RedisDataSource struct {
	Address  string
	Username string
	Password string
	Database int
}

func ValidateRawRedisDataSource(raw map[string]interface{}) error {
	address := raw["address"]

	if reflect.TypeOf(address).Kind() != reflect.String && reflect.ValueOf(address).IsZero() {
		return errors.New("configuration field address is not valid")
	}

	username := raw["username"]

	if reflect.TypeOf(username).Kind() != reflect.String && reflect.ValueOf(username).IsZero() {
		return errors.New("configuration field username is not valid")
	}

	password := raw["address"]

	if reflect.TypeOf(password).Kind() != reflect.String && reflect.ValueOf(password).IsZero() {
		return errors.New("configuration field password is not valid")
	}

	database := raw["database"]

	if reflect.TypeOf(database).Kind() != reflect.Float64 {
		return errors.New("configuration field database is not valid")
	}

	return nil
}

func NewRedisDataSource(raw map[string]interface{}) RedisDataSource {
	return RedisDataSource{
		Address:  raw["address"].(string),
		Username: raw["username"].(string),
		Password: raw["password"].(string),
		Database: int(raw["database"].(float64)),
	}
}

type RedisConnector struct {
	Channel string
}

func ValidateRawRedisConnector(raw map[string]interface{}) error {
	channel := raw["channel"]

	if reflect.TypeOf(channel).Kind() != reflect.String && reflect.ValueOf(channel).IsZero() {
		return errors.New("configuration field channel is not valid")
	}

	return nil
}

func NewRedisConnector(raw map[string]interface{}) RedisConnector {
	return RedisConnector{
		Channel: raw["channel"].(string),
	}
}
