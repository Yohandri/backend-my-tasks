/**
 * Task Routes
 * 
 * Defines routes for task endpoints.
 */

import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { createTaskValidation, updateTaskValidation, taskIdValidation } from '../validators/task.validator';
import { authMiddleware } from '../middlewares/auth.middleware';
import { runValidation } from '../middlewares/run-validation.middleware';

/**
 * Create task routes
 * 
 * @param taskController - Task controller instance
 * @returns Configured Express router
 */
export const createTaskRoutes = (taskController: TaskController): Router => {
    const router = Router();

    // All routes require authentication
    router.use(authMiddleware);

    /**
     * GET /api/tasks
     * Get all tasks for the authenticated user
     */
    router.get(
        '/',
        taskController.getTasks.bind(taskController)
    );

    /**
     * POST /api/tasks
     * Create a new task
     */
    router.post(
        '/',
        createTaskValidation,
        runValidation,
        taskController.createTask.bind(taskController)
    );

    /**
     * GET /api/tasks/:id
     * Get a single task by ID
     */
    router.get(
        '/:id',
        taskIdValidation,
        runValidation,
        taskController.getTask.bind(taskController)
    );

    /**
     * PUT /api/tasks/:id
     * Update a task
     */
    router.put(
        '/:id',
        updateTaskValidation,
        runValidation,
        taskController.updateTask.bind(taskController)
    );

    /**
     * PATCH /api/tasks/:id/toggle
     * Toggle task completion status
     */
    router.patch(
        '/:id/toggle',
        taskIdValidation,
        runValidation,
        taskController.toggleTask.bind(taskController)
    );

    /**
     * DELETE /api/tasks/:id
     * Delete a task
     */
    router.delete(
        '/:id',
        taskIdValidation,
        runValidation,
        taskController.deleteTask.bind(taskController)
    );

    return router;
};
