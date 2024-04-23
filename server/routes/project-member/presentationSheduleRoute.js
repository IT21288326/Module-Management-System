import express from 'express';
import {
    createPresentationShedule,
    updatePresentationShedule,
    deletePresentationShedule,
    getPresentationShedule,
    getPresentationShedules,
    checkGroupNoExists,
    deleteAllPresentations
} from '../../controllers/project-member/presentationSheduleController.js';
// import PresentationShedule from '../../models/project-member/presentationSheduleModel.js';

const router = express.Router();

// CREATE
router.post("/", createPresentationShedule);

//GET single row
router.get("/:id", getPresentationShedule);

//GET all
router.get("/", getPresentationShedules);

//UPDATE
router.put("/update/:id", updatePresentationShedule);

//DELETE
router.delete("/:id", deletePresentationShedule);

//DELETE ALL
router.delete("/", deleteAllPresentations);

//Check group no already have the record
router.get("/groupNoexist/:groupNo", checkGroupNoExists);



export default router;
