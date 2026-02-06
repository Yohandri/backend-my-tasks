/**
 * Task Repository Interface
 * 
 * Defines the contract for task data access operations.
 * Implementations of this interface provide concrete data access for tasks.
 */

import { TaskEntity } from '../entities/task.entity';

/**
 * Repository interface for task data operations
 */
export interface ITaskRepository {
    /**
     * Find all tasks for a specific user
     * 
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    findByUserId(userId: string): Promise<TaskEntity[]>;
    
    /**
     * Find a task by its unique ID
     * 
     * @param id - Task ID to search for
     * @returns Promise resolving to TaskEntity or null if not found
     */
    findById(id: string): Promise<TaskEntity | null>;
    
    /**
     * Create a new task
     * 
     * @param task - Task data without ID and timestamps
     * @returns Promise resolving to the created TaskEntity
     */
    create(task: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskEntity>;
    
    /**
     * Update a task's information
     * 
     * @param id - Task ID to update
     * @param updates - Partial task data to update
     * @returns Promise resolving to the updated TaskEntity
     */
    update(id: string, updates: Partial<TaskEntity>): Promise<TaskEntity>;
    
    /**
     * Delete a task
     * 
     * @param id - Task ID to delete
     * @returns Promise resolving when deletion is complete
     */
    delete(id: string): Promise<void>;
    
    /**
     * Find a task by ID and user ID (for ownership verification)
     * 
     * @param id - Task ID to search for
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    findByIdAndUserId(id: string, userId: string): Promise<TaskEntity | null>;
    
    /**
     * Check if a task exists
     * 
     * @param id - Task ID to check
     * @returns Promise resolving to true if task exists
     */
    existsById(id: string): Promise<boolean>;
}
