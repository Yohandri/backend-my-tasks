/**
 * Task Controller
 * 
 * Handles task-related HTTP requests.
 */

import { Request, Response } from 'express';
import { TaskEntity, toTaskResponse } from '../../core/entities/task.entity';
import { ITaskService } from '../../core/services/task.service.interface';
import { asyncHandler, createBadRequestError, createNotFoundError } from '../middlewares/error.middleware';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

/**
 * Create task request interface
 */
interface CreateTaskRequest {
    title: string;
    description?: string;
}

/**
 * Update task request interface
 */
interface UpdateTaskRequest {
    title?: string;
    description?: string;
    completed?: boolean;
}

/**
 * Task controller
 */
export class TaskController {
    constructor(private readonly taskService: ITaskService) {}

    /**
     * Get all tasks for the authenticated user
     * 
     * GET /api/tasks
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTasks = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            const tasks: TaskEntity[] = await this.taskService.getTasks(userId);

            res.status(200).json({
                success: true,
                data: {
                    tasks: tasks.map(toTaskResponse),
                },
            });
        }
    );

    /**
     * Get a single task by ID
     * 
     * GET /api/tasks/:id
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    getTask = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;
            const taskId = req.params['id'];

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            if (!taskId) {
                throw createBadRequestError('Task ID is required');
            }

            const task = await this.taskService.getTaskById(taskId, userId);

            if (!task) {
                throw createNotFoundError('Task not found');
            }

            res.status(200).json({
                success: true,
                data: {
                    task: toTaskResponse(task),
                },
            });
        }
    );

    /**
     * Create a new task
     * 
     * POST /api/tasks
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    createTask = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;
            const { title, description } = req.body as CreateTaskRequest;

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            if (!title || typeof title !== 'string' || title.trim().length === 0) {
                throw createBadRequestError('Task title is required');
            }

            const task: TaskEntity = await this.taskService.createTask(
                {
                    title: title.trim(),
                    description: description?.trim() || '',
                },
                userId
            );

            res.status(201).json({
                success: true,
                data: {
                    task: toTaskResponse(task),
                },
                message: 'Task created successfully',
            });
        }
    );

    /**
     * Update a task
     * 
     * PUT /api/tasks/:id
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    updateTask = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;
            const taskId = req.params['id'];
            const updates = req.body as UpdateTaskRequest;

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            if (!taskId) {
                throw createBadRequestError('Task ID is required');
            }

            // Filter out undefined values
            const filteredUpdates: Partial<UpdateTaskRequest> = {};
            if (updates.title !== undefined) {
                filteredUpdates.title = updates.title;
            }
            if (updates.description !== undefined) {
                filteredUpdates.description = updates.description;
            }
            if (updates.completed !== undefined) {
                filteredUpdates.completed = updates.completed;
            }

            const task: TaskEntity = await this.taskService.updateTask(
                taskId,
                filteredUpdates,
                userId
            );

            res.status(200).json({
                success: true,
                data: {
                    task: toTaskResponse(task),
                },
                message: 'Task updated successfully',
            });
        }
    );

    /**
     * Delete a task
     * 
     * DELETE /api/tasks/:id
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    deleteTask = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;
            const taskId = req.params['id'];

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            if (!taskId) {
                throw createBadRequestError('Task ID is required');
            }

            await this.taskService.deleteTask(taskId, userId);

            res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
            });
        }
    );

    /**
     * Toggle task completion status
     * 
     * PATCH /api/tasks/:id/toggle
     * 
     * @param req - Express request with authenticated user
     * @param res - Express response
     */
    toggleTask = asyncHandler(
        async (req: Request, res: Response): Promise<void> => {
            const authenticatedReq = req as AuthenticatedRequest;
            const userId = authenticatedReq.user?.userId;
            const taskId = req.params['id'];

            if (!userId) {
                throw createBadRequestError('User ID not found in token');
            }

            if (!taskId) {
                throw createBadRequestError('Task ID is required');
            }

            const task: TaskEntity = await this.taskService.toggleTaskCompletion(taskId, userId);

            res.status(200).json({
                success: true,
                data: {
                    task: toTaskResponse(task),
                },
                message: task.completed ? 'Task marked as completed' : 'Task marked as pending',
            });
        }
    );
}
