# CSE 341 Week 02 Specification — Version 2

# Feature 1: Book CRUD Operations

## Goal

Update the existing Week 01 Books API so that:

* Books support complete CRUD operations.
* Books can have one or more authors.
* Authors can be associated with multiple books.
* Every book route is documented and testable in Swagger.
* The existing Week 01 GET routes continue to work.
* The API validates all book and author references.
* The API works locally and on the deployed Render application.

## Data Model

Book documents will be stored in the `books` collection.

Required book fields:

* `id`: string, required, unique custom ID such as `b1`
* `title`: string, required
* `publicationDate`: string, required, formatted as `YYYY-MM-DD`

Example:

```json
{
  "id": "b1",
  "title": "Example Book",
  "publicationDate": "2026-01-15"
}
```

Books will continue to use custom string IDs instead of MongoDB `_id` values for API route parameters.

The relationship between books and authors will be stored separately in the `bookAuthors` collection.

---

## Feature 1 Relationship to Authors

A book may have one or more authors.

An author may be associated with multiple books.

This creates a many-to-many relationship:

```text
Author 1 ────────┐
                 │
Author 2 ────────┼── Book 1
                 │
Author 3 ────────┘

Author 1 ─────────── Book 2
```

The `books` collection will not contain an `authorId` or `authorIds` field.

The `authors` collection will not contain an array of book IDs.

Instead, the relationship will be stored in the `bookAuthors` collection.

---

## BookAuthors Data Model

The `bookAuthors` collection will contain one document for every book-author relationship.

Example:

```json
{
  "bookId": "b1",
  "authorId": "a1"
}
```

For a book with two authors:

```json
{
  "bookId": "b1",
  "authorId": "a1"
}
```

```json
{
  "bookId": "b1",
  "authorId": "a2"
}
```

Both `bookId` and `authorId` must reference existing custom IDs.

The combination of `bookId` and `authorId` must be unique so that the same author cannot be associated with the same book more than once.

---

# Routes

## GET /books

Purpose: Return all books.

Success:

* Status code: `200`
* Response body: an array of book objects.

The response may include the authors associated with each book if the implementation chooses to provide expanded relationship information.

Errors:

* `500` if an unexpected server or database error occurs.

This route already exists from Week 01 and must continue working.

---

## GET /books/

Purpose: Return one book by its custom ID.

Success:

* Status code: `200`
* Response body: the matching book object.

The API may include the authors associated with the book.

Errors:

* `404` if no book exists with that ID.
* `500` if an unexpected server or database error occurs.

This route already exists from Week 01 and must continue working.

---

## POST /books

Purpose: Create a new book and associate it with one or more existing authors.

Request body:

```json
{
  "id": "b4",
  "title": "Example Book Title",
  "publicationDate": "2026-01-15",
  "authorIds": ["a1", "a2"]
}
```

Required fields:

* `id`
* `title`
* `publicationDate`
* `authorIds`

`authorIds` must contain at least one author ID.

Validation:

* All required fields must be present.
* `id` must be unique.
* `authorIds` must contain valid string IDs.
* Every ID in `authorIds` must match an existing author.
* Duplicate author IDs within the same request must be rejected.

Success:

* Status code: `201`
* Response body: the newly created book.

Errors:

* `400` if a required field is missing.
* `400` if `authorIds` is missing or empty.
* `400` if the book ID already exists.
* `400` if one or more referenced authors do not exist.
* `400` if duplicate author IDs are supplied.
* `500` if an unexpected server or database error occurs.

Example invalid-author response:

```json
{
  "message": "One or more authors were not found"
}
```

---

## PUT /books/

Purpose: Update an existing book and its author relationships.

Request body:

```json
{
  "title": "Updated Book Title",
  "publicationDate": "2026-02-20",
  "authorIds": ["a2", "a3"]
}
```

The book `id` comes from the URL and cannot be changed through the request body.

Validation:

