"use strict";
/**
 * Mock Firebase Configuration
 *
 * This module provides mock implementations for development without Firebase.
 * Use this when Firebase credentials are not available.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearMockData = exports.getMockTasks = exports.getMockUsers = exports.isMockMode = void 0;
// In-memory storage for mock mode
const mockUsers = new Map();
const mockTasks = new Map();
/**
 * Check if running in mock mode
 */
const isMockMode = () => {
    return process.env['MOCK_MODE'] === 'true' || !process.env['FIREBASE_PROJECT_ID'];
};
exports.isMockMode = isMockMode;
/**
 * Get mock users storage
 */
const getMockUsers = () => {
    return mockUsers;
};
exports.getMockUsers = getMockUsers;
/**
 * Get mock tasks storage
 */
const getMockTasks = () => {
    return mockTasks;
};
exports.getMockTasks = getMockTasks;
/**
 * Clear all mock data
 */
const clearMockData = () => {
    mockUsers.clear();
    mockTasks.clear();
};
exports.clearMockData = clearMockData;
//# sourceMappingURL=mock-firebase.config.js.map