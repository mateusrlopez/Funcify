package requests

import (
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
	"github.com/mateusrlopez/funcify/entities"
)

type UpdateUser struct {
	Email string `json:"email"`
	Role  string `json:"role"`
}

func (req *UpdateUser) ToEntity() entities.User {
	return entities.User{
		Email: req.Email,
		Role:  req.Role,
	}
}

func (req *UpdateUser) Validate() error {
	return validation.ValidateStruct(req,
		validation.Field(req.Email, validation.Required, is.Email),
		validation.Field(req.Role, validation.Required, validation.In(entities.ADMIN_ROLE, entities.COMMON_ROLE)),
	)
}
