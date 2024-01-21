package models

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/utils"
	"gorm.io/gorm"
	"time"
)

type User struct {
	ID        string    `gorm:"column:id;primaryKey;type:char(36)"`
	Email     string    `gorm:"column:email;unique;not null"`
	Password  string    `gorm:"column:password;not null"`
	Role      string    `gorm:"column:role;type:varchar(6);not null"`
	CreatedAt time.Time `gorm:"column:created_at;type:timestamp;not null"`
}

func NewUser(entity entities.User) User {
	return User{
		ID:        entity.ID,
		Email:     entity.Email,
		Password:  entity.Password,
		Role:      entity.Role,
		CreatedAt: entity.CreatedAt,
	}
}

func (u *User) ToEntity() entities.User {
	return entities.User{
		ID:        u.ID,
		Email:     u.Email,
		Password:  u.Password,
		Role:      u.Role,
		CreatedAt: u.CreatedAt,
	}
}

func (User) TableName() string {
	return "users"
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.ID = utils.GenerateUUID()
	return nil
}
