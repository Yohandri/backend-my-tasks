"use strict";
/**
 * Server Entry Point
 *
 * Starts the Express server.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPort = exports.startServer = void 0;
const app_1 = require("./app");
/**
 * Get the server port from environment variables or use default
 *
 * @returns Server port number
 */
const getPort = () => {
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
exports.getPort = getPort;
/**
 * Start the server
 */
const startServer = () => {
    const app = (0, app_1.createApp)();
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
exports.startServer = startServer;
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Promise Rejection:', reason);
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
// Start the server
startServer();
//# sourceMappingURL=server.js.map