// src/routes/user.routes.js
import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';

const router = Router();

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a single user by ID
router.get('/:id', userController.getUserById);

// GET posts by a specific user
router.get('/:userId/posts', userController.getPostsByUser);

export default router;
