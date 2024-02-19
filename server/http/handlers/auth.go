package handlers

import (
	"encoding/json"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/http/cookies"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Auth struct {
	authService services.Auth
}

func NewAuth(authService services.Auth) Auth {
	return Auth{
		authService: authService,
	}
}

func (h Auth) SignIn(w http.ResponseWriter, r *http.Request) {
	var req requests.SignIn

	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not decode the request body")
		utils.SendErrorResponse(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	defer r.Body.Close()

	if err := req.Validate(); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not validate the request body")
		utils.SendErrorResponse(w, err.Error(), http.StatusBadRequest)
		return
	}

	sessionID, err := h.authService.SignIn(req.Email, req.Password)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not sign in with given credentials")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := cookies.NewSession(sessionID)
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusNoContent)
}

func (h Auth) SignOut(w http.ResponseWriter, r *http.Request) {
	sessionID := r.Context().Value(middlewares.SK).(string)
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := h.authService.SignOut(sessionID); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not delete session")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
