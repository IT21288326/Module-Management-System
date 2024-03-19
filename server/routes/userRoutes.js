// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

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

module.exports = router;
