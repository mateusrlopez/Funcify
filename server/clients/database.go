package clients

import (
	"errors"
	"github.com/rs/zerolog/log"
	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"time"
)

var ErrDialectNotImplemented = errors.New("could not instantiate a connection for given dialect")

func NewDatabase(dialect, dsn string, connectionAttempts uint, connectionAttemptInterval time.Duration) (*gorm.DB, error) {
	var client *gorm.DB
	var err error

	log.Info().Str("dialect", dialect).Str("dsn", dsn).Uint("attempts", connectionAttempts).Dur("interval", connectionAttemptInterval).Msg("starting attempts to connect to database")

	for attempt := 1; attempt <= int(connectionAttempts); attempt++ {
		client, err = connectByDialect(dialect, dsn)

		if err == nil {
			log.Info().Int("attempt", attempt).Str("dialect", dialect).Str("dsn", dsn).Msg("successfully connected to database")
			break
		}

		log.Warn().Int("attempt", attempt).Str("dialect", dialect).Str("dsn", dsn).Err(err).Msg("failed attempt to connect to database")
		time.Sleep(connectionAttemptInterval)
	}

	if err != nil {
		return nil, err
	}

	return client, nil
}

func connectByDialect(dialect, dsn string) (*gorm.DB, error) {
	var dialector gorm.Dialector

	switch dialect {
	case "mysql":
		dialector = mysql.Open(dsn)
	case "postgres":
		dialector = postgres.New(postgres.Config{DSN: dsn})
	default:
		return nil, ErrDialectNotImplemented
	}

	client, err := gorm.Open(dialector, &gorm.Config{Logger: logger.Default.LogMode(logger.Silent)})

	if err != nil {
		return nil, err
	}

	return client, nil
}
