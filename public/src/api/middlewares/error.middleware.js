"use strict";
/**
 * Error Handling Middleware
 *
 * Centralized error handling for the Express application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForbiddenError = exports.createUnauthorizedError = exports.createBadRequestError = exports.createNotFoundError = exports.asyncHandler = exports.errorHandler = exports.notFoundHandler = exports.AppError = void 0;
const express_validator_1 = require("express-validator");
/**
 * Custom application error class
 */
class AppError extends Error {
    statusCode;
    code;
    isOperational;
    constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
/**
 * Not found error handler
 *
 * @param req - Express request object
 * @param res - Express response object
 */
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
        code: 'NOT_FOUND',
    });
};
exports.notFoundHandler = notFoundHandler;
/**
 * Global error handler
 *
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
const errorHandler = (err, req, res, _next) => {
    console.error('Error:', err);
    // Handle known operational errors
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: err.message,
            code: err.code,
        });
        return;
    }
    // Handle validation errors
    const validationErrors = (0, express_validator_1.validationResult)(req);
    if (!validationErrors.isEmpty()) {
        const formattedErrors = validationErrors.array().map((error) => {
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
        });
        res.status(400).json({
            success: false,
            error: 'Validation failed',
            code: 'VALIDATION_ERROR',
            details: formattedErrors,
        });
        return;
    }
    // Handle known errors from libraries
    if (err.name === 'ValidationError') {
        res.status(400).json({
            success: false,
            error: err.message,
            code: 'VALIDATION_ERROR',
        });
        return;
    }
    // Handle unauthorized errors
    if (err.name === 'UnauthorizedError' || err.name === 'JsonWebTokenError') {
        res.status(401).json({
            success: false,
            error: 'Unauthorized',
            code: 'UNAUTHORIZED',
        });
        return;
    }
    // Handle database errors
    if (err.name === 'FirebaseError' || err.message?.includes('Firebase')) {
        res.status(500).json({
            success: false,
            error: 'Database operation failed',
            code: 'DATABASE_ERROR',
        });
        return;
    }
    // Default error response
    const statusCode = 500;
    const message = process.env['NODE_ENV'] === 'production'
        ? 'Internal server error'
        : err.message;
    res.status(statusCode).json({
        success: false,
        error: message,
        code: 'INTERNAL_ERROR',
    });
};
exports.errorHandler = errorHandler;
/**
 * Async handler wrapper
 *
 * Wraps async route handlers to catch errors and pass them to the error handler.
 *
 * @param fn - Async route handler function
 * @returns Wrapped function with error handling
 */
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
/**
 * Create a not found error
 *
 * @param message - Error message
 * @returns AppError with 404 status code
 */
const createNotFoundError = (message = 'Resource not found') => {
    return new AppError(message, 404, 'NOT_FOUND');
};
exports.createNotFoundError = createNotFoundError;
/**
 * Create a bad request error
 *
 * @param message - Error message
 * @returns AppError with 400 status code
 */
const createBadRequestError = (message = 'Bad request') => {
    return new AppError(message, 400, 'BAD_REQUEST');
};
exports.createBadRequestError = createBadRequestError;
/**
 * Create a unauthorized error
 *
 * @param message - Error message
 * @returns AppError with 401 status code
 */
const createUnauthorizedError = (message = 'Unauthorized') => {
    return new AppError(message, 401, 'UNAUTHORIZED');
};
exports.createUnauthorizedError = createUnauthorizedError;
/**
 * Create a forbidden error
 *
 * @param message - Error message
 * @returns AppError with 403 status code
 */
const createForbiddenError = (message = 'Forbidden') => {
    return new AppError(message, 403, 'FORBIDDEN');
};
exports.createForbiddenError = createForbiddenError;
//# sourceMappingURL=error.middleware.js.map