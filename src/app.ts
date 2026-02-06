/**
 * Express Application Setup
 * 
 * Configures and exports the Express application.
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { getCorsOptions } from './config/cors.config';
import { createAuthRoutes } from './api/routes/auth.routes';
import { createTaskRoutes } from './api/routes/task.routes';
import { AuthController } from './api/controllers/auth.controller';
import { TaskController } from './api/controllers/task.controller';
import { UserService } from './infrastructure/services/user.service';
import { TaskService } from './infrastructure/services/task.service';
import { UserRepository } from './infrastructure/firebase/user.repository';
import { TaskRepository } from './infrastructure/firebase/task.repository';
import { notFoundHandler, errorHandler } from './api/middlewares/error.middleware';

// Load environment variables
config();

/**
 * Create and configure the Express application
 * 
 * @returns Configured Express application
 */
export const createApp = (): Express => {
    const app = express();

    // CORS configuration
    app.use(cors(getCorsOptions()));

    // Body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Health check endpoint
    app.get('/health', (_req: Request, res: Response) => {
        res.status(200).json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            environment: process.env['NODE_ENV'] || 'development',
        });
    });

    // API info endpoint
    app.get('/api', (_req: Request, res: Response) => {
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
    const userRepository = new UserRepository();
    const taskRepository = new TaskRepository();

    // Initialize services
    const userService = new UserService(userRepository);
    const taskService = new TaskService(taskRepository);

    // Initialize controllers
    const authController = new AuthController(userService);
    const taskController = new TaskController(taskService);

    // Mount routes
    app.use('/api/auth', createAuthRoutes(authController));
    app.use('/api/tasks', createTaskRoutes(taskController));

    // 404 handler
    app.use(notFoundHandler);

    // Global error handler
    app.use(errorHandler as unknown as (err: Error, req: Request, res: Response, next: NextFunction) => void);

    return app;
};
