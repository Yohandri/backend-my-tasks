/**
 * Mock Firebase Configuration
 *
 * This module provides mock implementations for development without Firebase.
 * Use this when Firebase credentials are not available.
 */
/**
 * Check if running in mock mode
 */
export declare const isMockMode: () => boolean;
/**
 * Get mock users storage
 */
export declare const getMockUsers: () => Map<string, {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Get mock tasks storage
 */
export declare const getMockTasks: () => Map<string, {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
/**
 * Clear all mock data
 */
export declare const clearMockData: () => void;
//# sourceMappingURL=mock-firebase.config.d.ts.map