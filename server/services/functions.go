package services

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
)

type Functions interface {
	Create(function entities.Function) (entities.Function, error)
	FindAll() ([]entities.Function, error)
	FindOneByID(id string) (entities.Function, error)
	UpdateOneByID(id string, data entities.Function) (entities.Function, error)
	UpdateOne(function, data entities.Function) (entities.Function, error)
	DeleteOneByID(id string) error
}

type functionsImplementation struct {
	functionsRepository repositories.Functions
	fnCreateChan        chan entities.Function
	fnUpdateChan        chan entities.Function
	fnDeleteChan        chan entities.Function
}

func NewFunctions(functionRepository repositories.Functions, fnCreateChan, fnUpdateChan, fnDeleteChan chan entities.Function) Functions {
	return functionsImplementation{
		functionsRepository: functionRepository,
		fnCreateChan:        fnCreateChan,
		fnUpdateChan:        fnUpdateChan,
		fnDeleteChan:        fnDeleteChan,
	}
}

func (s functionsImplementation) Create(function entities.Function) (entities.Function, error) {
	created, err := s.functionsRepository.Insert(function)

	if err != nil {
		return entities.Function{}, err
	}

	s.fnCreateChan <- created

	return created, nil
}

func (s functionsImplementation) FindAll() ([]entities.Function, error) {
	functions, err := s.functionsRepository.FindAll()

	if err != nil {
		return nil, err
	}

	return functions, nil
}

func (s functionsImplementation) FindOneByID(id string) (entities.Function, error) {
	function, err := s.functionsRepository.FindOneByID(id)

	if err != nil {
		return entities.Function{}, err
	}

	return function, nil
}

func (s functionsImplementation) UpdateOneByID(id string, data entities.Function) (entities.Function, error) {
	function, err := s.functionsRepository.FindOneByID(id)

	if err != nil {
		return entities.Function{}, err
	}

	updated, err := s.functionsRepository.UpdateOne(function, data)

	if err != nil {
		return entities.Function{}, err
	}

	s.fnUpdateChan <- updated

	return updated, nil
}

func (s functionsImplementation) UpdateOne(function, data entities.Function) (entities.Function, error) {
	return s.functionsRepository.UpdateOne(function, data)
}

func (s functionsImplementation) DeleteOneByID(id string) error {
	function, err := s.functionsRepository.FindOneByID(id)

	if err != nil {
		return err
	}

	if err = s.functionsRepository.DeleteOne(function); err != nil {
		return err
	}

	s.fnDeleteChan <- function

	return nil
}
