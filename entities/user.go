package entities

import "time"

const (
	ADMIN_ROLE  = "ADMIN"
	COMMON_ROLE = "COMMON"
)

type User struct {
	ID        string
	Email     string
	Password  string
	Role      string
	CreatedAt time.Time
}
