package http

import (
	"github.com/go-chi/chi/v5"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/http/handlers"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"net/http"
)

func NewRouter(authHandler handlers.Auth, dataSourcesHandler handlers.DataSources, functionsHandler handlers.Functions, setupHandler handlers.Setup, usersHandler handlers.Users, allowSetupMiddleware middlewares.AllowSetup, authCookieMiddleware middlewares.AuthCookie) http.Handler {
	router := chi.NewRouter()

	router.Use(chimiddlewares.RequestID)
	router.Use(chimiddlewares.SetHeader("Content-Type", "application/json"))
	router.Use(middlewares.Logger)

	router.Route("/api/v1", func(r chi.Router) {
		r.Route("/setup", func(r chi.Router) {
			r.Get("/", setupHandler.Done)

			r.Group(func(r chi.Router) {
				r.Use(allowSetupMiddleware.Allow)

				r.Post("/", setupHandler.Do)
			})
		})

		r.Route("/auth", func(r chi.Router) {
			r.Post("/sign-in", authHandler.SignIn)

			r.Group(func(r chi.Router) {
				r.Use(authCookieMiddleware.Authenticate)

				r.Delete("/sign-out", authHandler.SignOut)
			})
		})

		r.Group(func(r chi.Router) {
			r.Use(authCookieMiddleware.Authenticate)

			r.Route("/users", func(r chi.Router) {
				r.Get("/", usersHandler.Index)
				r.Get("/{id}", usersHandler.Get)
				r.Get("/me", usersHandler.Me)

				r.Group(func(r chi.Router) {
					r.Use(middlewares.Admin)

					r.Post("/", usersHandler.Create)
					r.Put("/{id}", usersHandler.Update)
					r.Delete("/{id}", usersHandler.Delete)
				})
			})

			r.Route("/functions", func(r chi.Router) {
				r.Post("/", functionsHandler.Create)
				r.Get("/", functionsHandler.Index)
				r.Get("/{id}", functionsHandler.Get)
				r.Put("/{id}", functionsHandler.Update)
				r.Get("/notify-status-change", functionsHandler.NotifyStatusChange)

				r.Group(func(r chi.Router) {
					r.Use(middlewares.Admin)

					r.Delete("/{id}", functionsHandler.Delete)
				})
			})

			r.Route("/data-sources", func(r chi.Router) {
				r.Post("/", dataSourcesHandler.Create)
				r.Get("/", dataSourcesHandler.Index)
				r.Get("/{id}", dataSourcesHandler.Get)
				r.Put("/{id}", dataSourcesHandler.Update)
				r.Get("/notify-status-change", dataSourcesHandler.NotifyHealthStatusChange)

				r.Group(func(r chi.Router) {
					r.Use(middlewares.Admin)

					r.Delete("/{id}", dataSourcesHandler.Delete)
				})
			})
		})
	})

	return router
}
