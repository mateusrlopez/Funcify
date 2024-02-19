package healthchecks

type HealthCheckFn func(connection interface{}) error
