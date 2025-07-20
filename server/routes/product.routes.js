import express from 'express';
import {
getProducts,
getProductById,
createProduct,
updateProduct,
deleteProduct
} from '../controllers/product.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { uploader } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, uploader('products').single('image'), createProduct);
router.put('/:id', authMiddleware, uploader('products').single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

export default router;