import express from 'express';
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById } from '../controllers/userController.js';

const router = express.Router();

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
