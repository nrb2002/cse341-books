# CSE 341 Week 02 Specification — Books API

## Project Overview

The Week 02 assignment extends the Books API created during Week 01 by adding the remaining CRUD operations.

The Week 01 API already supports:

* `GET /books` — retrieve all books
* `GET /books/:id` — retrieve one book by ID

Week 02 will add the remaining operations:

* `POST /books` — create a book
* `PUT /books/:id` — update a book
* `DELETE /books/:id` — delete a book

The application will continue using Express.js, MongoDB, and the MVC architecture established in Week 01.

## Database

**Database:** `cse341-books-db`

**Collection:** `books`

Each book document contains:

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

### Required Fields

| Field             | Type   | Description                    |
| ----------------- | ------ | ------------------------------ |
| `id`              | String | Unique identifier for the book |
| `author`          | String | Author of the book             |
| `title`           | String | Title of the book              |
| `publicationDate` | String | Publication date of the book   |

---

# Week 02 API Endpoints

| API Action    | HTTP Method | Endpoint     | MongoDB Operation |
| ------------- | ----------- | ------------ | ----------------- |
| Create a book | `POST`      | `/books`     | `insertOne()`     |
| Update a book | `PUT`       | `/books/:id` | `updateOne()`     |
| Delete a book | `DELETE`    | `/books/:id` | `deleteOne()`     |

The following endpoints were implemented during Week 01 and are outside the scope of the new Week 02 implementation:

| API Action     | HTTP Method | Endpoint     | MongoDB Operation |
| -------------- | ----------- | ------------ | ----------------- |
| Read all books | `GET`       | `/books`     | `find()`          |
| Read one book  | `GET`       | `/books/:id` | `findOne()`       |

The Week 02 implementation must preserve the functionality of these existing routes.

---

# 1. Create a Book

## Endpoint

```http
POST /books
```

## Description

Creates a new book document in the `books` collection.

The client will send the book information in the request body.

## Request Body

```json
{
  "id": "b4",
  "author": "John Smith",
  "title": "The Hidden Path",
  "publicationDate": "2023-05-12"
}
```

## Success Response

A successfully created book will return HTTP status `201`.

```json
{
  "id": "b4",
  "author": "John Smith",
  "title": "The Hidden Path",
  "publicationDate": "2023-05-12"
}
```

## Duplicate ID

The `id` field must be unique.

If a create request uses an `id` that already exists, the API will return HTTP status `400 Bad Request`.

```json
{
  "message": "A book with this id already exists"
}
```

The duplicate book will not be created.

## Error Response

Unexpected errors will return HTTP status `500`.

```json
{
  "message": "Internal server error"
}
```

## MongoDB Operation

The model will use:

```javascript
insertOne()
```

---

# 2. Update a Book

## Endpoint

```http
PUT /books/:id
```

## Description

Updates an existing book using its `id`.

## Example

```http
PUT /books/b1
```

## Request Body

```json
{
  "author": "Maya Rivera",
  "title": "Patterns of Light - Revised Edition",
  "publicationDate": "2022-01-15"
}
```

The `id` is taken from the URL and will not be changed by the request body.

## Success Response

A successful update will return HTTP status `200`.

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light - Revised Edition",
  "publicationDate": "2022-01-15"
}
```

## Not Found Response

If the requested book does not exist, the API will return HTTP status `404`.

```json
{
  "message": "Book not found"
}
```

## Error Response

Unexpected errors will return HTTP status `500`.

```json
{
  "message": "Internal server error"
}
```

## MongoDB Operation

The model will use:

```javascript
updateOne()
```

---

# 3. Delete a Book

## Endpoint

```http
DELETE /books/:id
```

## Description

Deletes a book from the `books` collection using its `id`.

## Example

```http
DELETE /books/b4
```

## Success Response

A successful deletion will return HTTP status `204`.

The response will not contain a response body.

## Not Found Response

If the requested book does not exist, the API will return HTTP status `404`.

```json
{
  "message": "Book not found"
}
```

## Error Response

Unexpected errors will return HTTP status `500`.

```json
{
  "message": "Internal server error"
}
```

## MongoDB Operation

The model will use:

```javascript
deleteOne()
```

---

# Architecture

The application will continue using the MVC pattern established in Week 01.

```text
Client
  ↓
