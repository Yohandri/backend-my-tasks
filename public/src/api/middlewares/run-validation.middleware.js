"use strict";
/**
 * Run Validation Middleware
 *
 * Middleware to run validation checks and return errors if any.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runValidation = void 0;
const express_validator_1 = require("express-validator");
/**
 * Run validation middleware
 *
 * Checks for validation errors and returns them if any.
 * Should be used after express-validator middleware chain.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const runValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: errors.array().map((error) => {
                if ('path' in error && 'msg' in error) {
                    return {
                        field: error.path,
                        message: error.msg,
                    };
                }
                return {
                    field: 'unknown',
                    message: error.msg,
                };
            }),
        });
        return;
    }
    next();
};
exports.runValidation = runValidation;
//# sourceMappingURL=run-validation.middleware.js.map