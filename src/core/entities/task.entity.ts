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
 * Helper function to convert various date types to ISO string
 * Handles Date, Firestore Timestamp, and string inputs
 */
const convertToISODate = (value: unknown): string => {
    if (!value) return new Date().toISOString();
    
    // Handle Date objects
    if (value instanceof Date) {
        return value.toISOString();
    }
    
    // Handle objects with toDate method (Firestore Timestamp)
    if (typeof value === 'object' && value !== null && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
        try {
            return (value as { toDate: () => Date }).toDate().toISOString();
        } catch {
            return String(value);
        }
    }
    
    // Handle seconds/millis for Firestore Timestamp
    if (typeof value === 'object' && value !== null && 'seconds' in value) {
        try {
            const seconds = (value as { seconds: number }).seconds;
            return new Date(seconds * 1000).toISOString();
        } catch {
            return String(value);
        }
    }
    
    // Fallback to string conversion
    return String(value);
};

/**
 * Convert TaskEntity to TaskResponse
 * 
 * @param task - Task entity to convert
 * @returns Task response object with string dates
 */
export const toTaskResponse = (task: TaskEntity): TaskResponse => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: convertToISODate(task.createdAt),
    updatedAt: convertToISODate(task.updatedAt),
});

/**
 * Check if an object is a valid TaskEntity
 * 
 * @param obj - Object to validate
 * @returns True if the object is a valid TaskEntity
 */
export const isTaskEntity = (obj: unknown): obj is TaskEntity => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const task = obj as Record<string, unknown>;
    return (
        typeof task['id'] === 'string' &&
        typeof task['userId'] === 'string' &&
        typeof task['title'] === 'string' &&
        typeof task['description'] === 'string' &&
        typeof task['completed'] === 'boolean' &&
        task['createdAt'] instanceof Date &&
        task['updatedAt'] instanceof Date
    );
};

/**
 * Filter allowed update fields from an object
 * 
 * @param data - Raw update data
 * @returns Filtered update object with only allowed fields
 */
export const filterUpdateTaskDto = (data: Partial<UpdateTaskDto>): Partial<TaskEntity> => {
    const filtered: Partial<TaskEntity> = {};
    
    if (data.title !== undefined) {
        filtered.title = data.title;
    }
    if (data.description !== undefined) {
        filtered.description = data.description;
    }
    if (data.completed !== undefined) {
        filtered.completed = data.completed;
    }
    
    return filtered;
};
