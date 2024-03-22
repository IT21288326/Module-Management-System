import express from 'express';

const router = express.Router();
import * as userController from '../controllers/userController.js';


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

export default router;

