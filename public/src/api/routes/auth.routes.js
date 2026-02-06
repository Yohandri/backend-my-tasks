"use strict";
/**
 * Authentication Routes
 *
 * Defines routes for authentication endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRoutes = void 0;
const express_1 = require("express");
const login_validator_1 = require("../validators/login.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const run_validation_middleware_1 = require("../middlewares/run-validation.middleware");
/**
 * Create authentication routes
 *
 * @param authController - Auth controller instance
 * @returns Configured Express router
 */
const createAuthRoutes = (authController) => {
    const router = (0, express_1.Router)();
    /**
     * POST /api/auth/login
     * Login or create a user
     */
    router.post('/login', login_validator_1.loginOrCreateValidation, run_validation_middleware_1.runValidation, authController.login.bind(authController));
    /**
     * GET /api/auth/verify
     * Verify JWT token
     * Requires authentication
     */
    router.get('/verify', auth_middleware_1.authMiddleware, authController.verify.bind(authController));
    /**
     * GET /api/auth/me
     * Get current user profile
     * Requires authentication
     */
    router.get('/me', auth_middleware_1.authMiddleware, authController.me.bind(authController));
    return router;
};
exports.createAuthRoutes = createAuthRoutes;
//# sourceMappingURL=auth.routes.js.map