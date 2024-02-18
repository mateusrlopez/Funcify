package utils

import (
	"encoding/json"
	"github.com/mateusrlopez/funcify/http/responses"
	"net/http"
)

func SendErrorResponse(writer http.ResponseWriter, message string, status int) {
	res := responses.NewError(message)

	writer.WriteHeader(status)

	json.NewEncoder(writer).Encode(&res)
}
