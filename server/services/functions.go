package services

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
	"github.com/mateusrlopez/funcify/runtimes"
	"github.com/mateusrlopez/funcify/utils"
)

type Functions interface {
	Create(function entities.Function) (entities.Function, error)
	FindAll() ([]entities.Function, error)
	FindOneByID(id string) (entities.Function, error)
	UpdateOneByID(id string, data entities.Function) (entities.Function, error)
	DeleteOneByID(id string) error
}

type functionsImplementation struct {
	functionsRepository repositories.Functions
	runtime             runtimes.Function
}

func NewFunctions(functionRepository repositories.Functions, runtime runtimes.Function) Functions {
	return functionsImplementation{
		functionsRepository: functionRepository,
		runtime:             runtime,
	}
}

func (s functionsImplementation) Create(function entities.Function) (entities.Function, error) {
	function.ID = utils.GenerateUUID()

	if err := s.runtime.HandleNewFunction(function); err != nil {
		return entities.Function{}, nil
	}

	created, err := s.functionsRepository.Insert(function)

	if err != nil {
		return entities.Function{}, err
	}

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

	data.ID = id
	if err = s.runtime.HandleFunctionUpdate(data); err != nil {
		return entities.Function{}, err
	}

	updated, err := s.functionsRepository.UpdateOne(function, data)

	if err != nil {
		return entities.Function{}, err
	}

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

	s.runtime.HandleFunctionDelete(function)

	if err = s.functionsRepository.DeleteOne(function); err != nil {
		return err
	}

	return nil
}
