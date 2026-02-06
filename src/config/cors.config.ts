/**
 * CORS Configuration Module
 * 
 * Provides CORS configuration for the Express application.
 */

import { CorsOptions } from 'cors';
import { config } from 'dotenv';

config();

/**
 * Get CORS options from environment variables
 * 
 * @returns CORS configuration options
 */
export const getCorsOptions = (): CorsOptions => {
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
