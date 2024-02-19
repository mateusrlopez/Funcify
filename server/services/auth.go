package services

import (
	"errors"
	"github.com/mateusrlopez/funcify/repositories"
)

type Auth interface {
	SignIn(email, password string) (string, error)
	SignOut(sessionID string) error
}

type authImplementation struct {
	sessionsService     Sessions
	usersService        Users
	comparePasswordFunc func(string, string) error
}

func NewAuth(sessionsService Sessions, usersService Users, comparePasswordFunc func(string, string) error) Auth {
	return authImplementation{
		sessionsService:     sessionsService,
		usersService:        usersService,
		comparePasswordFunc: comparePasswordFunc,
	}
}

func (s authImplementation) SignIn(email, password string) (string, error) {
	user, err := s.usersService.FindOneByEmail(email)

	if err != nil {
		return "", err
	}

	if err = s.comparePasswordFunc(user.Password, password); err != nil {
		return "", err
	}

	existingSession, err := s.sessionsService.FindByUserID(user.ID)

	if err == nil {
		if err = s.sessionsService.DeleteOneByID(existingSession.ID); err != nil {
			return "", err
		}
	} else if err != nil && !errors.Is(err, repositories.ErrSessionUserIDNotFound) {
		return "", err
	}

	session, err := s.sessionsService.Create(user.ID)

	if err != nil {
		return "", err
	}

	return session.ID, nil
}

func (s authImplementation) SignOut(sessionID string) error {
	return s.sessionsService.DeleteOneByID(sessionID)
}
