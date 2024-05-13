package main

import (
	"context"
	"github.com/kelseyhightower/envconfig"
	"github.com/mateusrlopez/funcify/clients"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/http"
	"github.com/mateusrlopez/funcify/http/handlers"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/managers"
	"github.com/mateusrlopez/funcify/models"
	"github.com/mateusrlopez/funcify/repositories"
	"github.com/mateusrlopez/funcify/runtimes"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"os"
	"os/signal"
	"syscall"
)

var environment settings.Environment

func init() {
	envconfig.MustProcess("", &environment)

	switch environment.LogLevel {
	case "PANIC":
		zerolog.SetGlobalLevel(zerolog.PanicLevel)
	case "FATAL":
		zerolog.SetGlobalLevel(zerolog.FatalLevel)
	case "ERROR":
		zerolog.SetGlobalLevel(zerolog.ErrorLevel)
	case "WARN":
		zerolog.SetGlobalLevel(zerolog.WarnLevel)
	case "INFO":
		zerolog.SetGlobalLevel(zerolog.InfoLevel)
	case "DEBUG":
		zerolog.SetGlobalLevel(zerolog.DebugLevel)
	case "TRACE":
		zerolog.SetGlobalLevel(zerolog.TraceLevel)
	}
}

func main() {
	db, err := clients.NewDatabase(environment.Database.Dialect, environment.Database.DSN, environment.Database.ConnectionAttempts, environment.Database.ConnectionAttemptInterval)

	if err != nil {
		log.Fatal().Str("dialect", environment.Database.Dialect).Str("dsn", environment.Database.DSN).Err(err).Msg("could not connect to database")
	}

	err = db.AutoMigrate(&models.User{}, &models.Session{}, &models.DataSource{}, &models.Function{})

	if err != nil {
		log.Fatal().Err(err).Msg("could not create the database tables")
	}

	dataSourceHealthStatusChangeChan := make(chan entities.DataSource)
	fnStatusChangeChan := make(chan entities.Function)

	dataSourcesRepository := repositories.NewDataSources(db)
	functionsRepository := repositories.NewFunctions(db)
	sessionsRepository := repositories.NewSessions(db)
	usersRepository := repositories.NewUsers(db)

	dataSourceManager := managers.NewDataSource(dataSourceHealthStatusChangeChan, dataSourcesRepository)

	if err = dataSourceManager.StartExistingDataSources(); err != nil {
		log.Fatal().Err(err).Msg("could not start the existing data sources")
	}

	functionRuntime := runtimes.NewRuntime(functionsRepository, dataSourceManager, fnStatusChangeChan)

	if err = functionRuntime.StartExistingFunctions(); err != nil {
		log.Fatal().Err(err).Msg("could not start the existing functions")
	}

	dataSourcesService := services.NewDataSources(dataSourcesRepository, dataSourceManager)
	functionsService := services.NewFunctions(functionsRepository, functionRuntime)
	usersService := services.NewUsers(usersRepository, utils.HashPassword)
	sessionsService := services.NewSessions(sessionsRepository)
	authService := services.NewAuth(sessionsService, usersService, utils.CompareHashToRaw)

	authHandler := handlers.NewAuth(authService)
	dataSourcesHandler := handlers.NewDataSources(dataSourcesService, dataSourceHealthStatusChangeChan)
	functionsHandler := handlers.NewFunctions(functionsService, fnStatusChangeChan)
	setupHandler := handlers.NewSetup(sessionsService, usersService)
	usersHandler := handlers.NewUsers(usersService)

	authCookieMiddleware := middlewares.NewAuthCookie(sessionsService, usersService)
	allowSetupMiddleware := middlewares.NewAllowSetup(usersService)

	router := http.NewRouter(authHandler, dataSourcesHandler, functionsHandler, setupHandler, usersHandler, allowSetupMiddleware, authCookieMiddleware)

	server := http.NewServer(router, environment.Server.Port, environment.Server.ReadTimeout, environment.Server.WriteTimeout)

	go func() {
		log.Info().Uint("port", environment.Server.Port).Msg("starting server")
		if err = server.ListenAndServe(); err != nil {
			log.Fatal().Err(err).Msg("could not start the server")
		}
	}()

	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, syscall.SIGINT, syscall.SIGTERM)

	<-signalChannel

	if err = server.Shutdown(context.Background()); err != nil {
		log.Fatal().Err(err).Msg("could not properly shutdown the server")
	}
}
