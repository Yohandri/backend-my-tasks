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
 * Convert UserEntity to UserResponse
 *
 * @param user - User entity to convert
 * @returns User response object with string dates
 */
export declare const toUserResponse: (user: UserEntity) => UserResponse;
/**
 * Check if an object is a valid UserEntity
 *
 * @param obj - Object to validate
 * @returns True if the object is a valid UserEntity
 */
export declare const isUserEntity: (obj: unknown) => obj is UserEntity;
//# sourceMappingURL=user.entity.d.ts.map