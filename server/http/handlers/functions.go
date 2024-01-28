package handlers

import (
	"encoding/json"
	"fmt"
	"github.com/go-chi/chi/v5"
	"github.com/mateusrlopez/funcify/entities"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/http/responses"
	"github.com/mateusrlopez/funcify/services"
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

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	function, err := h.functionsService.Create(req.ToEntity())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Index(w http.ResponseWriter, r *http.Request) {
	functions, err := h.functionsService.FindAll()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunctions(functions)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	function, err := h.functionsService.FindOneByID(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Update(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateFunction

	id := chi.URLParam(r, "id")

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	function, err := h.functionsService.UpdateOneByID(id, req.ToEntity())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewFunction(function)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Functions) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if err := h.functionsService.DeleteOneByID(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
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
