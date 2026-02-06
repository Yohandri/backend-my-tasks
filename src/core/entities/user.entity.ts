/**
 * User Entity
 * 
 * Represents a user in the domain layer.
 * This entity is used throughout the application for type safety and consistency.
 */

/**
 * User entity representing a user in the system
 */
export interface UserEntity {
    /** Unique identifier for the user */
    id: string;
    
    /** User's email address */
    email: string;
    
    /** Timestamp when the user was created */
    createdAt: Date;
    
    /** Timestamp when the user was last updated */
    updatedAt: Date;
}

/**
 * Data required to create a new user
 */
export interface CreateUserDto {
    /** User's email address */
    email: string;
}

/**
 * User response interface for API responses
 */
export interface UserResponse {
    id: string;
    email: string;
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
 * Convert UserEntity to UserResponse
 * 
 * @param user - User entity to convert
 * @returns User response object with string dates
 */
export const toUserResponse = (user: UserEntity): UserResponse => ({
    id: user.id,
    email: user.email,
    createdAt: convertToISODate(user.createdAt),
    updatedAt: convertToISODate(user.updatedAt),
});

/**
 * Check if an object is a valid UserEntity
 * 
 * @param obj - Object to validate
 * @returns True if the object is a valid UserEntity
 */
export const isUserEntity = (obj: unknown): obj is UserEntity => {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    const user = obj as Record<string, unknown>;
    return (
        typeof user['id'] === 'string' &&
        typeof user['email'] === 'string' &&
        user['createdAt'] instanceof Date &&
        user['updatedAt'] instanceof Date
    );
};
