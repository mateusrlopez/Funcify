package handlers

import (
	"encoding/json"
	"github.com/go-chi/chi/v5"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/http/responses"
	"github.com/mateusrlopez/funcify/services"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Users struct {
	usersService services.Users
}

func NewUsers(usersService services.Users) Users {
	return Users{
		usersService: usersService,
	}
}

func (h Users) Create(w http.ResponseWriter, r *http.Request) {
	var req requests.CreateUser

	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not decode the request body")
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	defer r.Body.Close()

	if err := req.Validate(); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not validate the request body")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.usersService.Create(req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not create the user with the given parameters")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Index(w http.ResponseWriter, r *http.Request) {
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	users, err := h.usersService.FindAll()

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not recover the users")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUsers(users)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	user, err := h.usersService.FindOneByID(id)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not retrieve the user with the given id")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Me(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(middlewares.UK).(string)
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	user, err := h.usersService.FindOneByID(id)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not retrieve the user with the given id")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Update(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateUser

	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not decode the request body")
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}
	defer r.Body.Close()

	if err := req.Validate(); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not validate the request body")
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.usersService.UpdateOneByID(id, req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not update the user with the given id")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := h.usersService.DeleteOneByID(id); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not delete the user with the given id")
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
