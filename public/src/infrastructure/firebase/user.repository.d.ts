/**
 * User Repository Implementation
 *
 * Implements IUserRepository using Firebase Firestore.
 */
import { UserEntity } from '../../core/entities/user.entity';
import { IUserRepository } from '../../core/repositories/user.repository.interface';
/**
 * User repository implementation using Firebase Firestore
 */
export declare class UserRepository implements IUserRepository {
    private readonly db;
    private readonly collection;
    constructor();
    /**
     * Find a user by their email address
     *
     * @param email - Email to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    findByEmail(email: string): Promise<UserEntity | null>;
    /**
     * Find a user by their unique ID
     *
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    findById(id: string): Promise<UserEntity | null>;
    /**
     * Create a new user
     *
     * @param email - User's email address
     * @returns Promise resolving to the created UserEntity
     */
    create(email: string): Promise<UserEntity>;
    /**
     * Update a user's information
     *
     * @param id - User ID to update
     * @param updates - Partial user data to update
     * @returns Promise resolving to the updated UserEntity
     */
    update(id: string, updates: Partial<UserEntity>): Promise<UserEntity>;
    /**
     * Check if a user exists by email
     *
     * @param email - Email to check
     * @returns Promise resolving to true if user exists
     */
    existsByEmail(email: string): Promise<boolean>;
    /**
     * Check if a user exists by ID
     *
     * @param id - User ID to check
     * @returns Promise resolving to true if user exists
     */
    existsById(id: string): Promise<boolean>;
}
//# sourceMappingURL=user.repository.d.ts.map