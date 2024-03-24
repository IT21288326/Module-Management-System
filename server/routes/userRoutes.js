import express from 'express';

const router = express.Router();
import {createUser, getAllUsers,getUserById,updateUserById,deleteUserById,getProjectMembers }  from '../controllers/userController.js';


// Route to create a new user
router.post('/users', createUser);

// Route to retrieve all users
router.get('/users', getAllUsers);

// Route to retrieve a single user by ID
router.get('/users/:id', getUserById);

// Route to update a user by ID
router.put('/users/:id', updateUserById);

// Route to delete a user by ID
router.delete('/users/:id', deleteUserById);



// Route to for retrieving project members
router.get('/projectMembers', getProjectMembers);

export default router;

