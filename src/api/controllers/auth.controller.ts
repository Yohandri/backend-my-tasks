/**
 * Authentication Controller
 * 
 * Handles authentication-related HTTP requests.
 */

import { Request, Response } from 'express';
import { toUserResponse } from '../../core/entities/user.entity';
import { IUserService } from '../../core/services/user.service.interface';
import { generateToken } from '../../infrastructure/jwt/jwt.util';
import { asyncHandler, createBadRequestError } from '../middlewares/error.middleware';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

/**
 * Login request interface
 */
interface LoginRequest {
    email: string;
    create?: boolean; // Flag to indicate if user should be created if not found
}

/**
 * Authentication controller
 */
export class AuthController {
    constructor(private readonly userService: IUserService) {}

    /**
     * Login or create a user
     * 
     * POST /api/auth/login
     * 
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function
     */
    login = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const { email } = req.body as LoginRequest;
            const create = req.body.create || false;

            // Validate email
            if (!email || typeof email !== 'string' || email.trim().length === 0) {
                throw createBadRequestError('Email is required');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw createBadRequestError('Invalid email format');
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
            const { token, expiresIn } = generateToken(user!.id, user!.email);

            // Return response
            res.status(200).json({
                success: true,
                data: {
                    user: toUserResponse(user!),
                    token,
                    expiresIn,
                },
                message: 'Login successful',
            });
        }
    );

    /**
     * Verify JWT token and get user info
     * 
     * GET /api/auth/verify
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    verify = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const user = authenticatedReq.user;

            if (!user) {
                throw createBadRequestError('No user information found');
            }

            res.status(200).json({
                success: true,
                data: {
                    userId: user.userId,
                    email: user.email,
                },
            });
        }
    );

    /**
     * Get current user profile
     * 
     * GET /api/auth/me
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    me = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;

            if (!userId) {
                throw createBadRequestError('No user ID found');
            }

            const user = await this.userService.findById(userId);

            if (!user) {
                throw createBadRequestError('User not found');
            }

            res.status(200).json({
                success: true,
                data: {
                    user: toUserResponse(user),
                },
            });
        }
    );
}
