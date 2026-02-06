/**
 * Error Handling Middleware
 * 
 * Centralized error handling for the Express application.
 */

import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

/**
 * Custom application error class
 */
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode: number = 500, code: string = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Not found error handler
 * 
 * @param req - Express request object
 * @param res - Express response object
 */
export const notFoundHandler = (
    req: Request,
    res: Response
): void => {
    res.status(404).json({
        success: false,
        error: `Route ${req.originalUrl} not found`,
        code: 'NOT_FOUND',
    });
};

/**
 * Global error handler
 * 
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
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
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const formattedErrors = validationErrors.array().map((error: ValidationError) => {
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

/**
 * Async handler wrapper
 * 
 * Wraps async route handlers to catch errors and pass them to the error handler.
 * 
 * @param fn - Async route handler function
 * @returns Wrapped function with error handling
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * Create a not found error
 * 
 * @param message - Error message
 * @returns AppError with 404 status code
 */
export const createNotFoundError = (message: string = 'Resource not found'): AppError => {
    return new AppError(message, 404, 'NOT_FOUND');
};

/**
 * Create a bad request error
 * 
 * @param message - Error message
 * @returns AppError with 400 status code
 */
export const createBadRequestError = (message: string = 'Bad request'): AppError => {
    return new AppError(message, 400, 'BAD_REQUEST');
};

/**
 * Create a unauthorized error
 * 
 * @param message - Error message
 * @returns AppError with 401 status code
 */
export const createUnauthorizedError = (message: string = 'Unauthorized'): AppError => {
    return new AppError(message, 401, 'UNAUTHORIZED');
};

/**
 * Create a forbidden error
 * 
 * @param message - Error message
 * @returns AppError with 403 status code
 */
export const createForbiddenError = (message: string = 'Forbidden'): AppError => {
    return new AppError(message, 403, 'FORBIDDEN');
};
