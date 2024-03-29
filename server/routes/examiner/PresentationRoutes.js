// routes/formRoutes.js

import express from 'express';
import { submitFormData, getPresentation} from '../../controllers/examiner/presentationController.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-form', submitFormData);
router.get('/getPresentation', getPresentation);

export default router;
