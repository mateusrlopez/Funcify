package database

import (
	"github.com/mateusrlopez/funcify/models"
	"gorm.io/gorm"
)

func CreateTables(database *gorm.DB) error {
	if err := database.AutoMigrate(&models.User{}, &models.Session{}, &models.Function{}); err != nil {
		return err
	}

	return nil
}
