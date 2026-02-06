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
    const allowedOrigins = [
        frontendUrl,
        'http://localhost:3000',
        /^https:\/\/my-tasks-4a9af--.*\.web\.app$/,
    ];
    return {
        origin: (origin, callback) => {
            // Para solicitudes sin origen (como desde localhost)
            if (!origin) {
                return callback(null, true);
            }
            // Verificar si el origen es válido
            const originIsValid = allowedOrigins.some(allowed => {
                if (allowed instanceof RegExp) {
                    return allowed.test(origin);
                }
                return allowed === origin;
            });
            // Devolver el origen exacto si es válido
            callback(null, originIsValid);
        },
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