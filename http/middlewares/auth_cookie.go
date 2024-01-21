package middlewares

import (
	"context"
	"github.com/mateusrlopez/funcify/services"
	"net/http"
)

type AuthCookie struct {
	sessionsService services.Sessions
	usersService    services.Users
}

type RoleKey string
type SessionIdKey string
type UserIdKey string

const (
	RK RoleKey      = "role"
	SK SessionIdKey = "sessionID"
	UK UserIdKey    = "userID"
)

func NewAuthCookie(sessionsService services.Sessions, usersService services.Users) AuthCookie {
	return AuthCookie{
		sessionsService: sessionsService,
		usersService:    usersService,
	}
}

func (m AuthCookie) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("session")

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		session, err := m.sessionsService.FindByID(cookie.Value)

		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		user, err := m.usersService.FindOneByID(session.UserID)

		if err != nil {
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
