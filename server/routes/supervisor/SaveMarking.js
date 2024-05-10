import express from 'express';
import Marking from '../../models/supervisor/Marking.js';
import GroupRegistration from '../../models/student/GrpRegistration.js';
import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';


const router = express.Router();

// Save the marking data for each member
router.post('/submit', async (req, res) => {
    console.log('Received POST request to /submit');
    console.log('Request Body:', req.body);
    try {
        const { groupRegistrationNo, markingType, markingAreas } = req.body;

        // Create a new marking document
        const newMarking = new Marking({
            groupRegistrationNo,
            markingType,
            markingAreas,
        });

        // Save the marking document to the database
        await newMarking.save();
        res.json({ message: 'Marking data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving marking data', error });
    }
});

// Retrieve all marking records
router.get('/retrieve', async (req, res) => {
    try {
        // Fetch all marking records from the database
        const markings = await Marking.find().lean();

        // Respond with the retrieved records
        res.json(markings);
    } catch (error) {
        console.error('Error retrieving marking data:', error);
        res.status(500).json({ message: 'Error retrieving marking data', error });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { markingAreas } = req.body;

        // Find the marking record by ID and update the student marks and co-supervisor marks
        const marking = await Marking.findById(id);

        if (!marking) {
            return res.status(404).json({ message: 'Marking record not found' });
        }

        // Update markingAreas with the new data from the request body
        marking.markingAreas = markingAreas;

        // Save the updated marking record
        await marking.save();

        res.json({ message: 'Marking data updated successfully', marking });
    } catch (error) {
        console.error('Error updating marking data:', error);
        res.status(500).json({ message: 'Error updating marking data', error });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMarking = await Marking.findByIdAndDelete(id);

        if (!deletedMarking) {
            return res.status(404).json({ message: 'Marking record not found' });
        }

        res.json({ message: 'Marking record deleted successfully' });
    } catch (error) {
        console.error('Error deleting marking record:', error);
        res.status(500).json({ message: 'Error deleting marking record' });
    }
});

// Endpoint to get all group registration numbers
router.get('/groups', async (req, res) => {
    try {
        const groups = await GroupRegistration.find({}, 'GroupRegistrationNo').exec();
        res.json(groups);
    } catch (error) {
        console.error('Error retrieving groups:', error);
        res.status(500).json({ error: 'Error retrieving groups' });
    }
});

// Endpoint to get all marking types
router.get('/marking-types', async (req, res) => {
    try {
        const markingTypes = await MarkingRubrics.find({}, 'type').exec();
        res.json(markingTypes);
    } catch (error) {
        console.error('Error retrieving marking types:', error);
        res.status(500).json({ error: 'Error retrieving marking types' });
    }
});

export default router;
