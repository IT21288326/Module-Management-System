// import express from "express";
// import GrpRegistrationModel from "../../models/student/GrpRegistration.js";
// //newly added
// //import GrpRegistrationcontr from "../..";


// const router = express.Router();

// //CREATE
// router.post("/", async (req,res)=>{
//     const newRegistration = new GrpRegistrationModel(req.body)

//     try{
//         const savedRegistration = await newRegistration.save()
//         res.status(200).json(savedRegistration)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

// // router.get("/", (req,res)=>{
// //     res.send("This is Rergistration page")
// // })




// // Read All
// export const getGroupRegistrations = async (req, res) => {
//     try {
//         const groupRegistrations = await GrpRegistrationModel.find();
//         res.json(groupRegistrations);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// };

// // Read by ID
// export const getGroupRegistrationById = async (req, res) => {
//     try {
//         const groupRegistration = await GrpRegistrationModel.findById(req.params.id);
//         if (groupRegistration == null) {
//             return res.status(404).json({ message: 'Cannot find group registration' });
//         }
//         res.json(groupRegistration);
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }
// };

// // Update
// export const updateGroupRegistration = async (req, res) => {
//     try {
//         const updatedGroupRegistration = await GrpRegistrationModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(updatedGroupRegistration);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Delete
// export const deleteGroupRegistration = async (req, res) => {
//     try {
//         const deletedGroupRegistration = await GrpRegistrationModel.findByIdAndRemove(req.params.id);
//         res.json({ message: 'Group registration deleted', deletedGroupRegistration });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// export default router













import express from 'express';
import  GrpRegistrationModel  from '../../models/student/GrpRegistration.js';

const router = express.Router();

// Create a new group registration
router.post('/', async (req, res) => {
    const newRegistration = new GrpRegistrationModel(req.body);

    try {
        const savedRegistration = await newRegistration.save();
        res.status(200).json(savedRegistration); // Respond with the created registration object
    } catch (err) {
        res.status(500).json({ message: err.message }); // Handle errors appropriately
    }
});

// Get all group registrations
router.get('/', async (req, res) => {
    try {
        const groupRegistrations = await GrpRegistrationModel.find();
        res.json(groupRegistrations);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Get a group registration by ID
router.get('/:id', async (req, res) => {
    try {
        const groupRegistration = await GrpRegistrationModel.findById(req.params.id);
        if (!groupRegistration) {
            return res.status(404).json({ message: 'Cannot find group registration' });
        }
        res.json(groupRegistration);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Update a group registration
router.put('/:id', async (req, res) => {
    try {
        const updatedGroupRegistration = await GrpRegistrationModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );
        if (!updatedGroupRegistration) {
            return res.status(404).json({ message: 'Cannot find group registration to update' });
        }
        res.json(updatedGroupRegistration);
    } catch (err) {
        res.status(400).json({ message: err.message }); // Handle validation errors appropriately
    }
});

// Delete a group registration
router.delete('/:id', async (req, res) => {
    try {
        const deletedGroupRegistration = await GrpRegistrationModel.findByIdAndRemove(req.params.id);
        if (!deletedGroupRegistration) {
            return res.status(404).json({ message: 'Cannot find group registration to delete' });
        }
        res.json({ message: 'Group registration deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;



