import express from 'express';

import {
  getAuthorsHandler,
  getAuthorByIdHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler,
} from '../controllers/authors.js';

const router = express.Router();

/**
 * @openapi
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Authors returned successfully
 *       500:
 *         description: Internal server error
 */
router.get('/authors', getAuthorsHandler);

/**
 * @openapi
 * /authors/{id}:
 *   get:
 *     summary: Get one author by id
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author
 *         schema:
 *           type: string
 *           example: a1
 *     responses:
 *       200:
 *         description: Author returned successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.get('/authors/:id', getAuthorByIdHandler);

/**
 * @openapi
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthDate
 *               - nationality
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Example Author
 *               birthDate:
 *                 type: string
 *                 example: 1985-04-20
 *               nationality:
 *                 type: string
 *                 example: Congolese
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid data or author ID already exists
 *       500:
 *         description: Internal server error
 */
router.post('/authors', createAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author
 *         schema:
 *           type: string
 *           example: a1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthDate
 *               - nationality
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Author
 *               birthDate:
 *                 type: string
 *                 example: 1985-04-20
 *               nationality:
 *                 type: string
 *                 example: Congolese
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.put('/authors/:id', updateAuthorHandler);

/**
 * @openapi
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the author
 *         schema:
 *           type: string
 *           example: a1
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       400:
 *         description: Author cannot be deleted because books are associated with this author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal server error
 */
router.delete('/authors/:id', deleteAuthorHandler);

export default router;
