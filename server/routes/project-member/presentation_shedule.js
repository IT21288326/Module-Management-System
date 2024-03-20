import express from 'express';
import createPresentationShedule from '../../controllers/project-member/presentation_shedule.js';

const router = express.Router();

// CREATE
router.post("/", createPresentationShedule);

export default router;
