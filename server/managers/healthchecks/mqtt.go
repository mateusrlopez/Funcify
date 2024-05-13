package healthchecks

import (
	"errors"
	mqtt "github.com/eclipse/paho.mqtt.golang"
)

var ErrMqttNotConnected = errors.New("client not connected")

func MqttHealthCheckFn(connection interface{}) error {
	mqttConnection := connection.(mqtt.Client)

	if !mqttConnection.IsConnectionOpen() {
		return ErrMqttNotConnected
	}

	return nil
}
