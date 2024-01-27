package responses

import (
	"github.com/mateusrlopez/funcify/entities"
	"time"
)

type User struct {
	ID        string    `json:"id"`
	Email     string    `json:"email"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"createdAt"`
}

func NewUser(user entities.User) User {
	return User{
		ID:        user.ID,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: user.CreatedAt,
	}
}
