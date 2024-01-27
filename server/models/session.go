package models

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/utils"
	"gorm.io/gorm"
)

type Session struct {
	ID     string `gorm:"column:id;primaryKey;type:char(20)"`
	UserID string `gorm:"column:user_id;type:char(36);not null"`
	User   User   `gorm:"foreignKey:UserID;constraints:OnDelete:CASCADE"`
}

func NewSession(entity entities.Session) Session {
	return Session{
		ID:     entity.ID,
		UserID: entity.UserID,
	}
}

func (s *Session) ToEntity() entities.Session {
	return entities.Session{
		ID:     s.ID,
		UserID: s.UserID,
	}
}

func (Session) TableName() string {
	return "sessions"
}

func (s *Session) BeforeCreate(tx *gorm.DB) (err error) {
	s.ID, err = utils.GenerateSessionID()
	return
}
