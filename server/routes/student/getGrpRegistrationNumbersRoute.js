import express from 'express';
import {getGroupRegNumbers} from '../../controllers/student/getGroupRegistrationNumbersController.js';

const router = express.Router();

router.get("/", getGroupRegNumbers);

export default router;
