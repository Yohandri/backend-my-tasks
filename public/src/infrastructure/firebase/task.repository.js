"use strict";
/**
 * Task Repository Implementation
 *
 * Implements ITaskRepository using Firebase Firestore.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const uuid_1 = require("uuid");
const firestore_1 = require("firebase-admin/firestore");
const firebase_config_1 = require("../../config/firebase.config");
/**
 * Helper function to convert Firestore Timestamp to Date
 */
const timestampToDate = (value) => {
    if (!value)
        return new Date();
    if (value instanceof firestore_1.Timestamp) {
        return value.toDate();
    }
    if (value instanceof Date) {
        return value;
    }
    return new Date();
};
/**
 * Convert Firestore document to TaskEntity
 *
 * @param doc - Firestore document data
 * @returns TaskEntity
 */
const toTaskEntity = (doc) => ({
    id: doc.id,
    userId: doc.userId,
    title: doc.title,
    description: doc.description,
    completed: doc.completed,
    createdAt: timestampToDate(doc.createdAt),
    updatedAt: timestampToDate(doc.updatedAt),
});
/**
 * Task repository implementation using Firebase Firestore
 */
class TaskRepository {
    db;
    collection;
    constructor() {
        this.db = (0, firebase_config_1.getFirestore)();
        this.collection = this.db.collection(firebase_config_1.COLLECTIONS.TASKS);
    }
    /**
     * Find all tasks for a specific user
     *
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    async findByUserId(userId) {
        const snapshot = await this.collection
            .where('userId', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return toTaskEntity(data);
        });
    }
    /**
     * Find a task by its unique ID
     *
     * @param id - Task ID to search for
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const data = doc.data();
        data.id = doc.id;
        return toTaskEntity(data);
    }
    /**
     * Create a new task
     *
     * @param task - Task data without ID and timestamps
     * @returns Promise resolving to the created TaskEntity
     */
    async create(task) {
        const now = new Date();
        const newTask = {
            id: (0, uuid_1.v4)(),
            ...task,
            createdAt: now,
            updatedAt: now,
        };
        await this.collection.doc(newTask.id).set({
            id: newTask.id,
            userId: newTask.userId,
            title: newTask.title,
            description: newTask.description,
            completed: newTask.completed,
            createdAt: newTask.createdAt,
            updatedAt: newTask.updatedAt,
        });
        return newTask;
    }
    /**
     * Update a task's information
     *
     * @param id - Task ID to update
     * @param updates - Partial task data to update
     * @returns Promise resolving to the updated TaskEntity
     */
    async update(id, updates) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error(`Task with ID ${id} not found`);
        }
        const existingData = doc.data();
        existingData.id = doc.id;
        const existingTask = toTaskEntity(existingData);
        const updatedTask = {
            ...existingTask,
            ...updates,
            updatedAt: new Date(),
        };
        await docRef.set({
            id: updatedTask.id,
            userId: updatedTask.userId,
            title: updatedTask.title,
            description: updatedTask.description,
            completed: updatedTask.completed,
            createdAt: updatedTask.createdAt,
            updatedAt: updatedTask.updatedAt,
        }, { merge: true });
        return updatedTask;
    }
    /**
     * Delete a task
     *
     * @param id - Task ID to delete
     * @returns Promise resolving when deletion is complete
     */
    async delete(id) {
        await this.collection.doc(id).delete();
    }
    /**
     * Find a task by ID and user ID (for ownership verification)
     *
     * @param id - Task ID to search for
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async findByIdAndUserId(id, userId) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const data = doc.data();
        if (data.userId !== userId) {
            return null;
        }
        data.id = doc.id;
        return toTaskEntity(data);
    }
    /**
     * Check if a task exists
     *
     * @param id - Task ID to check
     * @returns Promise resolving to true if task exists
     */
    async existsById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.exists;
    }
}
exports.TaskRepository = TaskRepository;
//# sourceMappingURL=task.repository.js.map