package services

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
)

type Sessions interface {
	Create(email, password string) (string, error)
	FindByID(id string) (entities.Session, error)
	DeleteOneByID(id string) error
}

type sessionsImplementation struct {
	sessionsRepository  repositories.Sessions
	usersService        Users
	comparePasswordFunc func(string, string) error
}

func NewSessions(sessionsRepository repositories.Sessions, usersService Users, comparePasswordFunc func(string, string) error) Sessions {
	return sessionsImplementation{
		sessionsRepository:  sessionsRepository,
		usersService:        usersService,
		comparePasswordFunc: comparePasswordFunc,
	}
}

func (s sessionsImplementation) Create(email, password string) (string, error) {
	user, err := s.usersService.FindOneByEmail(email)

	if err != nil {
		return "", err
	}

	if err = s.comparePasswordFunc(user.Password, password); err != nil {
		return "", err
	}

	existing, err := s.sessionsRepository.FindByUserID(user.ID)

	if err == nil {
		if err = s.sessionsRepository.Delete(existing); err != nil {
			return "", err
		}
	} else if err != nil && !errors.Is(err, repositories.ErrUserIDNotFound) {
		return "", err
	}

	if err != nil {
		return "", err
	}

	session := entities.Session{
		UserID: user.ID,
	}

	created, err := s.sessionsRepository.Insert(session)

	if err != nil {
		return "", err
	}

	return created.ID, err
}

func (s sessionsImplementation) FindByID(id string) (entities.Session, error) {
	session, err := s.sessionsRepository.FindByID(id)

	if err != nil {
		return entities.Session{}, err
	}

	return session, nil
}

func (s sessionsImplementation) DeleteOneByID(id string) error {
	return s.sessionsRepository.Delete(entities.Session{ID: id})
}
