import express from "express";

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from '../controllers/books.js';

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
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
 *                   - a2
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid book data, duplicate ID, duplicate authors, or author not found
 *       500:
 *         description: Internal server error
 */
router.post('/books', createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update an existing book
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
 *                 example: Updated Book
 *               publicationDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-20
 *               authorIds:
 *                 type: array
 *                 minItems: 1
 *                 uniqueItems: true
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
 *                   - a3
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book data, duplicate authors, or author not found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put('/books/:id', updateBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by id
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
router.delete('/books/:id', deleteBookHandler);

export default router;
