package middlewares

import (
	"github.com/mateusrlopez/funcify/entities"
	"net/http"
)

func Admin(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		role := r.Context().Value(RK).(string)

		if role != entities.AdminRole {
			http.Error(w, "user is not from ADMIN role", http.StatusForbidden)
			return
		}

		next.ServeHTTP(w, r)
	})
}
