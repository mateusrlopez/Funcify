package http

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"time"
)

type Server struct {
	server *http.Server
}

func NewServer(handler http.Handler, port uint, readTimeout, writeTimeout time.Duration) *Server {
	return &Server{
		server: &http.Server{
			Addr:         fmt.Sprintf(":%d", port),
			Handler:      handler,
			ReadTimeout:  readTimeout,
			WriteTimeout: writeTimeout,
		},
	}
}

func (s *Server) Shutdown(ctx context.Context) error {
	if err := s.server.Shutdown(ctx); err != nil {
		return err
	}
	return nil
}

func (s *Server) ListenAndServe() error {
	if err := s.server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		return err
	}
	return nil
}
