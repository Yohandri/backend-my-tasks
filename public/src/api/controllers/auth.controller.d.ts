/**
 * Authentication Controller
 *
 * Handles authentication-related HTTP requests.
 */
/// <reference types="qs" />
import { Request, Response } from 'express';
import { IUserService } from '../../core/services/user.service.interface';
/**
 * Authentication controller
 */
export declare class AuthController {
    private readonly userService;
    constructor(userService: IUserService);
    /**
     * Login or create a user
     *
     * POST /api/auth/login
     *
     * @param req - Express request
     * @param res - Express response
     * @param next - Express next function
     */
    login: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Verify JWT token and get user info
     *
     * GET /api/auth/verify
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    verify: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Get current user profile
     *
     * GET /api/auth/me
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    me: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=auth.controller.d.ts.map