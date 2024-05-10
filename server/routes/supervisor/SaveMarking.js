import express from 'express';
import Marking from '../../models/supervisor/Marking.js';

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

export default router;
