"use strict";
/**
 * Authentication Middleware
 *
 * Middleware to verify JWT tokens and attach user information to requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuthMiddleware = exports.authMiddleware = void 0;
const jwt_util_1 = require("../../infrastructure/jwt/jwt.util");
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
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            res.status(401).json({
                success: false,
                error: 'Authorization header is required',
                code: 'MISSING_AUTH_HEADER',
            });
            return;
        }
        // Check for Bearer token format
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            res.status(401).json({
                success: false,
                error: 'Authorization header must be in format: Bearer <token>',
                code: 'INVALID_AUTH_FORMAT',
            });
            return;
        }
        const token = parts[1];
        // Verify token
        const payload = (0, jwt_util_1.verifyToken)(token);
        // Attach user information to request
        req.user = payload;
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name === 'JsonWebTokenError') {
                res.status(401).json({
                    success: false,
                    error: 'Invalid token',
                    code: 'INVALID_TOKEN',
                });
            }
            else if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    success: false,
                    error: 'Token has expired',
                    code: 'TOKEN_EXPIRED',
                });
            }
            else {
                res.status(401).json({
                    success: false,
                    error: 'Authentication failed',
                    code: 'AUTH_FAILED',
                });
            }
        }
        else {
            res.status(401).json({
                success: false,
                error: 'Authentication failed',
                code: 'AUTH_FAILED',
            });
        }
    }
};
exports.authMiddleware = authMiddleware;
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
const optionalAuthMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const parts = authHeader.split(' ');
            if (parts.length === 2 && parts[0] === 'Bearer') {
                const token = parts[1];
                const payload = (0, jwt_util_1.verifyToken)(token);
                req.user = payload;
            }
        }
        next();
    }
    catch {
        // Token verification failed, but that's okay for optional auth
        next();
    }
};
exports.optionalAuthMiddleware = optionalAuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map