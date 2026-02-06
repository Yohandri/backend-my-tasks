"use strict";
/**
 * User Entity
 *
 * Represents a user in the domain layer.
 * This entity is used throughout the application for type safety and consistency.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserEntity = exports.toUserResponse = void 0;
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
 * Convert UserEntity to UserResponse
 *
 * @param user - User entity to convert
 * @returns User response object with string dates
 */
const toUserResponse = (user) => ({
    id: user.id,
    email: user.email,
    createdAt: convertToISODate(user.createdAt),
    updatedAt: convertToISODate(user.updatedAt),
});
exports.toUserResponse = toUserResponse;
/**
 * Check if an object is a valid UserEntity
 *
 * @param obj - Object to validate
 * @returns True if the object is a valid UserEntity
 */
const isUserEntity = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    const user = obj;
    return (typeof user['id'] === 'string' &&
        typeof user['email'] === 'string' &&
        user['createdAt'] instanceof Date &&
        user['updatedAt'] instanceof Date);
};
exports.isUserEntity = isUserEntity;
//# sourceMappingURL=user.entity.js.map