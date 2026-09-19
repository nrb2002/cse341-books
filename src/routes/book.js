import express from "express";

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
<<<<<<< HEAD
} from '../controllers/books.js';
=======
} from "../controllers/books.js";
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

const router = express.Router();

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
 *     responses:
 *       200:
 *         description: Books returned successfully
 *       500:
 *         description: Internal server error
 */
router.get("/books", getBooksHandler);

/**
 * @openapi
 * /books/{id}:
 *   get:
 *     summary: Get one book by id
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get("/books/:id", getBookByIdHandler);

/**
 * @openapi
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - title
 *               - publicationDate
 *               - authorIds
 *             properties:
 *               id:
 *                 type: string
<<<<<<< HEAD
 *                 example: b2
 *               title:
 *                 type: string
 *                 example: Example Book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-15
 *               authorIds:
 *                 type: array
 *                 minItems: 1
 *                 uniqueItems: true
=======
 *                 example: b4
 *               title:
 *                 type: string
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: 1949-06-08
 *               authorIds:
 *                 type: array
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
<<<<<<< HEAD
 *                   - a2
=======
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
<<<<<<< HEAD
 *         description: Invalid book data, duplicate ID, duplicate authors, or author not found
 *       500:
 *         description: Internal server error
 */
router.post('/books', createBookHandler);
=======
 *         description: Invalid data, book ID already exists, or one or more authors do not exist
 *       500:
 *         description: Internal server error
 */
router.post("/books", createBookHandler);
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

/**
 * @openapi
 * /books/{id}:
 *   put:
<<<<<<< HEAD
 *     summary: Update an existing book
=======
 *     summary: Update a book
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *           example: b1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - publicationDate
 *               - authorIds
 *             properties:
 *               title:
 *                 type: string
<<<<<<< HEAD
 *                 example: Updated Book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-20
 *               authorIds:
 *                 type: array
 *                 minItems: 1
 *                 uniqueItems: true
=======
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: 1949-06-08
 *               authorIds:
 *                 type: array
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
<<<<<<< HEAD
 *                   - a3
=======
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
<<<<<<< HEAD
 *         description: Invalid book data, duplicate authors, or author not found
=======
 *         description: Invalid book data
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
<<<<<<< HEAD
router.put('/books/:id', updateBookHandler);
=======
router.put("/books/:id", updateBookHandler);
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344

/**
 * @openapi
 * /books/{id}:
 *   delete:
<<<<<<< HEAD
 *     summary: Delete a book
=======
 *     summary: Delete a book by id
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
 *     tags:
 *       - Books
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the book
 *         schema:
 *           type: string
 *           example: b1
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
<<<<<<< HEAD
router.delete('/books/:id', deleteBookHandler);

export default router;
=======
router.delete("/books/:id", deleteBookHandler);

export default router;
>>>>>>> 9938e76bdfd78d022b3346951089a86d7511f344
