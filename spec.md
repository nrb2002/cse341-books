# Books API Specification

## 1. Project Overview

The **Books API** is a simple RESTful web service that works with a collection of books.

The API will allow a client application to:

* Retrieve all books.
* Retrieve one book by its ID.

The initial version of the API will focus on read-only operations. The application can be improved later and expanded into a virtual library or online book shop.

The API will be built using **Node.js**, **Express**, and **MongoDB**, following the coding standards required by CSE 341.

---

## 2. Objectives

The Books API should:

* Store books in a MongoDB collection.
* Provide an endpoint to retrieve all books.
* Provide an endpoint to retrieve one book by ID.
* Return data in JSON format.
* Return appropriate HTTP status codes.
* Handle books that do not exist.
* Handle unexpected server errors safely.
* Use ESM syntax (`import` / `export`).
* Be deployed to Render.

---

# 3. Data Model

The MongoDB database will be named:

```text
cse341-books-db
```

The collection will be named:

```text
books
```

Each book document must contain the following fields:

| Field             | Type   | Required | Description                         |
| ----------------- | ------ | -------- | ----------------------------------- |
| `id`              | String | Yes      | Unique identifier for the book      |
| `author`          | String | Yes      | Author of the book                  |
| `title`           | String | Yes      | Title of the book                   |
| `publicationDate` | String | Yes      | Publication date in ISO 8601 format |

### Example Book

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

The database must contain at least **three seed book documents**.

---

# 4. API Endpoints

## 4.1 Retrieve All Books

### Endpoint

```http
GET /books
```

### Description

Retrieves all books from the `books` collection.

This endpoint allows a client application to display a complete list of books.

### Success Response

**Status:** `200 OK`

```json
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  },
  {
    "id": "b2",
    "author": "James Carter",
    "title": "The Last Horizon",
    "publicationDate": "2020-05-12"
  }
]
```

### Error Response

If an unexpected server error occurs:

**Status:** `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

## 4.2 Retrieve One Book by ID

### Endpoint

```http
GET /books/:id
```

### Description

Retrieves a single book from the `books` collection using its `id` field.

This endpoint allows a client application to display detailed information about a selected book.

### Example Request

```http
GET /books/b1
```

### Success Response

**Status:** `200 OK`

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

### Book Not Found

If the requested book does not exist:

**Status:** `404 Not Found`

```json
{
  "message": "Book not found"
}
```

### Server Error

If an unexpected server error occurs:

**Status:** `500 Internal Server Error`

```json
{
  "message": "Internal server error"
}
```

---

# 5. HTTP Status Codes

| Status Code | Meaning               | Usage                         |
| ----------- | --------------------- | ----------------------------- |
| `200`       | OK                    | Successful request            |
| `404`       | Not Found             | Requested book does not exist |
| `500`       | Internal Server Error | Unexpected server error       |

---

# 6. Route Summary

| Method | Endpoint     | Description             |
| ------ | ------------ | ----------------------- |
| `GET`  | `/books`     | Retrieve all books      |
| `GET`  | `/books/:id` | Retrieve one book by ID |

---

# 7. Error Handling

The API should return safe and consistent JSON error messages.

### Book Not Found

```json
{
  "message": "Book not found"
}
```

Status:

```text
404 Not Found
```

### Internal Server Error

```json
{
  "message": "Internal server error"
}
```

Status:

```text
500 Internal Server Error
```

The API should not expose sensitive information, database credentials, stack traces, or other implementation details in production error responses.

---

# 8. Project Structure

The project should follow a modular structure consistent with CSE 341 coding standards.

```text
books-api/
│
├── controllers/
│   └── booksController.js
│
├── routes/
│   └── booksRoutes.js
│
├── db/
│   └── database.js
│
├── data/
│   └── books.js
│
├── app.js
├── server.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

The exact organization may be adjusted during implementation as long as the code remains modular and follows the course standards.

---

# 9. CSE 341 Coding Standards

The implementation must follow the coding standards taught in CSE 341.

## ESM Syntax

Use:

```js
import express from 'express';
```

and:

```js
export default app;
```

Do not use CommonJS syntax such as:

```js
const express = require('express');
```

or:

```js
module.exports = app;
```

## Naming

Use meaningful and descriptive names.

Example:

```js
const bookId = req.params.id;
```

Avoid unclear names such as:

```js
const x = req.params.id;
```

## Variables

Use `const` by default and `let` only when a variable needs to be reassigned.

## Semicolons

Use semicolons consistently.

```js
const app = express();
```

## Modular Code

Keep related functionality in separate modules.

* Routes define API endpoints.
* Controllers handle request/response logic.
* Database modules handle MongoDB connections and operations.

## Error Handling

Unexpected errors should be handled and should result in an appropriate HTTP status code and safe JSON response.

## Environment Variables

MongoDB connection information and other configuration values must be stored in environment variables.

Secrets must not be committed to the repository.

---

# 10. Implementation Plan

The following tasks will be completed in order.

## Task 1: Create the `books` collection and connect the app to MongoDB

### Description

* Use MongoDB database `cse341-books-db`.
* Create a MongoDB collection named `books`.
* Insert at least 3 seed book documents.
* Each book must contain:

  * `id`
  * `author`
  * `title`
  * `publicationDate`
