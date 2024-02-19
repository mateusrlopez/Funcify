# Quick Start: Development

This document provides a quick start guide for development.

## Server

To run the server locally, follow the steps below:

1. Ensure that you're in the `root` directory

2. Define the environment variables on the `.env` file present in the root directory

| Parameter                      | Description                                                             |
|:-------------------------------|:------------------------------------------------------------------------|
| `DATABASE_DIALECT`             | `postgres` or `mysql` (**Required**)                                    |
| `DATABASE_DSN`                 | Connection string                                                       |
| `DATABASE_CONNECTION_ATTEMPTS` | Number of attempts to connect to the database                           |
| `DATABASE_CONNECTION_INTERVAL` | Interval between connection attempts                                    |
| `SERVER_PORT`                  | Port to run the server                                                  |
| `SERVER_READ_TIMEOUT`          | Server read timeout                                                     |
| `SERVER_WRITE_TIMEOUT`         | Server write timeout                                                    |
| `LOG_LEVEL`                    | `DEBUG` or `PANIC` or `FATAL` or `ERROR` or `WARN` or `INFO` or `TRACE` |                                      |

3. Create infrastructure resources on `Docker`

```shell
make compose-up-v1

# OR

make compose-up-v2
```

4. Start the server

```shell
make run-server
```

5. If you need to down the infrastructure resources

```shell
make compose-down-v1

# OR

make compose-down-v2
```

---

## Client

To run the client locally, follow the steps below:

Instructions about how to run the client

1. Ensure that you're in the `root` directory

2. Prepare the environment

```shell
make prepare-client
```

3. Start the project

```shell
make run-client-dev
```

4. If you need to see the production build, run the command below

```shell
make run-client-prod
```