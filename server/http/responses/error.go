package responses

import "time"

type Error struct {
	Error     string    `json:"error"`
	Timestamp time.Time `json:"timestamp"`
}

func NewError(err string) Error {
	return Error{
		Error:     err,
		Timestamp: time.Now(),
	}
}
