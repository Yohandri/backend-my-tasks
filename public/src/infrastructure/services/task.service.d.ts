/**
 * Task Service Implementation
 *
 * Implements ITaskService with business logic for task operations.
 */
import { TaskEntity } from '../../core/entities/task.entity';
import { ITaskService } from '../../core/services/task.service.interface';
import { ITaskRepository } from '../../core/repositories/task.repository.interface';
import { CreateTaskDto, UpdateTaskDto } from '../../core/entities/task.entity';
/**
 * Task service implementation
 */
export declare class TaskService implements ITaskService {
    private readonly taskRepository;
    constructor(taskRepository: ITaskRepository);
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
    /**
     * Validate create task DTO
     *
     * @param data - Task creation data
     * @throws Error if validation fails
     */
    private validateCreateTaskDto;
}
//# sourceMappingURL=task.service.d.ts.map