/**
 * Login Validator
 * 
 * Validation rules for login endpoints.
 */

import { body } from 'express-validator';

/**
 * Validation rules for login request
 */
export const loginValidation = [
    /**
     * Email validation
     * - Must be a valid email format
     * - Will be normalized to lowercase
     */
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail()
        .isLength({ max: 254 })
        .withMessage('Email must be 254 characters or less'),
];

/**
 * Validation rules for login or create request
 * (Same as login since we create user if not exists)
 */
export const loginOrCreateValidation = loginValidation;
