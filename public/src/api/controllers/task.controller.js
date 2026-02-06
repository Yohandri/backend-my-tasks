"use strict";
/**
 * Task Controller
 *
 * Handles task-related HTTP requests.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_entity_1 = require("../../core/entities/task.entity");
const error_middleware_1 = require("../middlewares/error.middleware");
/**
 * Task controller
 */
class TaskController {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    /**
     * Get all tasks for the authenticated user
     *
     * GET /api/tasks
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTasks = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        const tasks = await this.taskService.getTasks(userId);
        res.status(200).json({
            success: true,
            data: {
                tasks: tasks.map(task_entity_1.toTaskResponse),
            },
        });
    });
    /**
     * Get a single task by ID
     *
     * GET /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTask = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        const taskId = req.params['id'];
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        if (!taskId) {
            throw (0, error_middleware_1.createBadRequestError)('Task ID is required');
        }
        const task = await this.taskService.getTaskById(taskId, userId);
        if (!task) {
            throw (0, error_middleware_1.createNotFoundError)('Task not found');
        }
        res.status(200).json({
            success: true,
            data: {
                task: (0, task_entity_1.toTaskResponse)(task),
            },
        });
    });
    /**
     * Create a new task
     *
     * POST /api/tasks
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    createTask = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        const { title, description } = req.body;
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        if (!title || typeof title !== 'string' || title.trim().length === 0) {
            throw (0, error_middleware_1.createBadRequestError)('Task title is required');
        }
        const task = await this.taskService.createTask({
            title: title.trim(),
            description: description?.trim() || '',
        }, userId);
        res.status(201).json({
            success: true,
            data: {
                task: (0, task_entity_1.toTaskResponse)(task),
            },
            message: 'Task created successfully',
        });
    });
    /**
     * Update a task
     *
     * PUT /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    updateTask = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        const taskId = req.params['id'];
        const updates = req.body;
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        if (!taskId) {
            throw (0, error_middleware_1.createBadRequestError)('Task ID is required');
        }
        // Filter out undefined values
        const filteredUpdates = {};
        if (updates.title !== undefined) {
            filteredUpdates.title = updates.title;
        }
        if (updates.description !== undefined) {
            filteredUpdates.description = updates.description;
        }
        if (updates.completed !== undefined) {
            filteredUpdates.completed = updates.completed;
        }
        const task = await this.taskService.updateTask(taskId, filteredUpdates, userId);
        res.status(200).json({
            success: true,
            data: {
                task: (0, task_entity_1.toTaskResponse)(task),
            },
            message: 'Task updated successfully',
        });
    });
    /**
     * Delete a task
     *
     * DELETE /api/tasks/:id
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    deleteTask = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        const taskId = req.params['id'];
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        if (!taskId) {
            throw (0, error_middleware_1.createBadRequestError)('Task ID is required');
        }
        await this.taskService.deleteTask(taskId, userId);
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
        });
    });
    /**
     * Toggle task completion status
     *
     * PATCH /api/tasks/:id/toggle
     *
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    toggleTask = (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const authenticatedReq = req;
        const userId = authenticatedReq.user?.userId;
        const taskId = req.params['id'];
        if (!userId) {
            throw (0, error_middleware_1.createBadRequestError)('User ID not found in token');
        }
        if (!taskId) {
            throw (0, error_middleware_1.createBadRequestError)('Task ID is required');
        }
        const task = await this.taskService.toggleTaskCompletion(taskId, userId);
        res.status(200).json({
            success: true,
            data: {
                task: (0, task_entity_1.toTaskResponse)(task),
            },
            message: task.completed ? 'Task marked as completed' : 'Task marked as pending',
        });
    });
}
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map