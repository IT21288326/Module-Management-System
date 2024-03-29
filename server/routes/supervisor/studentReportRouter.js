import express from 'express';
const router = express.Router();
import * as groupRegistrationController from '../../controllers/supervisor/Student.js';

// Route to get a single group registration by ID
router.get('/groupRegistrations/:groupID', groupRegistrationController.getGroupRegistrationById);

export default router;


