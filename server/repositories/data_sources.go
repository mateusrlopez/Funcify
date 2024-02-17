package repositories

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/models"
	"gorm.io/gorm"
)

type DataSources interface {
	Insert(dataSource entities.DataSource) (entities.DataSource, error)
	FindAll() ([]entities.DataSource, error)
	FindOneByID(id string) (entities.DataSource, error)
	UpdateOne(dataSource, data entities.DataSource) (entities.DataSource, error)
	DeleteOne(dataSource entities.DataSource) error
}

type dataSourcesImplementation struct {
	database *gorm.DB
}

var (
	ErrDataSourceIDNotFound = errors.New("could not find the data source for the given id")
)

func NewDataSources(database *gorm.DB) DataSources {
	return dataSourcesImplementation{
		database: database,
	}
}

func (r dataSourcesImplementation) Insert(dataSource entities.DataSource) (entities.DataSource, error) {
	model := models.NewDataSource(dataSource)

	if err := r.database.Create(&model).Error; err != nil {
		return entities.DataSource{}, err
	}

	return model.ToEntity(), nil
}

func (r dataSourcesImplementation) FindAll() ([]entities.DataSource, error) {
	var e []entities.DataSource
	var m []models.DataSource

	if err := r.database.Find(&m).Error; err != nil {
		return nil, err
	}

	for _, model := range m {
		e = append(e, model.ToEntity())
	}

	return e, nil
}

func (r dataSourcesImplementation) FindOneByID(id string) (entities.DataSource, error) {
	var dataSource models.DataSource

	if err := r.database.First(&dataSource, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.DataSource{}, ErrDataSourceIDNotFound
		}
		return entities.DataSource{}, err
	}

	return dataSource.ToEntity(), nil
}

func (r dataSourcesImplementation) UpdateOne(dataSource, data entities.DataSource) (entities.DataSource, error) {
	model := models.NewDataSource(dataSource)

	if err := r.database.Model(&model).Updates(models.NewDataSource(data)).Error; err != nil {
		return entities.DataSource{}, err
	}

	return model.ToEntity(), nil
}

func (r dataSourcesImplementation) DeleteOne(dataSource entities.DataSource) error {
	model := models.NewDataSource(dataSource)

	if err := r.database.Delete(&model).Error; err != nil {
		return err
	}

	return nil
}
