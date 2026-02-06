/**
 * User Service Interface
 *
 * Defines the contract for user business logic operations.
 * Implementations of this interface provide concrete user operations.
 */
import { UserEntity } from '../entities/user.entity';
/**
 * Service interface for user business operations
 */
export interface IUserService {
    /**
     * Authenticate or create a user by email
     * If the user exists, return the user. If not, create a new user.
     *
     * @param email - User's email address
     * @returns Promise resolving to the UserEntity
     */
    loginOrCreate(email: string): Promise<UserEntity>;
    /**
     * Find a user by their email
     *
     * @param email - Email to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    findByEmail(email: string): Promise<UserEntity | null>;
    /**
     * Find a user by their ID
     *
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    findById(id: string): Promise<UserEntity | null>;
    /**
     * Check if a user exists by email
     *
     * @param email - Email to check
     * @returns Promise resolving to true if user exists
     */
    existsByEmail(email: string): Promise<boolean>;
}
//# sourceMappingURL=user.service.interface.d.ts.map