* The book must exist.
* All required fields must be present.
* `authorIds` must contain at least one author.
* Every author ID must reference an existing author.
* Duplicate author IDs must be rejected.

The update must replace the book's existing author relationships with the submitted `authorIds`.

Success:

* Status code: `200`
* Response body: the updated book.

Errors:

* `400` if a required field is missing.
* `400` if `authorIds` is empty or invalid.
* `400` if one or more authors do not exist.
* `404` if the book does not exist.
* `500` if an unexpected server or database error occurs.

---

## DELETE /books/

Purpose: Delete an existing book.

When a book is deleted, all corresponding documents in the `bookAuthors` collection must also be deleted.

Success:

* Status code: `204`
* Response body: none.

Errors:

* `404` if no book exists with that ID.
* `500` if an unexpected server or database error occurs.

---

## Book Data Integrity

The implementation must:

* Use custom string IDs.
* Prevent duplicate book IDs.
* Prevent clients from changing the book ID.
* Validate every referenced author before creating or updating relationships.
* Prevent duplicate book-author relationships.
* Remove a book's relationship records when the book is deleted.
* Never expose raw MongoDB errors to clients.
* Only update explicitly permitted fields.

---

# Feature 2: Author CRUD Operations

## Goal

Add an `authors` collection and implement complete CRUD operations for authors.

Authors will be related to books through the `bookAuthors` junction collection.

Every author route must be documented and testable in Swagger.

---

## Author Data Model

Author documents will be stored in the `authors` collection.

Required fields:

* `id`: string, required, unique custom ID such as `a1`
* `name`: string, required
* `birthDate`: string, required, formatted as `YYYY-MM-DD`
* `nationality`: string, required

Example:

```json
{
  "id": "a1",
  "name": "Example Author",
  "birthDate": "1980-05-12",
  "nationality": "Congolese"
}
```

Authors will use custom string IDs rather than MongoDB `_id` values for API route parameters.

The author document will not contain a list of books.

Book relationships are stored in `bookAuthors`.

---

## Relationship to Books

An author may be associated with multiple books.

A book may have multiple authors.

The relationship is therefore many-to-many.

For example:

```text
authors
a1 → Author One
a2 → Author Two

books
b1 → Book One

bookAuthors
b1 + a1
b1 + a2
```

The `bookAuthors` collection is responsible for connecting the two entities.

---

# Author Routes

## GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects.

Errors:

* `500` with:

```json
{
  "message": "Internal server error"
}
```

---

## GET /authors/

Purpose: Return one author by custom ID.

Success:

* Status code: `200`
* Response body: the matching author object.

The response may include the author's associated books if relationship information is requested by the implementation.

Errors:

* `404` if the author does not exist.
* `500` if an unexpected server or database error occurs.

Example:

```json
{
  "message": "Author not found"
}
```

---

## POST /authors

Purpose: Create a new author.

Request body:

```json
{
  "id": "a4",
  "name": "Example Author",
  "birthDate": "1985-04-20",
  "nationality": "Congolese"
}
```

Validation:

* All required fields must be present.
* `id` must be unique.
* `id` must be a string.
* `birthDate` must use `YYYY-MM-DD`.

Success:

* Status code: `201`
* Response body: the newly created author.

Errors:

* `400` if a required field is missing.
* `400` if the author ID already exists.
* `400` if the data format is invalid.
* `500` if an unexpected server or database error occurs.

---

## PUT /authors/

Purpose: Update an existing author.

Request body:

```json
{
  "name": "Updated Author",
  "birthDate": "1985-04-20",
  "nationality": "Congolese"
}
```

The author ID comes from the URL and cannot be changed.

Success:

* Status code: `200`
* Response body: the updated author.

Errors:

* `400` if a required field is missing.
* `400` if invalid data is submitted.
* `404` if the author does not exist.
* `500` if an unexpected server or database error occurs.

---

## DELETE /authors/

Purpose: Delete an author.

