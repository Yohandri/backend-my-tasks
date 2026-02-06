/**
 * Task Repository Implementation
 * 
 * Implements ITaskRepository using Firebase Firestore.
 */

import { v4 as uuidv4 } from 'uuid';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import {
    COLLECTIONS,
    getFirestore,
} from '../../config/firebase.config';
import { TaskEntity } from '../../core/entities/task.entity';
import { ITaskRepository } from '../../core/repositories/task.repository.interface';

/**
 * Helper function to convert Firestore Timestamp to Date
 */
const timestampToDate = (value: Date | Timestamp | FieldValue | undefined): Date => {
    if (!value) return new Date();
    if (value instanceof Timestamp) {
        return value.toDate();
    }
    if (value instanceof Date) {
        return value;
    }
    return new Date();
};

/**
 * Firestore document structure for a task
 */
interface TaskDocument {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Convert Firestore document to TaskEntity
 * 
 * @param doc - Firestore document data
 * @returns TaskEntity
 */
const toTaskEntity = (doc: TaskDocument & { id: string }): TaskEntity => ({
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
export class TaskRepository implements ITaskRepository {
    private readonly db: FirebaseFirestore.Firestore;
    private readonly collection: FirebaseFirestore.CollectionReference<TaskDocument>;

    constructor() {
        this.db = getFirestore();
        this.collection = this.db.collection(COLLECTIONS.TASKS) as FirebaseFirestore.CollectionReference<TaskDocument>;
    }

    /**
     * Find all tasks for a specific user
     * 
     * @param userId - User ID to get tasks for
     * @returns Promise resolving to array of TaskEntity sorted by creation date (newest first)
     */
    async findByUserId(userId: string): Promise<TaskEntity[]> {
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
            return toTaskEntity(data as TaskDocument & { id: string });
        });
    }

    /**
     * Find a task by its unique ID
     * 
     * @param id - Task ID to search for
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async findById(id: string): Promise<TaskEntity | null> {
        const doc = await this.collection.doc(id).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data()!;
        data.id = doc.id;
        return toTaskEntity(data as TaskDocument & { id: string });
    }

    /**
     * Create a new task
     * 
     * @param task - Task data without ID and timestamps
     * @returns Promise resolving to the created TaskEntity
     */
    async create(task: Omit<TaskEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskEntity> {
        const now = new Date();
        const newTask: TaskEntity = {
            id: uuidv4(),
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
    async update(id: string, updates: Partial<TaskEntity>): Promise<TaskEntity> {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error(`Task with ID ${id} not found`);
        }

        const existingData = doc.data() as TaskDocument;
        existingData.id = doc.id;
        const existingTask = toTaskEntity(existingData as TaskDocument & { id: string });
        
        const updatedTask: TaskEntity = {
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
    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }

    /**
     * Find a task by ID and user ID (for ownership verification)
     * 
     * @param id - Task ID to search for
     * @param userId - User ID to verify ownership
     * @returns Promise resolving to TaskEntity or null if not found
     */
    async findByIdAndUserId(id: string, userId: string): Promise<TaskEntity | null> {
        const doc = await this.collection.doc(id).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data() as TaskDocument;
        
        if (data.userId !== userId) {
            return null;
        }

        data.id = doc.id;
        return toTaskEntity(data as TaskDocument & { id: string });
    }

    /**
     * Check if a task exists
     * 
     * @param id - Task ID to check
     * @returns Promise resolving to true if task exists
     */
    async existsById(id: string): Promise<boolean> {
        const doc = await this.collection.doc(id).get();
        return doc.exists;
    }
}
