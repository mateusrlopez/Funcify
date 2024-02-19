# API Reference

## Setup (Onboarding)

The setup is the first step to start using the platform. It creates the first user and sets up the platform.

### Do

```http request
POST /api/v1/setup
```

#### Request: Body

| Body       | Type     | Description                  |
|:-----------|:---------|:-----------------------------|
| `email`    | `string` | User e-mail (**Required**)   |
| `password` | `string` | User password (**Required**) |

#### Request: Example

```json
{
  "email": "john.doe@example.com",
  "password": "abc123"
}
```

#### Response

No response body

<br>

---

### Is Done?

It checks if the setup was done

```http request
GET /api/v1/setup
```

#### Request

No request body or parameters

#### Response

```json
{
  "done": "true | false"
}
```

<br>

---

## Authentication

The authentication is done based on a `sessionID` token (cookies). The `sessionID` token is generated when the user signs in and is invalidated when the user signs out.

### Sign In

Endpoint to authenticate a user and get a sessionID token

```http request
POST /api/v1/auth/sign-in
```

#### Request: Body

| Body           | Type     | Description                  |
|:---------------|:---------|:-----------------------------|
| `email`        | `string` | User e-mail (**Required**)   |
| `password`     | `string` | User password (**Required**) |

#### Request: Example

```json
{
  "email": "string",
  "password": "string"
}
```

#### Response
No response body

#### Observations
The `sessionID` is in the response header

<br>

---

### Sign Out

Endpoint to sign out a user and invalidate the sessionID token

```http request
DELETE /api/v1/auth/sign-out
```
#### Request

No request body or parameters

#### Response

No response body

<br>

---

## Users

A user is a person who can access the platform. It can be an administrator or a common user.

### Create User

It creates a new user

```shell
POST /api/v1/users
```

#### Request: Body

| Body       | Type     | Description                        |
|:-----------|:---------|:-----------------------------------|
| `email`    | `string` | User e-mail (**Required**)         |
| `password` | `string` | User password (**Required**)       |
| `role`     | `string` | `ADMIN` or `COMMON` (**Required**) |

#### Request: Example

```json
{
  "email": "string",
  "password": "string",
  "role": "ADMIN"
}
```

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "ADMIN | COMMON",
  "createdAt": "string"
}
```

<br>

---

### Update User

It updates the data of a specific user

```http request
PUT /api/v1/users/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | User ID (**Required**)       |

#### Request: Body

| Body    | Type     | Description                        |
|:--------|:---------|:-----------------------------------|
| `email` | `string` | User e-mail (**Required**)         |
| `role`  | `string` | `ADMIN` or `COMMON` (**Required**) |

#### Request: Example

```json
{
  "email": "string",
  "role": "COMMON"
}
```

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "ADMIN | COMMON",
  "createdAt": "string"
}
```

<br>

---

### Get Users

It gets the list of users

```http request
GET /api/v1/users
```
#### Request

No request body or parameters

#### Response

```json
{
  "users": [
    {
      "id": "string",
      "email": "string",
      "role": "ADMIN | COMMON",
      "createdAt": "string"
    }
  ]
}
```

<br>

---

### Get Specific User

It gets a specific user by ID

```http request
GET /api/v1/users/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | User ID (**Required**)       |

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "ADMIN | COMMON",
  "createdAt": "string"
}
```

<br>

---

### Get User of Session

It gets the user of the current session

```http request
GET /api/v1/users/me
```

#### Request

No request body or parameters

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "ADMIN | COMMON",
  "createdAt": "string"
}
```

<br>

---

### Delete User

It deletes a specific user by ID

```http request
DELETE /api/v1/users/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | User ID (**Required**)       |

#### Response

No response body

<br>

---

### My Profile

It gets the profile of the current user

```http request
GET /api/v1/users/me
```

#### Request

No request body or parameters

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "ADMIN | COMMON",
  "createdAt": "string"
}
```

<br>

---

## Functions

A function is a piece of code that can be executed by the platform. It can be triggered by an event incoming from an input connector and can send an event to an output datasource.

### Create Function

It creates a new function

```http request
POST /api/v1/functions
```

#### Request: Body

| Body                           | Type     | Description                                                         |
|:-------------------------------|:---------|:--------------------------------------------------------------------|
| `name`                         | `string` | Function name (**Required**)                                        |
| `sourceCode`                   | `string` | Source Code of the function (**Required**)                          |
| `methodToExecute`              | `string` | Name of the main function present in the source code (**Required**) |
| `inputConnectorType`           | `string` | `MQTT` or `REDIS` (**Required**)                                    |
| `inputConnectorConfiguration`  | `object` | MQTT or Redis configuration (**Required**)                          |
| `outputConnectorType`          | `string` | `MQTT` or `REDIS` (**Required**)                                    |
| `outputConnectorConfiguration` | `object` | MQTT or Redis configuration (**Required**)                          |

#### Request: Example using Redis as input connector and no output connector

