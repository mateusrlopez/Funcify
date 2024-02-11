package middlewares

import (
	chimiddlewares "github.com/go-chi/chi/v5/middleware"
	"github.com/rs/zerolog/log"
	"net/http"
)

type responseWriter struct {
	writer http.ResponseWriter
	code   int
}

func newResponseWriter(writer http.ResponseWriter) *responseWriter {
	return &responseWriter{
		writer: writer,
		code:   http.StatusOK,
	}
}

func (rw *responseWriter) Header() http.Header {
	return rw.writer.Header()
}

func (rw *responseWriter) Write(data []byte) (int, error) {
	return rw.writer.Write(data)
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.code = code
	rw.writer.WriteHeader(code)
}

func Logger(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		requestID := r.Context().Value(chimiddlewares.RequestIDKey).(string)

		uri := r.RequestURI
		requestHeaders := r.Header
		method := r.Method

		writer := newResponseWriter(w)
		next.ServeHTTP(writer, r)

		status := writer.code
		responseHeaders := writer.Header()

		log.Debug().
			Str("requestID", requestID).
			Str("uri", uri).
			Interface("requestHeaders", requestHeaders).
			Interface("responseHeaders", responseHeaders).
			Str("method", method).
			Int("status", status).
			Msg("new request to server")
	})
}
