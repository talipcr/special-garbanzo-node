// Required External Modules and Interfaces

import express from 'express';
import { signup, login, logout, reset } from '../controllers/auth.controller';

// Router Definition

export const authRouter = express.Router();

// Controller Definition

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/reset', reset);
