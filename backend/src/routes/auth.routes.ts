import express from 'express';
import {
  signup,
  login,
  logout,
  getCurrentUser
} from '../controllers/auth.controller';
import {
  signupValidation,
  loginValidation,
  validate
} from '../middleware/validation.middleware';
import { authenticateToken } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/me', authenticateToken, getCurrentUser);

export default router;