Before deleting the author, the API must check the `bookAuthors` collection for relationships involving that author.

The API must not delete an author if the author is still associated with any book.

The existence check should use a targeted query such as:

```js
findOne({ authorId: authorId })
```

rather than retrieving all matching relationships.

### Author has associated books

Return:

* Status code: `400`

Response:

```json
{
  "message": "Author cannot be deleted because books are associated with this author"
}
```

The author and its relationships must remain unchanged.

### Author has no associated books

If the author exists and has no book relationships:

* Delete the author.
* Return `204`.
* No response body.

### Author does not exist

Return:

* `404`

Example:

```json
{
  "message": "Author not found"
}
```

### Unexpected error

Return:

* `500`

Response:

```json
{
  "message": "Internal server error"
}
```

---

# Feature 3: BookAuthors Relationship Operations

The relationship collection does not necessarily require its own public CRUD routes for this assignment.

Book-author relationships should be managed as part of the book CRUD operations:

* `POST /books` creates the required relationships.
* `PUT /books/:id` replaces the existing relationships.
* `DELETE /books/:id` removes the book's relationships.
* `DELETE /authors/:id` checks the relationships before allowing deletion.

This keeps the public API simple while maintaining the many-to-many relationship.

---

# Data Integrity Rules

The following rules must always be enforced:

1. Every book must have at least one author.
2. Every `authorId` in `bookAuthors` must reference an existing author.
3. Every `bookId` in `bookAuthors` must reference an existing book.
4. A book-author pair cannot occur more than once.
5. A book cannot be deleted while leaving orphaned relationship records.
6. An author cannot be deleted while a book still references that author.
7. Custom `id` values must be unique within their respective collections.
8. MongoDB `_id` values are not used as API identifiers.

Where practical, the database should enforce uniqueness for:

* `books.id`
* `authors.id`
* the combination of `bookAuthors.bookId` and `bookAuthors.authorId`

---

# Security and Validation

The API must:

* Validate request bodies before database operations.
* Accept only explicitly permitted fields.
* Prevent clients from modifying custom IDs.
* Avoid directly passing unrestricted request bodies into MongoDB update operations.
* Prevent MongoDB operator injection through unsanitized update data.
* Store MongoDB credentials in environment variables.
* Avoid returning raw database errors to clients.
* Return consistent JSON error messages for `400`, `404`, and `500` responses.

---

# Efficiency

Database queries should be targeted.

Examples:

```js
findOne({ id: bookId })
```

```js
findOne({ id: authorId })
```

```js
findOne({ authorId: authorId })
```

For larger collections, indexes should be considered for:

* `books.id`
* `authors.id`
* `bookAuthors.bookId`
* `bookAuthors.authorId`

A compound unique index on `bookAuthors` should prevent duplicate relationships:

```text
bookId + authorId
```

---

# Swagger Documentation

Swagger must document every public book and author route.

### Books

* `GET /books`
* `GET /books/{id}`
* `POST /books`
* `PUT /books/{id}`
* `DELETE /books/{id}`

### Authors

* `GET /authors`
* `GET /authors/{id}`
* `POST /authors`
* `PUT /authors/{id}`
* `DELETE /authors/{id}`

Swagger documentation must include:

* Path parameters.
* Required request bodies.
* Request examples.
* Successful response codes.
* Error response codes.
* Example JSON responses.
* The `authorIds` field for book creation/update.
* The many-to-many relationship behavior where relevant.

The Swagger UI must allow every public route to be tested directly from `/api-docs`.

---

# Deployment Expectations

After implementation:

* All existing Week 01 GET book routes must continue working.
* All book CRUD operations must work locally.
* All author CRUD operations must work locally.
* Book-author relationships must be correctly created, updated, and deleted.
* Author deletion must be blocked when relationships exist.
* Swagger must display all book and author routes.
* All routes must work on the deployed Render application.
* The deployed `/api-docs` page must allow testing of all public operations.
