/**
 * Error Handling Middleware
 *
 * Centralized error handling for the Express application.
 */
import { Request, Response, NextFunction } from 'express';
/**
 * Custom application error class
 */
export declare class AppError extends Error {
    readonly statusCode: number;
    readonly code: string;
    readonly isOperational: boolean;
    constructor(message: string, statusCode?: number, code?: string);
}
/**
 * Not found error handler
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export declare const notFoundHandler: (req: Request, res: Response) => void;
/**
 * Global error handler
 *
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export declare const errorHandler: (err: Error, req: Request, res: Response, _next: NextFunction) => void;
/**
 * Async handler wrapper
 *
 * Wraps async route handlers to catch errors and pass them to the error handler.
 *
 * @param fn - Async route handler function
 * @returns Wrapped function with error handling
 */
export declare const asyncHandler: (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => void;
/**
 * Create a not found error
 *
 * @param message - Error message
 * @returns AppError with 404 status code
 */
export declare const createNotFoundError: (message?: string) => AppError;
/**
 * Create a bad request error
 *
 * @param message - Error message
 * @returns AppError with 400 status code
 */
export declare const createBadRequestError: (message?: string) => AppError;
/**
 * Create a unauthorized error
 *
 * @param message - Error message
 * @returns AppError with 401 status code
 */
export declare const createUnauthorizedError: (message?: string) => AppError;
/**
 * Create a forbidden error
 *
 * @param message - Error message
 * @returns AppError with 403 status code
 */
export declare const createForbiddenError: (message?: string) => AppError;
//# sourceMappingURL=error.middleware.d.ts.map