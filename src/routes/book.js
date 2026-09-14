import express from "express";

import {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler,
} from "../controllers/books.js";

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
 *                 example: b4
 *               title:
 *                 type: string
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: 1949-06-08
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid data, book ID already exists, or one or more authors do not exist
 *       500:
 *         description: Internal server error
 */
router.post("/books", createBookHandler);

/**
 * @openapi
 * /books/{id}:
 *   put:
 *     summary: Update a book
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
 *                 example: 1984
 *               publicationDate:
 *                 type: string
 *                 example: 1949-06-08
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - a1
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid book data
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.put("/books/:id", updateBookHandler);

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
router.delete("/books/:id", deleteBookHandler);

export default router;
