import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public or protected? You can decide:
router.get('/', getProducts); // maybe public
router.get('/:id', getProductById); // maybe public

// Protected routes
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;
