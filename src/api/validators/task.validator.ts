/**
 * Task Validator
 * 
 * Validation rules for task endpoints.
 */

import { body, param } from 'express-validator';

/**
 * Validation rules for creating a task
 */
export const createTaskValidation = [
    /**
     * Title validation
     * - Required
     * - Must be 1-200 characters
     */
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    
    /**
     * Description validation
     * - Optional
     * - Must be 0-2000 characters
     */
    body('description')
        .trim()
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Description must be 2000 characters or less'),
];

/**
 * Validation rules for updating a task
 */
export const updateTaskValidation = [
    /**
     * Task ID parameter validation
     */
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID()
        .withMessage('Task ID must be a valid UUID'),
    
    /**
     * Title validation (optional for updates)
     * - If provided, must be 1-200 characters
     */
    body('title')
        .trim()
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    
    /**
     * Description validation (optional for updates)
     * - If provided, must be 0-2000 characters
     */
    body('description')
        .trim()
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Description must be 2000 characters or less'),
    
    /**
     * Completed status validation (optional for updates)
     */
    body('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
];

/**
 * Validation rules for task ID parameter
 */
export const taskIdValidation = [
    param('id')
        .trim()
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID()
        .withMessage('Task ID must be a valid UUID'),
];
