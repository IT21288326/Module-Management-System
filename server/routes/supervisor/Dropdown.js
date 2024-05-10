import express from 'express';
import GroupRegistration from '../../models/student/GrpRegistration';
import MarkingRubrics from '../../models/project-member/markingRubricsModel';

const router = express.Router();

// Endpoint to fetch distinct group registration numbers and marking types
router.get('/get', async (req, res) => {
    try {
        // Fetch distinct group registration numbers from GroupRegistration model
        const groupNumbers = await GroupRegistration.distinct('GroupRegistrationNo');
        
        // Fetch distinct marking types from MarkingRubrics model
        const markingTypes = await MarkingRubrics.distinct('type');
        
        // Return the lists as a response
        res.json({ groupNumbers, markingTypes });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching distinct groups and marking types', error });
    }
});

export default router;
