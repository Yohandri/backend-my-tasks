"use strict";
/**
 * Express Application Setup
 *
 * Configures and exports the Express application.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const cors_config_1 = require("./config/cors.config");
const auth_routes_1 = require("./api/routes/auth.routes");
const task_routes_1 = require("./api/routes/task.routes");
const auth_controller_1 = require("./api/controllers/auth.controller");
const task_controller_1 = require("./api/controllers/task.controller");
const user_service_1 = require("./infrastructure/services/user.service");
const task_service_1 = require("./infrastructure/services/task.service");
const user_repository_1 = require("./infrastructure/firebase/user.repository");
const task_repository_1 = require("./infrastructure/firebase/task.repository");
const error_middleware_1 = require("./api/middlewares/error.middleware");
// Load environment variables
(0, dotenv_1.config)();
/**
 * Create and configure the Express application
 *
 * @returns Configured Express application
 */
const createApp = () => {
    const app = (0, express_1.default)();
    // CORS configuration
    app.use((0, cors_1.default)((0, cors_config_1.getCorsOptions)()));
    // Body parsing middleware
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Health check endpoint
    app.get('/health', (_req, res) => {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: process.env['NODE_ENV'] || 'development',
        });
    });
    // API info endpoint
    app.get('/api', (_req, res) => {
        res.status(200).json({
            name: 'Backend API for My Tasks',
            version: '1.0.0',
            description: 'REST API for user authentication and task management',
            endpoints: {
                auth: '/api/auth',
                tasks: '/api/tasks',
            },
        });
    });
    // Initialize repositories
    const userRepository = new user_repository_1.UserRepository();
    const taskRepository = new task_repository_1.TaskRepository();
    // Initialize services
    const userService = new user_service_1.UserService(userRepository);
    const taskService = new task_service_1.TaskService(taskRepository);
    // Initialize controllers
    const authController = new auth_controller_1.AuthController(userService);
    const taskController = new task_controller_1.TaskController(taskService);
    // Mount routes
    app.use('/api/auth', (0, auth_routes_1.createAuthRoutes)(authController));
    app.use('/api/tasks', (0, task_routes_1.createTaskRoutes)(taskController));
    // 404 handler
    app.use(error_middleware_1.notFoundHandler);
    // Global error handler
    app.use(error_middleware_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map