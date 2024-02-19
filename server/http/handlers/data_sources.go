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

type DataSources struct {
	dataSourcesService         services.DataSources
	dataSourceStatusChangeChan chan entities.DataSource
}

func NewDataSources(dataSourcesService services.DataSources, dataSourceStatusChangeChan chan entities.DataSource) DataSources {
	return DataSources{
		dataSourcesService:         dataSourcesService,
		dataSourceStatusChangeChan: dataSourceStatusChangeChan,
	}
}

func (h DataSources) Create(w http.ResponseWriter, r *http.Request) {
	var req requests.CreateDataSource

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

	dataSource, err := h.dataSourcesService.Create(req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not create the dataSource with the given parameters")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewDataSource(dataSource)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h DataSources) Index(w http.ResponseWriter, r *http.Request) {
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	dataSources, err := h.dataSourcesService.FindAll()

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not recover the dataSources")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewDataSources(dataSources)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h DataSources) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	dataSource, err := h.dataSourcesService.FindOneByID(id)

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not recover dataSource with given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewDataSource(dataSource)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h DataSources) Update(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateDataSource

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

	dataSource, err := h.dataSourcesService.UpdateOneByID(id, req.ToEntity())

	if err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not update the dataSource with the given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewDataSource(dataSource)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Msg("could not encode response to json format")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h DataSources) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

	if err := h.dataSourcesService.DeleteOneByID(id); err != nil {
		log.Error().Err(err).Str("requestID", requestID).Str("id", id).Msg("could not delete the dataSource with the given id")
		utils.SendErrorResponse(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h DataSources) NotifyHealthStatusChange(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	for {
		select {
		case dataSource := <-h.dataSourceStatusChangeChan:
			log.Debug().Str("id", dataSource.ID).Str("status", dataSource.HealthStatus).Msg("new data source health status update event")

			fmt.Fprintf(w, "event: dataSource.%s.healthStatus\n", dataSource.ID)
			fmt.Fprintf(w, "data: %s\n\n", dataSource.HealthStatus)
			w.(http.Flusher).Flush()
		}
	}
}
