// import express from 'express';
// import {
//     createPresentationPannel,
//     updatePresentationPannel,
//     deletePresentationPannel,
//     getPresentationPannel,
//     getPresentationPannels,
//     retrievePannelIDs

    
// } from '../../controllers/project-member/presentationPannelController.js';
// // import PresentationPannel from '../../models/project-member/presentationPannelModel.js';

// const router = express.Router();

// // CREATE
// router.post("/", createPresentationPannel);

// //GET single row
// router.get("/:id", getPresentationPannel);

// //GET all
// router.get("/", getPresentationPannels);

// //GET paneel id
// router.get("/pannel", retrievePannelIDs);

// //UPDATE
// router.put("/update/:id", updatePresentationPannel);

// //DELETE
// router.delete("/:id", deletePresentationPannel);


// export default router;

// // //Get PannelID only


import express from 'express';
import {
    createPresentationPannel,
    updatePresentationPannel,
    deletePresentationPannel,
    getPresentationPannel,
    getPresentationPannels,
    // getExaminer1Values // Renamed to reflect the purpose of this route
} from '../../controllers/project-member/presentationPannelController.js';

const router = express.Router();

// CREATE
router.post("/", createPresentationPannel);

// GET single row
router.get("/:id", getPresentationPannel);

// GET all
router.get("/", getPresentationPannels);

// // GET all PresentationPannel IDs
// router.get("/pannelIDs",  getExaminer1Values);

// UPDATE
router.put("/update/:id", updatePresentationPannel);

// DELETE
router.delete("/:id", deletePresentationPannel);

export default router;
