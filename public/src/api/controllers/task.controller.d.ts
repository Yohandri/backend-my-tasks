/**
 * Task Controller
 *
 * Handles task-related HTTP requests.
 */
/// <reference types="qs" />
import { Request, Response } from 'express';
import { ITaskService } from '../../core/services/task.service.interface';
/**
 * Task controller
 */
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: ITaskService);
    /**
     * Get all tasks for the authenticated user
     *
     * GET /api/tasks
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTasks: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Get a single task by ID
     *
     * GET /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTask: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Create a new task
     *
     * POST /api/tasks
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    createTask: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Update a task
     *
     * PUT /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    updateTask: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Delete a task
     *
     * DELETE /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    deleteTask: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
    /**
     * Toggle task completion status
     *
     * PATCH /api/tasks/:id/toggle
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    toggleTask: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: import("express").NextFunction) => void;
}
//# sourceMappingURL=task.controller.d.ts.map