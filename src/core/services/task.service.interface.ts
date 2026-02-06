/**
 * Task Service Interface
 * 
 * Defines the contract for task business logic operations.
 * Implementations of this interface provide concrete task operations.
 */

import { TaskEntity } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../entities/task.entity';

/**
 * Service interface for task business operations
 */
export interface ITaskService {
    /**
     * Get all tasks for a user
     * 
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    getTasks(userId: string): Promise<TaskEntity[]>;
    
    /**
     * Get a single task by ID
     * 
     * @param taskId - Task ID to get
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    getTaskById(taskId: string, userId: string): Promise<TaskEntity | null>;
    
    /**
     * Create a new task
     * 
     * @param data - Task creation data
     * @param userId - User ID who owns this task
     * @returns Promise resolving to the created TaskEntity
     */
    createTask(data: CreateTaskDto, userId: string): Promise<TaskEntity>;
    
    /**
     * Update a task
     * 
     * @param taskId - Task ID to update
     * @param data - Task update data
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to the updated TaskEntity
     */
    updateTask(taskId: string, data: UpdateTaskDto, userId: string): Promise<TaskEntity>;
    
    /**
     * Delete a task
     * 
     * @param taskId - Task ID to delete
     * @param userId - User ID to verify ownership
     * @returns Promise resolving when deletion is complete
     */
    deleteTask(taskId: string, userId: string): Promise<void>;
    
    /**
     * Toggle task completion status
     * 
     * @param taskId - Task ID to toggle
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to the updated TaskEntity
     */
    toggleTaskCompletion(taskId: string, userId: string): Promise<TaskEntity>;
}
