# CSE 341 Week 01 Specification — Books API

## Feature: Book API

### Goal

Create a Node.js and Express API that connects to MongoDB and provides access to book data.

The API will use an MVC structure to separate database operations, request handling, and routing.

The API must use custom string IDs for books instead of MongoDB `_id` values.

### Data Model

Book documents will be stored in the `books` collection.

Each book contains the following fields:

* `id`: string, required, custom ID such as `b1`
* `author`: string, required
* `title`: string, required
* `publicationDate`: string, required

Example:

```json
{
  "id": "b1",
  "author": "Example Author",
  "title": "Example Book",
  "publicationDate": "2026-01-15"
}
```

The MongoDB database is:

```text
cse341-books-db
```

The collection is:

```text
books
```

Books will use their custom `id` field for API route parameters rather than MongoDB's `_id`.

---

## Database Connection

The application must connect to MongoDB using the MongoDB connection string stored in an environment variable.

Required environment variables:

```text
MONGODB_URI
MONGODB_DB_NAME
```

The database name is:

```text
cse341-books-db
```

Database credentials and connection information must not be hard-coded in the source code.

---

# Routes

## GET /books

### Purpose

Return all books stored in the `books` collection.

### Success

* Status code: `200`
* Response body: a JSON array containing all book documents.

Example:

```json
[
  {
    "id": "b1",
    "author": "Author One",
    "title": "Book One",
    "publicationDate": "2026-01-15"
  },
  {
    "id": "b2",
    "author": "Author Two",
    "title": "Book Two",
    "publicationDate": "2026-02-20"
  }
]
```

### Errors

* `500` if an unexpected server or database error occurs.

The error response should not expose raw database or server details.

Example:

```json
{
  "message": "Internal server error"
}
```

---

## GET /books/:id

### Purpose

Return a single book using its custom `id`.

Example:

```text
GET /books/b1
```

### Success

* Status code: `200`
* Response body: the matching book object.

Example:

```json
{
  "id": "b1",
  "author": "Author One",
  "title": "Book One",
  "publicationDate": "2026-01-15"
}
```

### Errors

* `404` if no book exists with the requested ID.
* `500` if an unexpected server or database error occurs.

Example `404` response:

```json
{
  "message": "Book not found"
}
```

Example `500` response:

```json
{
  "message": "Internal server error"
}
```

---

# MVC Requirements

The application should separate responsibilities using an MVC-style structure.

### Model

The model is responsible for database operations.

For example:

```text
src/models/books.js
```

The model should provide functions such as:

* `getAllBooks()`
* `getBookById(bookId)`

The model should handle communication with the MongoDB `books` collection.

### Controller

The controller is responsible for handling HTTP requests and responses.

For example:

```text
src/controllers/books.js
```

The controllers should:

* Receive the request.
* Obtain required parameters.
* Call the appropriate model function.
* Return the appropriate HTTP status and JSON response.
* Handle unexpected errors without exposing internal error details.

### Router

The router is responsible for defining the API routes.

For example:

```text
src/router.js
```

Required routes:

```text
GET /books
GET /books/:id
```

---

# Code Standards

The project should follow the CSE 341 coding standards:

* Use ES modules with `import` and `export`.
* Do not use CommonJS `require()` or `module.exports`.
* Use `const` by default.
* Do not use `var`.
* Use arrow functions where appropriate.
* Use `async/await` for asynchronous operations.
* Use `try/catch` for error handling.
* Do not use `.then()` or `.catch()`.
* Return after sending an Express response when necessary to prevent further execution.
* Use descriptive names for variables and functions.
* Keep database logic in model functions.
* Keep HTTP request/response logic in controllers.
* Do not expose raw database errors to API clients.

---

# Error Handling

The API must provide appropriate HTTP status codes.

### Successful requests

* `200` for successful GET requests.

### Client errors

* `404` when the requested book does not exist.

### Server errors

* `500` for unexpected server or database errors.

Error responses should use JSON and provide a clear message.

---

# Testing

The following tests must be performed.

### GET /books

* Verify that the endpoint returns `200`.
* Verify that the response is a JSON array.
* Verify that the returned books contain the expected fields.
* Verify that database errors are handled with `500`.

### GET /books/:id

* Verify that an existing book returns `200`.
* Verify that the correct book is returned.
* Verify that a nonexistent book returns `404`.
* Verify that unexpected database errors return `500`.

---

# Deployment

The application must be deployed to Render.

The deployed application must:

* Connect successfully to MongoDB.
* Provide the `/books` route.
* Provide the `/books/:id` route.
* Return the expected status codes and JSON responses.

The Week 01 routes must be verified both locally and on the deployed application.

---

# Week 01 Completion Checklist

* [ ] Node.js and Express application created.
* [ ] MongoDB connection configured.
* [ ] `cse341-books-db` database configured.
* [ ] `books` collection created/populated.
* [ ] MVC structure implemented.
* [ ] `GET /books` implemented.
* [ ] `GET /books/:id` implemented.
* [ ] Custom string book IDs used for route parameters.
* [ ] Appropriate `200`, `404`, and `500` responses implemented.
* [ ] Error responses do not expose raw database errors.
* [ ] Code follows CSE 341 standards.
* [ ] API deployed to Render.
* [ ] Both GET routes tested locally.
* [ ] Both GET routes tested on the deployed application.
