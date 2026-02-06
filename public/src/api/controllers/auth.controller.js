"use strict";
/**
 * Authentication Controller
 *
 * Handles authentication-related HTTP requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_entity_1 = require("../../core/entities/user.entity");
const jwt_util_1 = require("../../infrastructure/jwt/jwt.util");
const error_middleware_1 = require("../middlewares/error.middleware");
/**
 * Authentication controller
 */
class AuthController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    /**
     * Login or create a user
     *
     * POST /api/auth/login
     *
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function
     */
    login = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { email } = req.body;
        const create = req.body.create || false;
        // Validate email
        if (!email || typeof email !== 'string' || email.trim().length === 0) {
            throw (0, error_middleware_1.createBadRequestError)('Email is required');
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw (0, error_middleware_1.createBadRequestError)('Invalid email format');
        }
        // Check if user exists
        let user = await this.userService.findByEmail(email.toLowerCase());
        if (!user && !create) {
            // User not found and create flag is false - return 404 to trigger frontend user creation flow
            res.status(404).json({
                success: true,
                message: 'User does not exist',
            });
            return;
        }
        if (!user && create) {
            // Create new user
            user = await this.userService.loginOrCreate(email);
        }
        // Generate JWT token
        const { token, expiresIn } = (0, jwt_util_1.generateToken)(user.id, user.email);
        // Return response
        res.status(200).json({
            success: true,
            data: {
                user: (0, user_entity_1.toUserResponse)(user),
                token,
                expiresIn,
            },
            message: 'Login successful',
        });
    });
    /**
     * Verify JWT token and get user info
     *
     * GET /api/auth/verify
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    verify = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const user = authenticatedReq.user;
        if (!user) {
            throw (0, error_middleware_1.createBadRequestError)('No user information found');
        }
        res.status(200).json({
            success: true,
            data: {
                userId: user.userId,
                email: user.email,
            },
        });
    });
    /**
     * Get current user profile
     *
     * GET /api/auth/me
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    me = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('No user ID found');
        }
        const user = await this.userService.findById(userId);
        if (!user) {
            throw (0, error_middleware_1.createBadRequestError)('User not found');
        }
        res.status(200).json({
            success: true,
            data: {
                user: (0, user_entity_1.toUserResponse)(user),
            },
        });
    });
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map