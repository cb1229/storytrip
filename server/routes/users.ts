import { Router } from 'express';
import * as userController from '../controllers/userController';

export const userRoutes = Router();

// POST /api/users/register - Register a new user
userRoutes.post('/register', userController.register);

// POST /api/users/login - Login
userRoutes.post('/login', userController.login);

// GET /api/users/:id - Get user profile
userRoutes.get('/:id', userController.getUserById);

// PUT /api/users/:id - Update user profile
userRoutes.put('/:id', userController.updateUser);
