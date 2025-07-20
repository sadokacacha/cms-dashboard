import express from 'express';
import {
getArticles,
createArticle,
updateArticle,
deleteArticle
} from '../controllers/article.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { uploader } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getArticles);
router.post('/', authMiddleware, uploader('articles').single('image'), createArticle);
router.put('/:id', authMiddleware, uploader('articles').single('image'), updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;

