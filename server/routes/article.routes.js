import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createArticle, updateArticle, deleteArticle, getArticles } from '../controllers/article.controller.js';

const router = express.Router();

router.get('/', authMiddleware, getArticles);
router.post('/', authMiddleware, createArticle);
router.put('/:id', authMiddleware, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;
