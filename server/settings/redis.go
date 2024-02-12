package settings

import validation "github.com/go-ozzo/ozzo-validation/v4"

type Redis struct {
	Address  string
	Username string
	Password string
	Database int
	Channel  string
}

func NewRedis(raw map[string]interface{}) Redis {
	return Redis{
		Address:  raw["address"].(string),
		Username: raw["username"].(string),
		Password: raw["password"].(string),
		Database: int(raw["database"].(float64)),
		Channel:  raw["channel"].(string),
	}
}

func (s Redis) Validate() error {
	return validation.ValidateStruct(&s,
		validation.Field(&s.Address, validation.Required),
		validation.Field(&s.Username),
		validation.Field(&s.Password, validation.Required),
		validation.Field(&s.Database),
		validation.Field(&s.Channel, validation.Required),
	)
}
