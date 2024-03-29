// routes/formRoutes.js

import express from 'express';
import { submitFormData, getReports } from '../../controllers/supervisor/reportController.js';

const router = express.Router();

// Route to handle form submission
router.post('/submit-form', submitFormData);
router.get('/reports', getReports);
// router.get('/group/:reportIndex/:studentIndex', getGroupDetails);
// router.put('/reports/:reportIndex/:studentIndex', updateCoSupervisorMarks);
export default router;
