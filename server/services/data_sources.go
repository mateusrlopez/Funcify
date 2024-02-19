package services

import (
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/repositories"
)

type DataSources interface {
	Create(dataSource entities.DataSource) (entities.DataSource, error)
	FindAll() ([]entities.DataSource, error)
	FindOneByID(id string) (entities.DataSource, error)
	UpdateOneByID(id string, data entities.DataSource) (entities.DataSource, error)
	UpdateOne(dataSource, data entities.DataSource) (entities.DataSource, error)
	DeleteOneByID(id string) error
}

type dataSourcesImplementation struct {
	dataSourcesRepository repositories.DataSources
	dataSourceCreateChan  chan entities.DataSource
	dataSourceUpdateChan  chan entities.DataSource
	dataSourceDeleteChan  chan entities.DataSource
}

func NewDataSources(dataSourceRepository repositories.DataSources, dataSourceCreateChan, dataSourceUpdateChan, dataSourceDeleteChan chan entities.DataSource) DataSources {
	return dataSourcesImplementation{
		dataSourcesRepository: dataSourceRepository,
		dataSourceCreateChan:  dataSourceCreateChan,
		dataSourceUpdateChan:  dataSourceUpdateChan,
		dataSourceDeleteChan:  dataSourceDeleteChan,
	}
}

func (s dataSourcesImplementation) Create(dataSource entities.DataSource) (entities.DataSource, error) {
	created, err := s.dataSourcesRepository.Insert(dataSource)

	if err != nil {
		return entities.DataSource{}, err
	}

	s.dataSourceCreateChan <- created

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

	updated, err := s.dataSourcesRepository.UpdateOne(dataSource, data)

	if err != nil {
		return entities.DataSource{}, err
	}

	s.dataSourceUpdateChan <- updated

	return updated, nil
}

func (s dataSourcesImplementation) UpdateOne(dataSource, data entities.DataSource) (entities.DataSource, error) {
	return s.dataSourcesRepository.UpdateOne(dataSource, data)
}

func (s dataSourcesImplementation) DeleteOneByID(id string) error {
	dataSource, err := s.dataSourcesRepository.FindOneByID(id)

	if err != nil {
		return err
	}

	if err = s.dataSourcesRepository.DeleteOne(dataSource); err != nil {
		return err
	}

	s.dataSourceDeleteChan <- dataSource

	return nil
}
