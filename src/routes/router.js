import express from 'express';

import bookRouter from './book.js';
import authorRouter from './author.js';

const router = express.Router();

router.use(bookRouter);
router.use(authorRouter);

export default router;
