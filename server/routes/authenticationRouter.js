import express from 'express';
import { login } from '../controllers/authenticationControlle.js';

const router = express.Router();

// POST /api/login - User login
router.post('/auth', login);

export default router;