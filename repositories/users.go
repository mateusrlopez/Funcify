package repositories

import (
	"errors"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/models"
	"gorm.io/gorm"
)

type Users interface {
	Insert(user entities.User) (entities.User, error)
	FindAll() ([]entities.User, error)
	FindOneByEmail(email string) (entities.User, error)
	FindOneByID(id string) (entities.User, error)
	UpdateOne(user, data entities.User) (entities.User, error)
	DeleteOne(user entities.User) error
}

type usersImplementation struct {
	database *gorm.DB
}

var (
	ErrUserIDNotFound    = errors.New("could not find user with the given id")
	ErrUserEmailNotFound = errors.New("could not find user with the given email")
)

func NewUsers(database *gorm.DB) Users {
	return usersImplementation{
		database: database,
	}
}

func (r usersImplementation) Insert(user entities.User) (entities.User, error) {
	model := models.NewUser(user)

	if err := r.database.Create(&model).Error; err != nil {
		return entities.User{}, err
	}

	return model.ToEntity(), nil
}

func (r usersImplementation) FindAll() ([]entities.User, error) {
	var e []entities.User
	var m []models.User

	if err := r.database.Find(&m).Error; err != nil {
		return nil, err
	}

	for _, model := range m {
		e = append(e, model.ToEntity())
	}

	return e, nil
}

func (r usersImplementation) FindOneByEmail(email string) (entities.User, error) {
	var model models.User

	if err := r.database.First(&model, "email = ?", email).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.User{}, ErrUserEmailNotFound
		}
		return entities.User{}, err
	}

	return model.ToEntity(), nil
}

func (r usersImplementation) FindOneByID(id string) (entities.User, error) {
	var model models.User

	if err := r.database.First(&model, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return entities.User{}, ErrUserIDNotFound
		}
		return entities.User{}, err
	}

	return model.ToEntity(), nil
}

func (r usersImplementation) UpdateOne(user, data entities.User) (entities.User, error) {
	model := models.NewUser(user)

	if err := r.database.Model(&model).Updates(models.NewUser(data)).Error; err != nil {
		return entities.User{}, err
	}

	return model.ToEntity(), nil
}

func (r usersImplementation) DeleteOne(user entities.User) error {
	model := models.NewUser(user)

	if err := r.database.Delete(&model).Error; err != nil {
		return err
	}

	return nil
}
