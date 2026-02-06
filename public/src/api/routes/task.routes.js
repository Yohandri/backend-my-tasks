"use strict";
/**
 * Task Routes
 *
 * Defines routes for task endpoints.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTaskRoutes = void 0;
const express_1 = require("express");
const task_validator_1 = require("../validators/task.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const run_validation_middleware_1 = require("../middlewares/run-validation.middleware");
/**
 * Create task routes
 *
 * @param taskController - Task controller instance
 * @returns Configured Express router
 */
const createTaskRoutes = (taskController) => {
    const router = (0, express_1.Router)();
    // All routes require authentication
    router.use(auth_middleware_1.authMiddleware);
    /**
     * GET /api/tasks
     * Get all tasks for the authenticated user
     */
    router.get('/', taskController.getTasks.bind(taskController));
    /**
     * POST /api/tasks
     * Create a new task
     */
    router.post('/', task_validator_1.createTaskValidation, run_validation_middleware_1.runValidation, taskController.createTask.bind(taskController));
    /**
     * GET /api/tasks/:id
     * Get a single task by ID
     */
    router.get('/:id', task_validator_1.taskIdValidation, run_validation_middleware_1.runValidation, taskController.getTask.bind(taskController));
    /**
     * PUT /api/tasks/:id
     * Update a task
     */
    router.put('/:id', task_validator_1.updateTaskValidation, run_validation_middleware_1.runValidation, taskController.updateTask.bind(taskController));
    /**
     * PATCH /api/tasks/:id/toggle
     * Toggle task completion status
     */
    router.patch('/:id/toggle', task_validator_1.taskIdValidation, run_validation_middleware_1.runValidation, taskController.toggleTask.bind(taskController));
    /**
     * DELETE /api/tasks/:id
     * Delete a task
     */
    router.delete('/:id', task_validator_1.taskIdValidation, run_validation_middleware_1.runValidation, taskController.deleteTask.bind(taskController));
    return router;
};
exports.createTaskRoutes = createTaskRoutes;
//# sourceMappingURL=task.routes.js.map