package clients

import mqtt "github.com/eclipse/paho.mqtt.golang"

func NewMqtt(brokers []string) (mqtt.Client, error) {
	opts := mqtt.NewClientOptions()

	for _, broker := range brokers {
		opts.AddBroker(broker)
	}

	client := mqtt.NewClient(opts)

	if token := client.Connect(); token.Wait() && token.Error() != nil {
		return nil, token.Error()
	}

	return client, nil
}