* Use the MongoDB Node.js driver.
* Configure the MongoDB connection using environment variables.
* Ensure the application connects to MongoDB before it begins listening for requests.

### Test Plan

* [ ] The `cse341-books-db` database exists.
* [ ] The `books` collection exists.
* [ ] The collection contains at least 3 documents.
* [ ] Each document contains `id`, `author`, `title`, and `publicationDate`.
* [ ] The local application connects to MongoDB without errors.
* [ ] MongoDB connection values are stored in environment variables.
* [ ] No database credentials or secrets are committed to Git.

---

## Task 2: Implement a route to retrieve all books

### Description

* Create the `GET /books` route.
* Query all documents from the `books` collection.
* Return the books as a JSON array.
* Return HTTP `200` on success.
* Return HTTP `500` with a safe JSON message if an unexpected error occurs.

### Success Response

```json
[
  {
    "id": "b1",
    "author": "Maya Rivera",
    "title": "Patterns of Light",
    "publicationDate": "2021-08-17"
  }
]
```

### Error Response

```json
{
  "message": "Internal server error"
}
```

### Test Plan

* [ ] `GET /books` returns an array in JSON format.
* [ ] The response status is `200` on success.
* [ ] Each returned book contains `id`, `author`, `title`, and `publicationDate`.
* [ ] The response uses `application/json`.
* [ ] Unexpected failures return `{ "message": "Internal server error" }`.
* [ ] Unexpected failures return status `500`.

---

## Task 3: Implement a route to retrieve one book by ID

### Description

* Create the `GET /books/:id` route.
* Read the book ID from the URL.
* Find one book document using the `id` field.
* Return a JSON object when the book is found.
* Return HTTP `200` on success.
* Return HTTP `404` when the book does not exist.
* Return HTTP `500` with a safe JSON message if an unexpected error occurs.

### Success Response

```json
{
  "id": "b1",
  "author": "Maya Rivera",
  "title": "Patterns of Light",
  "publicationDate": "2021-08-17"
}
```

### Not Found Response

```json
{
  "message": "Book not found"
}
```

### Error Response

```json
{
  "message": "Internal server error"
}
```

### Test Plan

* [ ] An existing ID returns one book object in JSON.
* [ ] The returned book contains `id`, `author`, `title`, and `publicationDate`.
* [ ] An existing book returns status `200`.
* [ ] A missing ID returns `{ "message": "Book not found" }`.
* [ ] A missing ID returns status `404`.
* [ ] The response uses `application/json`.
* [ ] Unexpected failures return `{ "message": "Internal server error" }`.
* [ ] Unexpected failures return status `500`.

---

## Task 4: Deploy and test the application

### Description

* Deploy the latest version of the application to Render.
* Configure production environment variables in Render.
* Ensure the deployed application can connect to MongoDB.
* Test `GET /books` against the deployed URL.
* Test `GET /books/:id` against the deployed URL.
* Test the not-found response using a non-existent book ID.
* Confirm the deployed API returns the expected JSON responses.
* Record the final deployed URL in the README or a GitHub issue comment.

### Test Plan

* [ ] The application is successfully deployed to Render.
* [ ] Production MongoDB environment variables are configured.
* [ ] Deployed `GET /books` returns an array with status `200`.
* [ ] Deployed `GET /books/:id` returns an existing book with status `200`.
* [ ] Deployed `GET /books/:id` returns status `404` for a missing book.
* [ ] The not-found response is `{ "message": "Book not found" }`.
* [ ] Unexpected server errors return a safe JSON message.
* [ ] The final deployed URL is recorded in the README or a GitHub issue comment.

---

# 11. Development Order

The tasks should be completed in the following order:

```text
1. MongoDB setup and books collection
          ↓
2. GET /books
          ↓
3. GET /books/:id
          ↓
4. Deploy and test
```

The order is important because the API endpoints depend on the MongoDB connection and the `books` collection.

The `GET /books` endpoint should be implemented first because it is simpler and verifies that the application can successfully retrieve data from MongoDB. The `GET /books/:id` endpoint can then build on the same database connection and retrieval logic.

---

# 12. Definition of Done

The initial Books API is complete when:

* [ ] MongoDB database `cse341-books-db` is configured.
* [ ] The `books` collection contains at least 3 books.
* [ ] `GET /books` retrieves all books.
* [ ] `GET /books/:id` retrieves a single book.
* [ ] A missing book returns `404 Not Found`.
* [ ] Unexpected errors return `500 Internal Server Error`.
* [ ] Responses are returned as JSON.
* [ ] MongoDB credentials are stored securely in environment variables.
* [ ] The project follows CSE 341 coding standards.
* [ ] The application is deployed to Render.
* [ ] Both endpoints have been tested on the deployed application.
* [ ] The deployed URL is documented in the README.

---

# 13. Future Improvements

The initial version is intentionally limited to retrieving books.

Future versions could expand the application into a virtual library or online book shop with features such as:

* Create new books.
* Update existing books.
* Delete books.
* Search and filter books.
* User accounts.
* Authentication and authorization.
* Borrow and return books.
* Track borrowing history.
* Shopping cart functionality.
* Book purchasing.
* Inventory management.
* Book reviews and ratings.
