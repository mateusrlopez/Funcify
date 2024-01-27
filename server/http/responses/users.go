package responses

import (
	"github.com/mateusrlopez/funcify/entities"
)

type Users struct {
	Users []User `json:"users"`
}

func NewUsers(users []entities.User) Users {
	res := Users{}

	for _, user := range users {
		res.Users = append(res.Users, NewUser(user))
	}

	return res
}
