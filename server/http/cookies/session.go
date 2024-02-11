package cookies

import "net/http"

func NewSession(sessionID string) *http.Cookie {
	return &http.Cookie{
		Name:       "session",
		Value:      sessionID,
		Path:       "/api/v1",
		HttpOnly:   false,
		Secure:     false,
		RawExpires: "Session",
		SameSite:   http.SameSiteStrictMode,
	}
}