```json
{
  "name": "function_name",
  "sourceCode": "function main() { console.log('Hello, World!'); }",
  "methodToExecute": "main",
  "inputConnectorType": "REDIS",
  "inputConnectorConfiguration": {
    "channel": "string"
  },
  "outputConnectorType": "",
  "outputConnectorConfiguration": {}
}
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "sourceCode": "string",
  "methodToExecute": "string",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "REDIS | MQTT",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "REDIS | MQTT",
  "outputConnectorConfiguration": {}
}
```

<br>

---

### Update Function

It updates the data of a specific function

```http request
PUT /api/v1/functions/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | Function ID (**Required**)   |

#### Request: Body

| Body                           | Type     | Description                                                         |
|:-------------------------------|:---------|:--------------------------------------------------------------------|
| `name`                         | `string` | Function name (**Required**)                                        |
| `sourceCode`                   | `string` | Source Code of the function (**Required**)                          |
| `methodToExecute`              | `string` | Name of the main function present in the source code (**Required**) |
| `inputConnectorType`           | `string` | `MQTT` or `REDIS` (**Required**)                                    |
| `inputConnectorConfiguration`  | `object` | MQTT or Redis configuration (**Required**)                          |
| `outputConnectorType`          | `string` | `MQTT` or `REDIS` (**Required**)                                    |
| `outputConnectorConfiguration` | `object` | MQTT or Redis configuration (**Required**)                          |
    
#### Request: Example using MQTT as input connector and no output connector

```json
{
  "name": "function_name",
  "sourceCode": "function main() { console.log('Hello, World!'); }",
  "methodToExecute": "main",
  "inputConnectorType": "MQTT",
  "inputConnectorConfiguration": {
    "topic": "string"
  },
  "outputConnectorType": "",
  "outputConnectorConfiguration": {}
}
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "sourceCode": "string",
  "methodToExecute": "string",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "REDIS | MQTT",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "REDIS | MQTT",
  "outputConnectorConfiguration": {}
}
```

<br>

---

### Get Functions

It gets the list of functions

```http request
GET /api/v1/functions
```

#### Request

No request body or parameters

#### Response

```json
{
  "functions": [
    {
      "id": "string",
      "name": "string",
      "sourceCode": "string",
      "methodToExecute": "string",
      "status": "CREATING | RUNNING | ERROR",
      "inputConnectorType": "REDIS | MQTT",
      "inputConnectorConfiguration": {},
      "outputConnectorType": "REDIS | MQTT",
      "outputConnectorConfiguration": {}
    }
  ]
}
```

<br>

---

### Get Specific Function

It gets a specific function by ID

```http request
GET /api/v1/functions/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | Function ID (**Required**)   |

#### Response

```json
{
  "id": "string",
  "name": "string",
  "sourceCode": "string",
  "methodToExecute": "string",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "REDIS | MQTT",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "REDIS | MQTT",
  "outputConnectorConfiguration": {}
}
```

<br>

---

### Delete Function

It deletes a specific function by ID

```http request
DELETE /api/v1/functions/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | Function ID (**Required**)   |

#### Response

No response body

<br>

---

### Notify Status Change

Server Sent Event (SSE) to notify the status change of all functions

```http request
GET /api/v1/functions/notify-status-change
```

#### Request

No request body or parameters

#### Response

```json
{
  "id": "string",
  "status": "CREATING | RUNNING | ERROR"
}
```

<br>

---

## Data Sources

A data source is a configuration to connect to a specific data source. It can be a Redis, MQTT, or any other data source.

### Create Data Source

It creates a new data source

```http request
POST /api/v1/data-sources
```

#### Request: Body

| Body            | Type     | Description                                |
|:----------------|:---------|:-------------------------------------------|
| `name`          | `string` | Data source name (**Required**)            |
| `type`          | `string` | `REDIS` or `MQTT` (**Required**)           |
| `configuration` | `object` | Redis or MQTT configuration (**Required**) |

#### Request: Example of Redis Data Source

```json
{
  "name": "data_source_name",
  "type": "REDIS",
  "configuration": {
    "address": "string",
    "username": "string",
    "password": "string",
    "database": 0
  }
}
```

#### Request: Example of MQTT Data Source

```json
{
  "name": "data_source_name",
  "type": "MQTT",
  "configuration": {
    "broker": "string",
    "qos": "string"
  }
}
```

#### Response

```json
{
  "id": "string",
  "name": "string",
  "type": "REDIS | MQTT",
  "configuration": {}
}
```

<br>

---

### Get Data Sources

It gets the list of data sources

```http request
GET /api/v1/data-sources
```

#### Request

No request body or parameters

#### Response

```json
{
  "dataSources": [
    {
      "id": "string",
      "name": "string",
      "type": "REDIS | MQTT",
      "configuration": {}
    }
  ]
}
```

<br>

---

### Get Specific Data Source

It gets a specific data source by ID

```http request
GET /api/v1/data-sources/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | Data Source ID (**Required**) |

#### Response

```json
{
  "id": "string",
  "name": "string",
  "type": "REDIS | MQTT",
  "configuration": {}
}
```

<br>

---

### Delete Data Source

It deletes a specific data source by ID

```http request
DELETE /api/v1/data-sources/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | Data Source ID (**Required**) |

#### Response

No response body