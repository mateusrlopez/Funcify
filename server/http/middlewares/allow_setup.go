package middlewares

import (
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog/log"
	"net/http"
)

type AllowSetup struct {
	usersService services.Users
}

func NewAllowSetup(usersService services.Users) AllowSetup {
	return AllowSetup{
		usersService: usersService,
	}
}

func (m AllowSetup) Allow(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

		done, err := m.usersService.ExistsOne()

		if err != nil {
			log.Error().Err(err).Str("requestID", requestID).Msg("could not check if an user exists")
			utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if done {
			utils.SendErrorResponse(w, "setup was already made", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
