/**
 * Task Entity
 *
 * Represents a task in the domain layer.
 * This entity is used throughout the application for type safety and consistency.
 */
/**
 * Task entity representing a task in the system
 */
export interface TaskEntity {
    /** Unique identifier for the task */
    id: string;
    /** ID of the user who owns this task */
    userId: string;
    /** Task title */
    title: string;
    /** Task description */
    description: string;
    /** Whether the task is completed */
    completed: boolean;
    /** Timestamp when the task was created */
    createdAt: Date;
    /** Timestamp when the task was last updated */
    updatedAt: Date;
}
/**
 * Data required to create a new task
 */
export interface CreateTaskDto {
    /** Task title */
    title: string;
    /** Task description */
    description: string;
}
/**
 * Data required to update a task
 */
export interface UpdateTaskDto {
    /** Task title (optional) */
    title?: string;
    /** Task description (optional) */
    description?: string;
    /** Task completion status (optional) */
    completed?: boolean;
}
/**
 * Task response interface for API responses
 */
export interface TaskResponse {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}
/**
 * Convert TaskEntity to TaskResponse
 *
 * @param task - Task entity to convert
 * @returns Task response object with string dates
 */
export declare const toTaskResponse: (task: TaskEntity) => TaskResponse;
/**
 * Check if an object is a valid TaskEntity
 *
 * @param obj - Object to validate
 * @returns True if the object is a valid TaskEntity
 */
export declare const isTaskEntity: (obj: unknown) => obj is TaskEntity;
/**
 * Filter allowed update fields from an object
 *
 * @param data - Raw update data
 * @returns Filtered update object with only allowed fields
 */
export declare const filterUpdateTaskDto: (data: Partial<UpdateTaskDto>) => Partial<TaskEntity>;
//# sourceMappingURL=task.entity.d.ts.map