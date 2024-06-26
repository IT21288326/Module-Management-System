import express from 'express';
import {
    createMarkingRubric,
    updateMarkingRubric,
    deleteMarkingRubric,
    getMarkingRubricById,
    getAllMarkingRubrics,
    getMarkingRubricByIdmarking,
    deleteAllMarkingRubrics,
    checkType,

} from '../../controllers/project-member/markingRubricsController.js';
// import PresentationShedule from '../../models/project-member/presentationSheduleModel.js';

const router = express.Router();

// CREATE
router.post("/", createMarkingRubric);

//GET single row
router.get("/:id", getMarkingRubricById);

//GET single row and display marking Arrays values only
router.get("/marking/:id", getMarkingRubricByIdmarking);

//GET all
router.get("/", getAllMarkingRubrics);

//UPDATE
router.put("/update/:id", updateMarkingRubric);

//DELETE
router.delete("/:id", deleteMarkingRubric);

//DELETE all
router.delete("/", deleteAllMarkingRubrics);

//Check if the Type already Exist
router.get("/checkType/:type", checkType);



export default router;
