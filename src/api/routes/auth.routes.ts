/**
 * Authentication Routes
 * 
 * Defines routes for authentication endpoints.
 */

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginOrCreateValidation } from '../validators/login.validator';
import { authMiddleware } from '../middlewares/auth.middleware';
import { runValidation } from '../middlewares/run-validation.middleware';

/**
 * Create authentication routes
 * 
 * @param authController - Auth controller instance
 * @returns Configured Express router
 */
export const createAuthRoutes = (authController: AuthController): Router => {
    const router = Router();

    /**
     * POST /api/auth/login
     * Login or create a user
     */
    router.post(
        '/login',
        loginOrCreateValidation,
        runValidation,
        authController.login.bind(authController)
    );

    /**
     * GET /api/auth/verify
     * Verify JWT token
     * Requires authentication
     */
    router.get(
        '/verify',
        authMiddleware,
        authController.verify.bind(authController)
    );

    /**
     * GET /api/auth/me
     * Get current user profile
     * Requires authentication
     */
    router.get(
        '/me',
        authMiddleware,
        authController.me.bind(authController)
    );

    return router;
};
