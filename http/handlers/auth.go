package handlers

import (
	"encoding/json"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/services"
	"net/http"
)

type Auth struct {
	sessionsService services.Sessions
}

func NewAuth(sessionsService services.Sessions) Auth {
	return Auth{
		sessionsService: sessionsService,
	}
}

func (h Auth) SignIn(w http.ResponseWriter, r *http.Request) {
	var req requests.SignIn

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sessionID, err := h.sessionsService.Create(req.Email, req.Password)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := http.Cookie{
		Name:       "session",
		Value:      sessionID,
		Path:       "/api/v2",
		HttpOnly:   false,
		Secure:     false,
		RawExpires: "Session",
		SameSite:   http.SameSiteStrictMode,
	}
	http.SetCookie(w, &cookie)

	w.WriteHeader(http.StatusNoContent)
}

func (h Auth) SignOut(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	sessionID := ctx.Value(middlewares.SK).(string)

	if err := h.sessionsService.DeleteOneByID(sessionID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
