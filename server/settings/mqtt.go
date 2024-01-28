package settings

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
)

type MQTT struct {
	Brokers []string
	Topic   string
	QoS     byte
}

func NewMqtt(raw map[string]interface{}) MQTT {
	return MQTT{
		Brokers: raw["brokers"].([]string),
		Topic:   raw["topic"].(string),
		QoS:     raw["qos"].(byte),
	}
}

func (s *MQTT) Validate() error {
	return validation.ValidateStruct(s,
		validation.Field(s.Brokers, validation.Each(validation.Required)),
		validation.Field(s.Topic, validation.Required),
		validation.Field(s.QoS, validation.Required, validation.In(0, 1, 2)),
	)
}
