package services

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/managers"
	"github.com/mateusrlopez/funcify/repositories"
	"github.com/mateusrlopez/funcify/utils"
)

type DataSources interface {
	Create(dataSource entities.DataSource) (entities.DataSource, error)
	FindAll() ([]entities.DataSource, error)
	FindOneByID(id string) (entities.DataSource, error)
	UpdateOneByID(id string, data entities.DataSource) (entities.DataSource, error)
	DeleteOneByID(id string) error
}

type dataSourcesImplementation struct {
	dataSourcesRepository repositories.DataSources
	dataSourcesManager    managers.DataSource
}

func NewDataSources(dataSourceRepository repositories.DataSources, dataSourcesManager managers.DataSource) DataSources {
	return dataSourcesImplementation{
		dataSourcesRepository: dataSourceRepository,
		dataSourcesManager:    dataSourcesManager,
	}
}

func (s dataSourcesImplementation) Create(dataSource entities.DataSource) (entities.DataSource, error) {
	dataSource.ID = utils.GenerateUUID()

	if err := s.dataSourcesManager.HandleNewDataSource(dataSource); err != nil {
		return entities.DataSource{}, err
	}

	created, err := s.dataSourcesRepository.Insert(dataSource)

	if err != nil {
		return entities.DataSource{}, err
	}

	return created, nil
}

func (s dataSourcesImplementation) FindAll() ([]entities.DataSource, error) {
	dataSources, err := s.dataSourcesRepository.FindAll()

	if err != nil {
		return nil, err
	}

	return dataSources, nil
}

func (s dataSourcesImplementation) FindOneByID(id string) (entities.DataSource, error) {
	dataSource, err := s.dataSourcesRepository.FindOneByID(id)

	if err != nil {
		return entities.DataSource{}, err
	}

	return dataSource, nil
}

func (s dataSourcesImplementation) UpdateOneByID(id string, data entities.DataSource) (entities.DataSource, error) {
	dataSource, err := s.dataSourcesRepository.FindOneByID(id)

	if err != nil {
		return entities.DataSource{}, err
	}

	data.ID = id
	if err = s.dataSourcesManager.HandleUpdateDataSource(data); err != nil {
		return entities.DataSource{}, err
	}

	updated, err := s.dataSourcesRepository.UpdateOne(dataSource, data)

	if err != nil {
		return entities.DataSource{}, err
	}

	return updated, nil
}

func (s dataSourcesImplementation) DeleteOneByID(id string) error {
	dataSource, err := s.dataSourcesRepository.FindOneByID(id)

	if err != nil {
		return err
	}

	if err = s.dataSourcesManager.HandleDeleteDataSource(dataSource); err != nil {
		return err
	}

	if err = s.dataSourcesRepository.DeleteOne(dataSource); err != nil {
		return err
	}

	return nil
}
