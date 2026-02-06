"use strict";
/**
 * Task Entity
 *
 * Represents a task in the domain layer.
 * This entity is used throughout the application for type safety and consistency.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterUpdateTaskDto = exports.isTaskEntity = exports.toTaskResponse = void 0;
/**
 * Helper function to convert various date types to ISO string
 * Handles Date, Firestore Timestamp, and string inputs
 */
const convertToISODate = (value) => {
    if (!value)
        return new Date().toISOString();
    // Handle Date objects
    if (value instanceof Date) {
        return value.toISOString();
    }
    // Handle objects with toDate method (Firestore Timestamp)
    if (typeof value === 'object' && value !== null && 'toDate' in value && typeof value.toDate === 'function') {
        try {
            return value.toDate().toISOString();
        }
        catch {
            return String(value);
        }
    }
    // Handle seconds/millis for Firestore Timestamp
    if (typeof value === 'object' && value !== null && 'seconds' in value) {
        try {
            const seconds = value.seconds;
            return new Date(seconds * 1000).toISOString();
        }
        catch {
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
const toTaskResponse = (task) => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    completed: task.completed,
    createdAt: convertToISODate(task.createdAt),
    updatedAt: convertToISODate(task.updatedAt),
});
exports.toTaskResponse = toTaskResponse;
/**
 * Check if an object is a valid TaskEntity
 *
 * @param obj - Object to validate
 * @returns True if the object is a valid TaskEntity
 */
const isTaskEntity = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    const task = obj;
    return (typeof task['id'] === 'string' &&
        typeof task['userId'] === 'string' &&
        typeof task['title'] === 'string' &&
        typeof task['description'] === 'string' &&
        typeof task['completed'] === 'boolean' &&
        task['createdAt'] instanceof Date &&
        task['updatedAt'] instanceof Date);
};
exports.isTaskEntity = isTaskEntity;
/**
 * Filter allowed update fields from an object
 *
 * @param data - Raw update data
 * @returns Filtered update object with only allowed fields
 */
const filterUpdateTaskDto = (data) => {
    const filtered = {};
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
exports.filterUpdateTaskDto = filterUpdateTaskDto;
//# sourceMappingURL=task.entity.js.map