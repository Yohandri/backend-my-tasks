"use strict";
/**
 * Task Service Implementation
 *
 * Implements ITaskService with business logic for task operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_entity_1 = require("../../core/entities/task.entity");
/**
 * Task service implementation
 */
class TaskService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    /**
     * Get all tasks for a user
     *
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    async getTasks(userId) {
        return this.taskRepository.findByUserId(userId);
    }
    /**
     * Get a single task by ID
     *
     * @param taskId - Task ID to get
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async getTaskById(taskId, userId) {
        return this.taskRepository.findByIdAndUserId(taskId, userId);
    }
    /**
     * Create a new task
     *
     * @param data - Task creation data
     * @param userId - User ID who owns this task
     * @returns Promise resolving to the created TaskEntity
     */
    async createTask(data, userId) {
        // Validate input
        this.validateCreateTaskDto(data);
        return this.taskRepository.create({
            userId,
            title: data.title.trim(),
            description: data.description.trim(),
            completed: false,
        });
    }
    /**
     * Update a task
     *
     * @param taskId - Task ID to update
     * @param data - Task update data
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to the updated TaskEntity
     */
    async updateTask(taskId, data, userId) {
        // Verify task exists and belongs to user
        const existingTask = await this.taskRepository.findByIdAndUserId(taskId, userId);
        if (!existingTask) {
            throw new Error('Task not found or you do not have permission to update it');
        }
        // Filter and validate updates
        const filteredUpdates = (0, task_entity_1.filterUpdateTaskDto)(data);
        // Apply updates
        const updatedTask = await this.taskRepository.update(taskId, filteredUpdates);
        return updatedTask;
    }
    /**
     * Delete a task
     *
     * @param taskId - Task ID to delete
     * @param userId - User ID to verify ownership
     * @returns Promise resolving when deletion is complete
     */
    async deleteTask(taskId, userId) {
        // Verify task exists and belongs to user
        const task = await this.taskRepository.findByIdAndUserId(taskId, userId);
        if (!task) {
            throw new Error('Task not found or you do not have permission to delete it');
        }
        await this.taskRepository.delete(taskId);
    }
    /**
     * Toggle task completion status
     *
     * @param taskId - Task ID to toggle
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to the updated TaskEntity
     */
    async toggleTaskCompletion(taskId, userId) {
        // Verify task exists and belongs to user
        const existingTask = await this.taskRepository.findByIdAndUserId(taskId, userId);
        if (!existingTask) {
            throw new Error('Task not found or you do not have permission to update it');
        }
        // Toggle completion status
        return this.taskRepository.update(taskId, {
            completed: !existingTask.completed,
        });
    }
    /**
     * Validate create task DTO
     *
     * @param data - Task creation data
     * @throws Error if validation fails
     */
    validateCreateTaskDto(data) {
        if (!data.title || data.title.trim().length === 0) {
            throw new Error('Task title is required');
        }
        if (data.title.trim().length > 200) {
            throw new Error('Task title must be 200 characters or less');
        }
        if (data.description && data.description.trim().length > 2000) {
            throw new Error('Task description must be 2000 characters or less');
        }
    }
}
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map