Router
  ↓
Controller
  ↓
Model
  ↓
MongoDB
```

## Models

The model layer will handle MongoDB operations:

```text
POST   /books       → insertOne()
PUT    /books/:id   → updateOne()
DELETE /books/:id   → deleteOne()
```

The existing Week 01 model functions for `GET /books` and `GET /books/:id` will remain unchanged unless a change is required to support the new functionality.

## Controllers

Controllers will:

* Read request parameters and body data.
* Call model functions.
* Determine the appropriate HTTP status.
* Return JSON responses.
* Handle unexpected errors using `try/catch`.

## Router

The router will connect the new endpoints to their controller functions:

```text
POST   /books
PUT    /books/:id
DELETE /books/:id
```

---

# Coding Standards

The implementation will follow the CSE 341 coding standards:

* Use ESM `import` and `export`.
* Do not use `require()` or `module.exports`.
* Use arrow functions.
* Use `async/await` with `try/catch`.
* Use `const` by default.
* Use `let` only when reassignment is required.
* Do not use `var`.
* Return after sending Express responses.
* Keep route handlers focused on request and response work.
* Move database operations into model functions.
* Use consistent JSON error responses.
* Do not expose database or server error details to API clients.
* Log useful error information on the server.
* Use descriptive variable names.
* Validate required environment variables when the application starts.

---

# Testing Requirements

## POST `/books`

* A valid book can be created.
* The new book appears in MongoDB.
* Successful creation returns status `201`.
* A duplicate `id` returns status `400`.
* A duplicate `id` does not create another document.
* Unexpected errors return status `500`.
* Error responses use safe JSON messages.

## PUT `/books/:id`

* An existing book can be updated.
* The updated data is stored in MongoDB.
* Successful updates return status `200`.
* A missing book ID returns status `404`.
* The not-found response is `{ "message": "Book not found" }`.
* Unexpected errors return status `500`.

## DELETE `/books/:id`

* An existing book can be deleted.
* The book is removed from MongoDB.
* Successful deletion returns status `204`.
* A missing book ID returns status `404`.
* The not-found response is `{ "message": "Book not found" }`.
* Unexpected errors return status `500`.

## Existing Week 01 Routes

The following routes must continue working after the Week 02 changes:

* `GET /books`
* `GET /books/:id`

---

# Environment Variables

The application will use environment variables for database configuration.

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=cse341-books-db
```

Database credentials and other secrets must not be committed to GitHub.

The `.env` file must be included in `.gitignore`.

---

# Git Workflow

Each new operation will be developed on its own feature branch.

Suggested branches:

```text
add-post-books-route
add-put-book-route
add-delete-book-route
```

Each completed feature will be:

1. Developed on a feature branch.
2. Tested locally.
3. Committed with a descriptive commit message.
4. Pushed to GitHub.
5. Submitted as a pull request.
6. Merged into `main`.
7. The feature branch deleted after merging.

---

# Deployment

After the new CRUD operations are implemented and tested, the application will be deployed to Render.

Production environment variables will be configured in Render:

```text
MONGODB_URI
MONGODB_DB_NAME
```

The deployed API will be tested for:

```text
POST   /books
GET    /books
GET    /books/:id
PUT    /books/:id
DELETE /books/:id
```

The final deployed URL will be recorded in the project README.

---

# Week 02 Completion Criteria

* [ ] `POST /books` creates a book.
* [ ] Duplicate book IDs return `400 Bad Request`.
* [ ] `PUT /books/:id` updates an existing book.
* [ ] `PUT /books/:id` returns `404` for a missing book.
* [ ] `DELETE /books/:id` deletes an existing book.
* [ ] `DELETE /books/:id` returns `404` for a missing book.
* [ ] Unexpected errors return safe `500` JSON responses.
* [ ] Existing `GET /books` continues working.
* [ ] Existing `GET /books/:id` continues working.
* [ ] All new routes follow the MVC architecture.
* [ ] MongoDB operations are handled in model functions.
* [ ] Environment variables contain database configuration.
* [ ] No database credentials are committed to GitHub.
* [ ] All new routes are tested locally.
* [ ] The completed API is deployed to Render.
* [ ] The deployed CRUD operations are tested.
* [ ] The final deployed URL is documented in the README.
