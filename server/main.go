package main

import (
	"context"
	"github.com/kelseyhightower/envconfig"
	"github.com/mateusrlopez/funcify/clients"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/http"
	"github.com/mateusrlopez/funcify/http/handlers"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/models"
	"github.com/mateusrlopez/funcify/repositories"
	"github.com/mateusrlopez/funcify/runtime"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog/log"
	"os"
	"os/signal"
	"syscall"
)

var environment settings.Environment

func init() {
	envconfig.MustProcess("", &environment)
}

func main() {
	db, err := clients.NewDatabase(environment.Database.Dialect, environment.Database.DSN, environment.Database.ConnectionAttempts, environment.Database.ConnectionAttemptInterval)

	if err != nil {
		log.Fatal().Str("dialect", environment.Database.Dialect).Str("dsn", environment.Database.DSN).Err(err).Msg("could not connect to database")
	}

	err = db.AutoMigrate(&models.User{}, &models.Session{}, &models.Function{})

	if err != nil {
		log.Fatal().Err(err).Msg("could not create the database tables")
	}

	newFnChan := make(chan entities.Function)
	updatedFnChan := make(chan entities.Function)
	deletedFnChan := make(chan entities.Function)
	fnStatusChangeChan := make(chan entities.Function)

	functionsRepository := repositories.NewFunctions(db)
	sessionsRepository := repositories.NewSessions(db)
	usersRepository := repositories.NewUsers(db)

	functionsService := services.NewFunctions(functionsRepository, newFnChan, updatedFnChan, deletedFnChan)
	usersService := services.NewUsers(usersRepository, utils.HashPassword)
	sessionsService := services.NewSessions(sessionsRepository)
	authService := services.NewAuth(sessionsService, usersService, utils.CompareHashToRaw)

	authHandler := handlers.NewAuth(authService)
	functionsHandler := handlers.NewFunctions(functionsService, fnStatusChangeChan)
	setupHandler := handlers.NewSetup(sessionsService, usersService)
	usersHandler := handlers.NewUsers(usersService)

	authCookieMiddleware := middlewares.NewAuthCookie(sessionsService, usersService)
	allowSetupMiddleware := middlewares.NewAllowSetup(usersService)

	router := http.NewRouter(authHandler, functionsHandler, setupHandler, usersHandler, allowSetupMiddleware, authCookieMiddleware)

	r := runtime.NewRuntime(functionsService, newFnChan, updatedFnChan, deletedFnChan, fnStatusChangeChan)
	if err = r.ExecuteExistingFunctions(); err != nil {
		log.Fatal().Err(err).Msg("could not start the execution of the already existing functions in database")
	}

	go r.Run()
	defer r.Shutdown()

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
