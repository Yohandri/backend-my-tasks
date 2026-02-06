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
export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) {}

    /**
     * Authenticate or create a user by email
     * If the user exists, return the user. If not, create a new user.
     * 
     * @param email - User's email address
     * @returns Promise resolving to the UserEntity
     */
    async loginOrCreate(email: string): Promise<UserEntity> {
        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user exists
        const existingUser = await this.userRepository.findByEmail(normalizedEmail);
        
        if (existingUser) {
            return existingUser;
        }

        // Create new user
        const newUser = await this.userRepository.create(normalizedEmail);
        return newUser;
    }

    /**
     * Find a user by their email
     * 
     * @param email - Email to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findByEmail(email: string): Promise<UserEntity | null> {
        const normalizedEmail = email.toLowerCase().trim();
        return this.userRepository.findByEmail(normalizedEmail);
    }

    /**
     * Find a user by their ID
     * 
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findById(id: string): Promise<UserEntity | null> {
        return this.userRepository.findById(id);
    }

    /**
     * Check if a user exists by email
     * 
     * @param email - Email to check
     * @returns Promise resolving to true if user exists
     */
    async existsByEmail(email: string): Promise<boolean> {
        const normalizedEmail = email.toLowerCase().trim();
        return this.userRepository.existsByEmail(normalizedEmail);
    }
}
