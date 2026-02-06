"use strict";
/**
 * CORS Configuration Module
 *
 * Provides CORS configuration for the Express application.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCorsOptions = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * Get CORS options from environment variables
 *
 * @returns CORS configuration options
 */
const getCorsOptions = () => {
    const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:4200';
    return {
        origin: [
            frontendUrl,
            'http://localhost:3000', // For local development
        ],
        credentials: true,
        methods: [
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'OPTIONS',
        ],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin',
        ],
        exposedHeaders: [
            'Authorization',
        ],
        maxAge: 86400, // 24 hours
    };
};
exports.getCorsOptions = getCorsOptions;
//# sourceMappingURL=cors.config.js.map