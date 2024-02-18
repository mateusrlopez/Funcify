package settings

import (
	"errors"
	"reflect"
)

type MQTTDataSource struct {
	Brokers  []string
	Username string
	Password string
	ClientID string
}

func ValidateRawMqttDataSource(raw map[string]interface{}) error {
	brokers := raw["brokers"]

	if reflect.TypeOf(brokers).Kind() != reflect.Slice && reflect.ValueOf(brokers).IsZero() {
		return errors.New("configuration field brokers is not valid")
	}

	username := raw["username"]

	if reflect.TypeOf(username).Kind() != reflect.String {
		return errors.New("configuration field channel is not valid")
	}

	password := raw["password"]

	if reflect.TypeOf(password).Kind() != reflect.String && reflect.ValueOf(password).IsZero() {
		return errors.New("configuration field channel is not valid")
	}

	clientID := raw["clientId"]

	if reflect.TypeOf(clientID).Kind() != reflect.String && reflect.ValueOf(clientID).IsZero() {
		return errors.New("configuration field channel is not valid")
	}

	return nil
}

func NewMqttDataSource(raw map[string]interface{}) MQTTDataSource {
	brokers := raw["brokers"].([]interface{})

	mqtt := MQTTDataSource{
		Username: raw["username"].(string),
		Password: raw["password"].(string),
		ClientID: raw["clientId"].(string),
	}

	for _, broker := range brokers {
		mqtt.Brokers = append(mqtt.Brokers, broker.(string))
	}

	return mqtt
}

type MQTTConnector struct {
	Topic string
	QoS   byte
}

func ValidateRawMqttConnector(raw map[string]interface{}) error {
	topic := raw["topic"]

	if reflect.TypeOf(topic).Kind() != reflect.String && reflect.ValueOf(topic).IsZero() {
		return errors.New("configuration field topic is not valid")
	}

	qos := raw["qos"]

	if reflect.TypeOf(qos).Kind() != reflect.Float64 {
		return errors.New("configuration field qos is not valid")
	}

	return nil
}

func NewMqttConnector(raw map[string]interface{}) MQTTConnector {
	return MQTTConnector{
		Topic: raw["topic"].(string),
		QoS:   byte(raw["qos"].(float64)),
	}
}
