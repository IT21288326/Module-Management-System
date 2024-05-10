// import express from 'express';
// import {  getRubricsTypes ,getGroupByRegistrationNo, createMarking, getMarkings, getMarkingById,updateMarking } from '../../controllers/supervisor/markingController.js';
// import MarkingRubrics from '../../models/project-member/markingRubricsModel.js';

// const router = express.Router();

// router.get('/rubrics', getRubricsTypes);
// router.get('/groups', getGroupByRegistrationNo);


// router.post('/marks', createMarking);
// router.get('/marks/get', getMarkings);
// router.get('/marks/get/:id', getMarkingById);
// router.put('/marks/updated/:id', updateMarking);



// // Endpoint to fetch marking rubrics types
// router.get('/rubric-types', async (req, res) => {
//     try {
//         // Fetch distinct rubric types from the database
//         const rubricTypes = await MarkingRubrics.distinct('type');
        
//         // Respond with the list of types
//         res.status(200).json(rubricTypes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // // Route to get marking data for a specific group registration number
// // // Route to get marking data for a specific group registration number


// export default router;
// // import express from 'express';
// // import markingController from '../../controllers/supervisor/markingController.js';

// // const router = express.Router();

// // // Define routes
// // router.get('/rubrics', markingController.getRubrics);
// // //router.get('/groups', markingController.getGroups);
// // router.get('/groups/:groupId/students', markingController.getStudentsInGroup);
// // router.post('/submit', markingController.submitMarks);
// // // Add new route to fetch all groups
// // router.get('/groups', markingController.getAllGroups);

// // export default router;
