package http

import (
	"github.com/go-chi/chi/v5"
	"github.com/mateusrlopez/funcify/http/handlers"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"net/http"
)

func NewRouter(authHandler handlers.Auth, functionsHandler handlers.Functions, usersHandler handlers.Users, authCookieMiddleware middlewares.AuthCookie) http.Handler {
	router := chi.NewRouter()

	router.Route("/api/v1", func(r chi.Router) {
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
				r.Get("/:id", usersHandler.Get)
				r.Get("/me", usersHandler.Me)

				r.Group(func(r chi.Router) {
					r.Use(middlewares.Admin)

					r.Post("/", usersHandler.Create)
					r.Put("/:id", usersHandler.Update)
					r.Delete("/:id", usersHandler.Delete)
				})
			})

			r.Route("/functions", func(r chi.Router) {
				r.Post("/", functionsHandler.Create)
				r.Get("/", functionsHandler.Index)
				r.Get("/:id", functionsHandler.Get)
				r.Put("/:id", functionsHandler.Update)
				r.Get("/notify-status-change", functionsHandler.NotifyStatusChange)

				r.Group(func(r chi.Router) {
					r.Use(middlewares.Admin)

					r.Delete("/:id", functionsHandler.Delete)
				})
			})
		})
	})

	return router
}
