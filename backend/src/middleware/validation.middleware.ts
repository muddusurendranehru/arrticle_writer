import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

// Middleware to check validation results
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  next();
};

// Validation rules for signup
export const signupValidation = [
  body('email')
    .custom((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if it's a valid Indian phone number (+91 followed by 10 digits)
      const phoneRegex = /^\+91[0-9]{10}$/;
      
      if (emailRegex.test(value) || phoneRegex.test(value)) {
        return true;
      }
      throw new Error('Please provide a valid email address or phone number (+91XXXXXXXXXX)');
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];

// Validation rules for login
export const loginValidation = [
  body('email')
    .custom((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Check if it's a valid Indian phone number (+91 followed by 10 digits)
      const phoneRegex = /^\+91[0-9]{10}$/;
      
      if (emailRegex.test(value) || phoneRegex.test(value)) {
        return true;
      }
      throw new Error('Please provide a valid email address or phone number (+91XXXXXXXXXX)');
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Validation rules for article drafts
export const articleDraftValidation = [
  body('title')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Title must not exceed 500 characters'),
  body('originalContent')
    .notEmpty()
    .withMessage('Original content is required')
    .isLength({ max: 50000 })
    .withMessage('Content must not exceed 50,000 characters')
];

