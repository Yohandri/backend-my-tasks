/**
 * Task Service Implementation
 * 
 * Implements ITaskService with business logic for task operations.
 */

import { TaskEntity } from '../../core/entities/task.entity';
import { ITaskService } from '../../core/services/task.service.interface';
import { ITaskRepository } from '../../core/repositories/task.repository.interface';
import { CreateTaskDto, UpdateTaskDto, filterUpdateTaskDto } from '../../core/entities/task.entity';

/**
 * Task service implementation
 */
export class TaskService implements ITaskService {
    constructor(private readonly taskRepository: ITaskRepository) {}

    /**
     * Get all tasks for a user
     * 
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    async getTasks(userId: string): Promise<TaskEntity[]> {
        return this.taskRepository.findByUserId(userId);
    }

    /**
     * Get a single task by ID
     * 
     * @param taskId - Task ID to get
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async getTaskById(taskId: string, userId: string): Promise<TaskEntity | null> {
        return this.taskRepository.findByIdAndUserId(taskId, userId);
    }

    /**
     * Create a new task
     * 
     * @param data - Task creation data
     * @param userId - User ID who owns this task
     * @returns Promise resolving to the created TaskEntity
     */
    async createTask(data: CreateTaskDto, userId: string): Promise<TaskEntity> {
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
    async updateTask(taskId: string, data: UpdateTaskDto, userId: string): Promise<TaskEntity> {
        // Verify task exists and belongs to user
        const existingTask = await this.taskRepository.findByIdAndUserId(taskId, userId);
        
        if (!existingTask) {
            throw new Error('Task not found or you do not have permission to update it');
        }

        // Filter and validate updates
        const filteredUpdates = filterUpdateTaskDto(data);

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
    async deleteTask(taskId: string, userId: string): Promise<void> {
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
    async toggleTaskCompletion(taskId: string, userId: string): Promise<TaskEntity> {
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
    private validateCreateTaskDto(data: CreateTaskDto): void {
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
