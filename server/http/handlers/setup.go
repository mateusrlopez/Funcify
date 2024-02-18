package handlers

import (
	"encoding/json"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/http/cookies"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/http/responses"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Setup struct {
	sessionsService services.Sessions
	usersService    services.Users
}

func NewSetup(sessionsService services.Sessions, usersService services.Users) Setup {
	return Setup{
		sessionsService: sessionsService,
		usersService:    usersService,
	}
}

func (h Setup) Do(w http.ResponseWriter, r *http.Request) {
	var req requests.Setup

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

	user, err := h.usersService.Create(req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not create the user with the given parameters")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	session, err := h.sessionsService.Create(user.ID)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not create the session with the given parameters")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cookie := cookies.NewSession(session.ID)
	http.SetCookie(w, cookie)

	res := responses.NewUser(user)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Setup) Done(w http.ResponseWriter, r *http.Request) {
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	done, err := h.usersService.ExistsOne()

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not check if an user exists")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := map[string]interface{}{"done": done}

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
