"use strict";
/**
 * User Service Implementation
 *
 * Implements IUserService with business logic for user operations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
/**
 * User service implementation
 */
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Authenticate or create a user by email
     * If the user exists, return the user. If not, create a new user.
     *
     * @param email - User's email address
     * @returns Promise resolving to the UserEntity
     */
    async loginOrCreate(email) {
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
    async findByEmail(email) {
        const normalizedEmail = email.toLowerCase().trim();
        return this.userRepository.findByEmail(normalizedEmail);
    }
    /**
     * Find a user by their ID
     *
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findById(id) {
        return this.userRepository.findById(id);
    }
    /**
     * Check if a user exists by email
     *
     * @param email - Email to check
     * @returns Promise resolving to true if user exists
     */
    async existsByEmail(email) {
        const normalizedEmail = email.toLowerCase().trim();
        return this.userRepository.existsByEmail(normalizedEmail);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map