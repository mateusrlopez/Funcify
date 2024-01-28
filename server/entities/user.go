package entities

import "time"

const (
	AdminRole  = "ADMIN"
	CommonRole = "COMMON"
)

type User struct {
	ID        string
	Email     string
	Password  string
	Role      string
	CreatedAt time.Time
}
