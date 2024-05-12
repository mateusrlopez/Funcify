package disconnectors

import mqtt "github.com/eclipse/paho.mqtt.golang"

func MQTTDisconnectFn(connection interface{}) error {
	mqttConn := connection.(mqtt.Client)
	mqttConn.Disconnect(0)
	return nil
}
