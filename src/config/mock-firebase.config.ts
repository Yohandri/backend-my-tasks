/**
 * Mock Firebase Configuration
 * 
 * This module provides mock implementations for development without Firebase.
 * Use this when Firebase credentials are not available.
 */

// In-memory storage for mock mode
const mockUsers: Map<string, { id: string; email: string; createdAt: Date; updatedAt: Date }> = new Map();
const mockTasks: Map<string, { id: string; userId: string; title: string; description: string; completed: boolean; createdAt: Date; updatedAt: Date }> = new Map();

/**
 * Check if running in mock mode
 */
export const isMockMode = (): boolean => {
    return process.env['MOCK_MODE'] === 'true' || !process.env['FIREBASE_PROJECT_ID'];
};

/**
 * Get mock users storage
 */
export const getMockUsers = (): Map<string, { id: string; email: string; createdAt: Date; updatedAt: Date }> => {
    return mockUsers;
};

/**
 * Get mock tasks storage
 */
export const getMockTasks = (): Map<string, { id: string; userId: string; title: string; description: string; completed: boolean; createdAt: Date; updatedAt: Date }> => {
    return mockTasks;
};

/**
 * Clear all mock data
 */
export const clearMockData = (): void => {
    mockUsers.clear();
    mockTasks.clear();
};
