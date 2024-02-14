# API Reference

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

| Body    | Type     | Description                       |
|:--------|:---------|:----------------------------------|
| `email` | `string` | User e-mail (**Required**)        |
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

### Get User

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
    "address": "string",
    "username": "string",
    "password": "string",
    "database": "string",
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
  "methodToExecute": "REDIS | MQTT",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "string",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "string",
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
    "broker": "string",
    "topic": "string",
    "qos": "string"
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
  "methodToExecute": "REDIS | MQTT",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "string",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "string",
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
      "methodToExecute": "REDIS | MQTT",
      "status": "CREATING | RUNNING | ERROR",
      "inputConnectorType": "string",
      "inputConnectorConfiguration": {},
      "outputConnectorType": "string",
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
  "methodToExecute": "REDIS | MQTT",
  "status": "CREATING | RUNNING | ERROR",
  "inputConnectorType": "string",
  "inputConnectorConfiguration": {},
  "outputConnectorType": "string",
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

TODO