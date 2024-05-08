import express from 'express';

const router = express.Router();

import { sendEmail, grantAccess } from '../controllers/emailController.js';


// Define a route to send an email
router.post('/send-email', sendEmail);

// Define a route to handle access based on a token
router.get('/access', grantAccess);

export default router;
