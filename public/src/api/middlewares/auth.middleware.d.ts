/**
 * Authentication Middleware
 *
 * Middleware to verify JWT tokens and attach user information to requests.
 */
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from '../../infrastructure/jwt/jwt.util';
/**
 * Extended Request interface with user information
 */
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}
/**
 * Authentication middleware
 *
 * Verifies the JWT token from the Authorization header and attaches
 * user information to the request object.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => void;
/**
 * Optional authentication middleware
 *
 * Attempts to verify the token if present, but doesn't require it.
 * Useful for endpoints that can work with or without authentication.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export declare const optionalAuthMiddleware: (req: Request, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map