import express from 'express';
import {
    createPresentationPannel,
    updatePresentationPannel,
    deletePresentationPannel,
    getPresentationPannel,
    getPresentationPannels,
    checkPanelIDExists,
} from '../../controllers/project-member/presentationPannelController.js';

const router = express.Router();

// CREATE
router.post("/", createPresentationPannel);

// GET single row
router.get("/:id", getPresentationPannel);

// GET all
router.get("/", getPresentationPannels);

// UPDATE
router.put("/update/:id", updatePresentationPannel);

// DELETE
router.delete("/:id", deletePresentationPannel);

// Define route to check panel ID existence
router.get('/panel/:panelID', checkPanelIDExists);

export default router;

