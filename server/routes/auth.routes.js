import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register); // For testing; remove or protect later

export default router;
