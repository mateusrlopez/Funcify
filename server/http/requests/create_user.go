package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/mateusrlopez/funcify/entities"
)

type CreateUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

func (req *CreateUser) ToEntity() entities.User {
	return entities.User{
		Email:    req.Email,
		Password: req.Password,
		Role:     req.Role,
	}
}

func (req *CreateUser) Validate() error {
	return validation.ValidateStruct(req,
		validation.Field(req.Email, validation.Required, is.Email),
		validation.Field(req.Password, validation.Required, validation.Min(8)),
		validation.Field(req.Role, validation.Required, validation.In(entities.AdminRole, entities.CommonRole)),
	)
}
