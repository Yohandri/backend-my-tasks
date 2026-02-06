"use strict";
/**
 * Task Validator
 *
 * Validation rules for task endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdValidation = exports.updateTaskValidation = exports.createTaskValidation = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validation rules for creating a task
 */
exports.createTaskValidation = [
    /**
     * Title validation
     * - Required
     * - Must be 1-200 characters
     */
    (0, express_validator_1.body)('title')
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
    (0, express_validator_1.body)('description')
        .trim()
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Description must be 2000 characters or less'),
];
/**
 * Validation rules for updating a task
 */
exports.updateTaskValidation = [
    /**
     * Task ID parameter validation
     */
    (0, express_validator_1.param)('id')
        .trim()
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID()
        .withMessage('Task ID must be a valid UUID'),
    /**
     * Title validation (optional for updates)
     * - If provided, must be 1-200 characters
     */
    (0, express_validator_1.body)('title')
        .trim()
        .optional()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    /**
     * Description validation (optional for updates)
     * - If provided, must be 0-2000 characters
     */
    (0, express_validator_1.body)('description')
        .trim()
        .optional()
        .isLength({ max: 2000 })
        .withMessage('Description must be 2000 characters or less'),
    /**
     * Completed status validation (optional for updates)
     */
    (0, express_validator_1.body)('completed')
        .optional()
        .isBoolean()
        .withMessage('Completed must be a boolean value'),
];
/**
 * Validation rules for task ID parameter
 */
exports.taskIdValidation = [
    (0, express_validator_1.param)('id')
        .trim()
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID()
        .withMessage('Task ID must be a valid UUID'),
];
//# sourceMappingURL=task.validator.js.map