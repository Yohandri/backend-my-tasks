"use strict";
/**
 * Login Validator
 *
 * Validation rules for login endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrCreateValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
/**
 * Validation rules for login request
 */
exports.loginValidation = [
    /**
     * Email validation
     * - Must be a valid email format
     * - Will be normalized to lowercase
     */
    (0, express_validator_1.body)('email')
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
exports.loginOrCreateValidation = exports.loginValidation;
//# sourceMappingURL=login.validator.js.map