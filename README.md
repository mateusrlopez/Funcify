# Funcify

Funcify is a self-hosted platform consisting of a function execution engine (runtime) and an API for managing these functions. Its goal is to offer a lean solution with low operational costs and reduced latency for executing stateless functions written in JavaScript.

Developers can deploy the FaaS environment in their infrastructure, whether it's on a Kubernetes container, a virtual machine, etc. After defining a function, it can be executed in response to events coming from previously defined data sources, following an event-driven architecture. Without using the concept of Container-as-a-Service to execute functions, Funcify keeps functions in memory and interprets them at runtime into the Go language, leveraging the full potential of the language for parallelism. This approach ensures high performance in situations requiring low latency, avoiding cold starts.

To run the project in your infrastructure, see the getting started documentation by clicking [here](https://github.com/mateusrlopez/Funcify/blob/master/docs/dev-quick-start.md).

To explore and understand the API, see its documentation by clicking [here](https://github.com/mateusrlopez/Funcify/blob/master/docs/api-reference.md).