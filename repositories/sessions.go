package repositories

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/models"
	"gorm.io/gorm"
)

type Sessions interface {
	Insert(session entities.Session) (entities.Session, error)
	FindByID(id string) (entities.Session, error)
	FindByUserID(userID string) (entities.Session, error)
	Delete(session entities.Session) error
}

type sessionsImplementation struct {
	database *gorm.DB
}

var (
	ErrSessionIDNotFound     = errors.New("could not find the session for the given id")
	ErrSessionUserIDNotFound = errors.New("could not find the session for the given user id")
)

func NewSessions(database *gorm.DB) Sessions {
	return sessionsImplementation{
		database: database,
	}
}

func (r sessionsImplementation) Insert(session entities.Session) (entities.Session, error) {
	model := models.NewSession(session)

	if err := r.database.Create(&model).Error; err != nil {
		return entities.Session{}, err
	}

	return model.ToEntity(), nil
}

func (r sessionsImplementation) FindByID(id string) (entities.Session, error) {
	var session models.Session

	if err := r.database.First(&session, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.Session{}, ErrSessionIDNotFound
		}
	}

	return session.ToEntity(), nil
}

func (r sessionsImplementation) FindByUserID(userID string) (entities.Session, error) {
	var session models.Session

	if err := r.database.First(&session, "user_id = ?", userID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.Session{}, ErrSessionUserIDNotFound
		}
	}

	return session.ToEntity(), nil
}

func (r sessionsImplementation) Delete(session entities.Session) error {
	model := models.NewSession(session)

	if err := r.database.Delete(&model).Error; err != nil {
		return err
	}

	return nil
}
