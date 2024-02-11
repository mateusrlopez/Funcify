package middlewares

import (
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/rs/zerolog/log"
	"net/http"
)

func Admin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		role := r.Context().Value(RK).(string)
		requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

		if role != entities.AdminRole {
			log.Error().Str("requestID", requestID).Msg("user is not from ADMIN role")
			http.Error(w, "user is not from ADMIN role", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
