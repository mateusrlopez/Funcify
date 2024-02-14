# API Reference

## Authentication

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

#### Response
No response body

#### Observations
The `sessionID` is in the response header

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

---

## Users

### Create User

Endpoint to create a new user

```shell
POST /api/v1/users
```

#### Request: Body

| Body       | Type     | Description                  |
|:-----------|:---------|:-----------------------------|
| `email`    | `string` | User e-mail (**Required**)   |
| `password` | `string` | User password (**Required**) |
| `role`     | `string` | User role (**Required**)     |

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "string",
  "createdAt": "string"
}
```

---

### Update User

Endpoint to update a specific user

```http request
PUT /api/v1/users/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | User ID (**Required**)       |

#### Request: Body

| Body    | Type     | Description                |
|:--------|:---------|:---------------------------|
| `email` | `string` | User e-mail (**Required**) |
| `role`  | `string` | User role (**Required**)   |

#### Response

```json
{
  "id": "string",
  "email": "string",
  "role": "string",
  "createdAt": "string"
}
```

---

### Get User

Endpoint to get the list of users

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
      "role": "string",
      "createdAt": "string"
    }
  ]
}
```

---

### Get Specific User

Endpoint to get a specific user by ID

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
  "role": "string",
  "createdAt": "string"
}
```

---

### Get User of Session

Endpoint to get the user of the current session

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
  "role": "string",
  "createdAt": "string"
}
```

---

### Delete User

Endpoint to delete a specific user

```http request
DELETE /api/v1/users/:id
```

#### Request: Parameters

| Parameter | Type     | Description                  |
|:----------|:---------|:-----------------------------|
| `id`      | `string` | User ID (**Required**)       |

#### Response

No response body

---