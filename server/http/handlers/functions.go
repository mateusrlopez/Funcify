package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/http/responses"
	"github.com/mateusrlopez/funcify/services"
	"github.com/mateusrlopez/funcify/utils"
	"github.com/rs/zerolog/log"
	"net/http"
)

type Functions struct {
	functionsService   services.Functions
	fnStatusChangeChan chan entities.Function
}

func NewFunctions(functionsService services.Functions, fnStatusChangeChan chan entities.Function) Functions {
	return Functions{
		functionsService:   functionsService,
		fnStatusChangeChan: fnStatusChangeChan,
	}
}

func (h Functions) Create(w http.ResponseWriter, r *http.Request) {
	var req requests.CreateFunction

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

	function, err := h.functionsService.Create(req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not create the function with the given parameters")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Index(w http.ResponseWriter, r *http.Request) {
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	functions, err := h.functionsService.FindAll()

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not recover the functions")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunctions(functions)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	function, err := h.functionsService.FindOneByID(id)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not recover function with given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Update(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateFunction

	id := chi.URLParam(r, "id")
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

	function, err := h.functionsService.UpdateOneByID(id, req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not update the function with the given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := h.functionsService.DeleteOneByID(id); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not delete the function with the given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) NotifyStatusChange(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	for function := range h.fnStatusChangeChan {
		fmt.Fprintf(w, "event: function.%s.status\n", function.ID)
		fmt.Fprintf(w, "data: %s\n\n", function.Status)
		w.(http.Flusher).Flush()
	}
}
