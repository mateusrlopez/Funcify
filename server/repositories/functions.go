package repositories

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/models"
	"gorm.io/gorm"
)

type Functions interface {
	Insert(function entities.Function) (entities.Function, error)
	FindAll() ([]entities.Function, error)
	FindOneByID(id string) (entities.Function, error)
	UpdateOne(function, data entities.Function) (entities.Function, error)
	DeleteOne(function entities.Function) error
}

type functionsImplementation struct {
	database *gorm.DB
}

var (
	ErrFunctionIDNotFound = errors.New("could not find the function for the given id")
)

func NewFunctions(database *gorm.DB) Functions {
	return functionsImplementation{
		database: database,
	}
}

func (r functionsImplementation) Insert(function entities.Function) (entities.Function, error) {
	model := models.NewFunction(function)

	if err := r.database.Create(&model).Error; err != nil {
		return entities.Function{}, err
	}

	return model.ToEntity(), nil
}

func (r functionsImplementation) FindAll() ([]entities.Function, error) {
	var e []entities.Function
	var m []models.Function

	if err := r.database.Find(&m).Error; err != nil {
		return nil, err
	}

	for _, model := range m {
		e = append(e, model.ToEntity())
	}

	return e, nil
}

func (r functionsImplementation) FindOneByID(id string) (entities.Function, error) {
	var function models.Function

	if err := r.database.First(&function, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.Function{}, ErrFunctionIDNotFound
		}
		return entities.Function{}, err
	}

	return function.ToEntity(), nil
}

func (r functionsImplementation) UpdateOne(function, data entities.Function) (entities.Function, error) {
	model := models.NewFunction(function)

	if err := r.database.Model(&model).Updates(models.NewFunction(data)).Error; err != nil {
		return entities.Function{}, err
	}

	return model.ToEntity(), nil
}

func (r functionsImplementation) DeleteOne(function entities.Function) error {
	model := models.NewFunction(function)

	if err := r.database.Delete(&model).Error; err != nil {
		return err
	}

	return nil
}
