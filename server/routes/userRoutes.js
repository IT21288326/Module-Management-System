import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';

// Route to create a new user
router.post('/users', userController.createUser);

// Route to retrieve all users
router.get('/users', userController.getAllUsers);

// Route to retrieve a single user by ID
router.get('/users/:id', userController.getUserById);

// Route to update a user by ID
router.put('/users/:id', userController.updateUserById);

// Route to delete a user by ID
router.delete('/users/:id', userController.deleteUserById);

export default router;

