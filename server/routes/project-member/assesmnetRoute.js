import express from 'express';
import { 
    createAssessment, 
    getAssessments, 
    getAssessment, 
    updateAssessment, 
    deleteAssessment,
    getReportAssessmentTitles,
    getPresentationAssessmentTitles,
    getAssessmentTypeAndWeightage
} from '../../controllers/project-member/assementController.js';

const router = express.Router();

// Create
router.post('/', createAssessment);

// get all
router.get('/', getAssessments);

// get by id
router.get('/:id', getAssessment);

// get titles of assessments of type 'report'
router.get('/titles/report', getReportAssessmentTitles);

// get titles of assessments of type 'presentation'
router.get('/titles/presentation', getPresentationAssessmentTitles);

router.get('/assessments/type-weightage', getAssessmentTypeAndWeightage);

// Update
router.put('/:id', updateAssessment);

// Delete
router.delete('/:id', deleteAssessment);

export default router;
