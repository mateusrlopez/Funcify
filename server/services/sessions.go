package services

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
)

type Sessions interface {
	Create(userID string) (entities.Session, error)
	FindByID(id string) (entities.Session, error)
	FindByUserID(userID string) (entities.Session, error)
	DeleteOneByID(id string) error
}

type sessionsImplementation struct {
	sessionsRepository  repositories.Sessions
	usersService        Users
	comparePasswordFunc func(string, string) error
}

func NewSessions(sessionsRepository repositories.Sessions) Sessions {
	return sessionsImplementation{
		sessionsRepository: sessionsRepository,
	}
}

func (s sessionsImplementation) Create(userID string) (entities.Session, error) {
	session := entities.Session{
		UserID: userID,
	}

	created, err := s.sessionsRepository.Insert(session)

	if err != nil {
		return entities.Session{}, err
	}

	return created, err
}

func (s sessionsImplementation) FindByID(id string) (entities.Session, error) {
	session, err := s.sessionsRepository.FindByID(id)

	if err != nil {
		return entities.Session{}, err
	}

	return session, nil
}

func (s sessionsImplementation) FindByUserID(userID string) (entities.Session, error) {
	session, err := s.sessionsRepository.FindByUserID(userID)

	if err != nil {
		return entities.Session{}, err
	}

	return session, nil
}

func (s sessionsImplementation) DeleteOneByID(id string) error {
	return s.sessionsRepository.Delete(entities.Session{ID: id})
}
