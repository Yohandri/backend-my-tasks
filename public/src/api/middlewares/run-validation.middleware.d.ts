/**
 * Run Validation Middleware
 *
 * Middleware to run validation checks and return errors if any.
 */
import { Request, Response, NextFunction } from 'express';
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
export declare const runValidation: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=run-validation.middleware.d.ts.map