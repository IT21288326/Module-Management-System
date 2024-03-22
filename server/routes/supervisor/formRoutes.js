// routes/formRoutes.js

import express from 'express';
import { submitFormData, getReports } from '../../controllers/supervisor/reportController.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-form', submitFormData);
router.get('/reports', getReports);

export default router;
