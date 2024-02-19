package settings

import "time"

type Environment struct {
	Server struct {
		Port         uint          `required:"true"`
		ReadTimeout  time.Duration `default:"10s" split_words:"true"`
		WriteTimeout time.Duration `default:"10s" split_words:"true"`
	}

	Database struct {
		Dialect                   string        `required:"true"`
		DSN                       string        `required:"true"`
		ConnectionAttempts        uint          `default:"3" split_words:"true"`
		ConnectionAttemptInterval time.Duration `default:"1s" split_words:"true"`
	}

	LogLevel string `default:"INFO" split_words:"true"`
}
