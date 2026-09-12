# Books API Week 02 Spec - Version 1

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.


## Feature 2: Author CRUD Operations

TODO: Follow the example above to complete a spec for the authors feature.


# Feature 2: Author CRUD Operations

### Goal

Add an `authors` collection to the existing Books API and support full CRUD operations for authors.

Each author may have one or many books. Each book belongs to exactly one author through the `authorId` field stored in the book document.

Authors will use custom string IDs such as `a1`, following the same approach used for books in Week 01.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

* `id`: string, required, custom id such as `a1`
* `name`: string, required
* `birthDate`: string, required
* `nationality`: string, required

Authors will continue to use custom string IDs instead of MongoDB `_id` values for route parameters.

### Relationship to Books

One author may have many books.

Each book belongs to one author and stores the author's custom ID in the `authorId` field.

For example:

Author:

```json
{
  "id": "a1",
  "name": "George Orwell",
  "birthDate": "1903-06-25",
  "nationality": "British"
}
```

Books associated with the author:

```json
{
  "id": "b1",
  "authorId": "a1",
  "title": "1984",
  "publicationDate": "1949-06-08"
}
```

```json
{
  "id": "b2",
  "authorId": "a1",
  "title": "Animal Farm",
  "publicationDate": "1945-08-17"
}
```

The author document will not store an array of book IDs.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

* Status code: `200`
* Response body: an array of author objects

Errors:

* `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom ID.

Success:

* Status code: `200`
* Response body: the matching author object

Errors:

* `404` if no author exists with that ID
* `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

```json
{
  "id": "a1",
  "name": "George Orwell",
  "birthDate": "1903-06-25",
  "nationality": "British"
}
```

Success:

* Status code: `201`
* Response body: the newly created author object

Errors:

* `400` if a required field is missing
* `400` if the `id` already exists
* `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author.

Request body:

```json
{
  "name": "George Orwell",
  "birthDate": "1903-06-25",
  "nationality": "British"
}
```

Success:

* Status code: `200`
* Response body: the updated author object

Errors:

* `400` if a required field is missing
* `404` if no author exists with that ID
* `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

An author can only be deleted if no books currently reference the author's ID.

Success:

* Status code: `204`
* Response body: none

Errors:

* `400` if books are still associated with the author
* `404` if no author exists with that ID
* `500` if an unexpected server or database error occurs

When an author cannot be deleted because books are associated with the author, the response will be:

```json
{
  "message": "Author cannot be deleted because books are associated with this author"
}
```

### Swagger Documentation

Swagger must document every author route.

The Swagger documentation must describe:

* Author request bodies
* Author response bodies
* Required fields
* Path parameters
* Success status codes
* Error status codes
* The restriction on deleting an author who has associated books

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application.

The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

### CRUD Operations

The author model will use the following MongoDB operations:

* `insertOne()` for creating an author
* `find()` for retrieving all authors
* `findOne()` for retrieving one author
* `updateOne()` for updating an author
* `deleteOne()` for deleting an author

The API will use the author's custom `id` field when identifying authors in route parameters.