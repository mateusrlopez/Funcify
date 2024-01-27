package main

import (
	"context"
	"github.com/kelseyhightower/envconfig"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/http"
	"github.com/mateusrlopez/funcify/http/handlers"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/infrastructure/database"
	"github.com/mateusrlopez/funcify/repositories"
	"github.com/mateusrlopez/funcify/runtime"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/settings"
	"github.com/mateusrlopez/funcify/utils"
	"os"
	"os/signal"
	"syscall"
)

var environment settings.Environment

func init() {
	envconfig.MustProcess("", &environment)
}

func main() {
	db, err := database.NewDatabaseClient(environment.Database.Dialect, environment.Database.DSN, environment.Database.ConnectionAttempts, environment.Database.ConnectionAttemptInterval)

	if err != nil {
		panic(err)
	}

	err = database.CreateTables(db)

	if err != nil {
		panic(err)
	}

	newFnChan := make(chan entities.Function)
	updatedFnChan := make(chan entities.Function)
	deletedFnChan := make(chan entities.Function)

	functionsRepository := repositories.NewFunctions(db)
	sessionsRepository := repositories.NewSessions(db)
	usersRepository := repositories.NewUsers(db)

	functionsService := services.NewFunctions(functionsRepository, newFnChan, updatedFnChan, deletedFnChan)
	usersService := services.NewUsers(usersRepository, utils.HashPassword)
	sessionsService := services.NewSessions(sessionsRepository, usersService, utils.CompareHashToRaw)

	authHandler := handlers.NewAuth(sessionsService)
	functionsHandler := handlers.NewFunctions(functionsService)
	usersHandler := handlers.NewUsers(usersService)

	authCookieMiddleware := middlewares.NewAuthCookie(sessionsService, usersService)

	router := http.NewRouter(authHandler, functionsHandler, usersHandler, authCookieMiddleware)

	r := runtime.NewRuntime(functionsService, newFnChan, updatedFnChan, deletedFnChan)

	go r.Run()
	defer r.Shutdown()

	server := http.NewServer(router, environment.Server.Port, environment.Server.ReadTimeout, environment.Server.WriteTimeout)

	go func() {
		if err = server.ListenAndServe(); err != nil {
			panic(err)
		}
	}()

	signalChannel := make(chan os.Signal, 1)
	signal.Notify(signalChannel, syscall.SIGINT, syscall.SIGTERM)

	<-signalChannel

	if err = server.Shutdown(context.Background()); err != nil {
		panic(err)
	}
}
