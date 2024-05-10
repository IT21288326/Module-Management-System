import express from 'express';
import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';

const router = express.Router();

// Fetch marking areas based on the marking rubric type
router.get('/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const rubric = await MarkingRubrics.findOne({ type });

        if (rubric) {
            const markingAreas = rubric.marking.map(area => ({
                markingArea: area.markingArea,
                marks: area.marks,
            }));
            res.json(markingAreas);
        } else {
            res.status(404).json({ message: 'Rubric not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching marking rubric', error });
    }
});

export default router;
