/**
 * Server Entry Point
 * 
 * Starts the Express server.
 */

import { createApp } from './app';

/**
 * Get the server port from environment variables or use default
 * 
 * @returns Server port number
 */
const getPort = (): number => {
    const port = process.env['PORT'];
    if (port) {
        const parsedPort = parseInt(port, 10);
        if (isNaN(parsedPort)) {
            return 3000;
        }
        return parsedPort;
    }
    return 3000;
};

/**
 * Start the server
 */
const startServer = (): void => {
    const app = createApp();
    const port = getPort();

    app.listen(port, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 App API Server                                  ║
║                                                           ║
║   Environment: ${process.env['NODE_ENV'] || 'development'}                           ║
║   Port: ${port}                                              ║
║                                                           ║
║   Endpoints:                                               ║
║   - Health:    GET  http://localhost:${port}/health           ║
║   - API Info:  GET  http://localhost:${port}/api              ║
║   - Auth:      POST http://localhost:${port}/api/auth/login   ║
║   - Tasks:     GET  http://localhost:${port}/api/tasks        ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: Error) => {
    console.error('Unhandled Promise Rejection:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Start the server
startServer();

export { startServer, getPort };
