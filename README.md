# ToDoList API

A RESTful API for user authentication and task management.

## Authentication

Some endpoints require a JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### General

#### GET /
- **Description:** Returns a welcome message.
- **Authentication:** None
- **Response Example:**
  ```json
  "Welcome to the ToDoList API!"
  ```

---

### User Authentication

#### POST /register
- **Description:** Register a new user.
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Responses:**
  - `201 Created` – Registration successful
    ```json
    { "message": "User registered successfully" }
    ```
  - `409 Conflict` – Email already exists
    ```json
    { "error": "Email already registered" }
    ```
  - `400 Bad Request` – Missing fields
    ```json
    { "error": "Email and password required" }
    ```
  - `500 Internal Server Error` – Database error

---

#### POST /login
- **Description:** Login and receive a JWT token.
- **Authentication:** None
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Responses:**
  - `200 OK` – Login successful
    ```json
    { "token": "JWT_TOKEN_HERE" }
    ```
  - `401 Unauthorized` – Invalid credentials
    ```json
    { "error": "Invalid email or password" }
    ```
  - `400 Bad Request` – Missing fields
    ```json
    { "error": "Email and password required" }
    ```
  - `500 Internal Server Error` – Database error

---

### Tasks (Require Authentication)

#### GET /tasks
- **Description:** Get all tasks for the authenticated user.
- **Authentication:** Required
- **Response Example:**
  ```json
  [
    { "id": 1, "title": "Buy milk", "completed": false },
    { "id": 2, "title": "Read book", "completed": true }
  ]
  ```
- **Status Codes:** `200 OK`, `500 Internal Server Error`

---

#### POST /tasks
- **Description:** Add a new task for the authenticated user.
- **Authentication:** Required
- **Request Body:**
  ```json
  { "title": "New Task" }
  ```
- **Response Example:**
  - `201 Created`
    ```json
    { "id": 3, "title": "New Task", "completed": false }
    ```
  - `400 Bad Request` – Missing title
    ```json
    { "error": "Title required" }
    ```
  - `500 Internal Server Error` – Database error

---

#### PUT /tasks/:id
- **Description:** Update a task (title and/or completed status) for the authenticated user.
- **Authentication:** Required
- **URL Parameters:**
  - `id` (number): Task ID
- **Request Body:**
  ```json
  { "title": "Updated Title", "completed": true }
  ```
- **Response Example:**
  - `200 OK`
    ```json
    { "id": 3, "title": "Updated Title", "completed": true }
    ```
  - `500 Internal Server Error` – Database error

---

#### DELETE /tasks/:id
- **Description:** Delete a task for the authenticated user.
- **Authentication:** Required
- **URL Parameters:**
  - `id` (number): Task ID
- **Response Example:**
  - `200 OK`
    ```json
    { "success": true }
    ```
  - `500 Internal Server Error` – Database error

---

## Error Handling

All endpoints may return:
- `500 Internal Server Error` with `{ "error": "Database error" }` on server/database issues.
