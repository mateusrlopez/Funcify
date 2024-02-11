package middlewares

import (
	"context"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/services"
	"github.com/rs/zerolog/log"
	"net/http"
)

type AuthCookie struct {
	sessionsService services.Sessions
	usersService    services.Users
}

type RoleKey string
type SessionIDKey string
type UserIDKey string

const (
	RK RoleKey      = "role"
	SK SessionIDKey = "sessionID"
	UK UserIDKey    = "userID"
)

func NewAuthCookie(sessionsService services.Sessions, usersService services.Users) AuthCookie {
	return AuthCookie{
		sessionsService: sessionsService,
		usersService:    usersService,
	}
}

func (m AuthCookie) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)
		cookie, err := r.Cookie("session")

		if err != nil {
			log.Error().Err(err).Str("requestID", requestID).Msg("could not retrieve the auth cookie")
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, err := m.sessionsService.FindByID(cookie.Value)

		if err != nil {
			log.Error().Err(err).Str("requestID", requestID).Str("sessionID", cookie.Value).Msg("could not retrieve the session with the given id")
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		user, err := m.usersService.FindOneByID(session.UserID)

		if err != nil {
			log.Error().Err(err).Str("requestID", requestID).Str("userID", session.UserID).Msg("could not retrieve the user related to the retrieved session")
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := r.Context()

		ctx = context.WithValue(ctx, RK, user.Role)
		ctx = context.WithValue(ctx, SK, session.ID)
		ctx = context.WithValue(ctx, UK, user.ID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
