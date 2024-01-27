package handlers

import (
	"encoding/json"
	"github.com/go-chi/chi/v5"
	"github.com/mateusrlopez/funcify/http/middlewares"
	"github.com/mateusrlopez/funcify/http/requests"
	"github.com/mateusrlopez/funcify/http/responses"
	"github.com/mateusrlopez/funcify/services"
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

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.usersService.Create(req.ToEntity())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	w.WriteHeader(http.StatusCreated)
	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Index(w http.ResponseWriter, r *http.Request) {
	users, err := h.usersService.FindAll()

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUsers(users)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Get(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	user, err := h.usersService.FindOneByID(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Me(w http.ResponseWriter, r *http.Request) {
	id := r.Context().Value(middlewares.UK).(string)

	user, err := h.usersService.FindOneByID(id)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Update(w http.ResponseWriter, r *http.Request) {
	var req requests.UpdateUser

	id := chi.URLParam(r, "id")

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	if err := req.Validate(); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.usersService.UpdateOneByID(id, req.ToEntity())

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	res := responses.NewUser(user)

	if err = json.NewEncoder(w).Encode(&res); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func (h Users) Delete(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")

	if err := h.usersService.DeleteOneByID(id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
