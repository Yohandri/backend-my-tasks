/**
 * User Service Implementation
 *
 * Implements IUserService with business logic for user operations.
 */
import { UserEntity } from '../../core/entities/user.entity';
import { IUserService } from '../../core/services/user.service.interface';
import { IUserRepository } from '../../core/repositories/user.repository.interface';
/**
 * User service implementation
 */
export declare class UserService implements IUserService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
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
//# sourceMappingURL=user.service.d.ts.map