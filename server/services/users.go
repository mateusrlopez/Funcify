package services

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
)

type Users interface {
	Create(user entities.User) (entities.User, error)
	FindAll() ([]entities.User, error)
	FindOneByEmail(email string) (entities.User, error)
	FindOneByID(id string) (entities.User, error)
	ExistsOne() (bool, error)
	UpdateOneByID(id string, data entities.User) (entities.User, error)
	DeleteOneByID(id string) error
}

type usersImplementation struct {
	usersRepository     repositories.Users
	passwordHarsherFunc func(string) (string, error)
}

func NewUsers(usersRepository repositories.Users, passwordHarsherFunc func(string) (string, error)) Users {
	return usersImplementation{
		usersRepository:     usersRepository,
		passwordHarsherFunc: passwordHarsherFunc,
	}
}

func (s usersImplementation) Create(user entities.User) (entities.User, error) {
	hashedPassword, err := s.passwordHarsherFunc(user.Password)

	if err != nil {
		return entities.User{}, err
	}

	user.Password = hashedPassword

	created, err := s.usersRepository.Insert(user)

	if err != nil {
		return entities.User{}, err
	}

	return created, nil
}

func (s usersImplementation) FindAll() ([]entities.User, error) {
	return s.usersRepository.FindAll()
}

func (s usersImplementation) FindOneByEmail(email string) (entities.User, error) {
	return s.usersRepository.FindOneByEmail(email)
}

func (s usersImplementation) FindOneByID(id string) (entities.User, error) {
	return s.usersRepository.FindOneByID(id)
}

func (s usersImplementation) ExistsOne() (bool, error) {
	if err := s.usersRepository.ExistsOne(); err != nil {
		if errors.Is(err, repositories.ErrNoUsers) {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

func (s usersImplementation) UpdateOneByID(id string, data entities.User) (entities.User, error) {
	user, err := s.usersRepository.FindOneByID(id)

	if err != nil {
		return entities.User{}, err
	}

	updated, err := s.usersRepository.UpdateOne(user, data)

	if err != nil {
		return entities.User{}, err
	}

	return updated, nil
}

func (s usersImplementation) DeleteOneByID(id string) error {
	user, err := s.usersRepository.FindOneByID(id)

	if err != nil {
		return err
	}

	if err = s.usersRepository.DeleteOne(user); err != nil {
		return err
	}

	return nil
}
