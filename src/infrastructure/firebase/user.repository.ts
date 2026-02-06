/**
 * User Repository Implementation
 * 
 * Implements IUserRepository using Firebase Firestore.
 */

import { v4 as uuidv4 } from 'uuid';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import {
    COLLECTIONS,
    getFirestore,
} from '../../config/firebase.config';
import { UserEntity } from '../../core/entities/user.entity';
import { IUserRepository } from '../../core/repositories/user.repository.interface';

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
 * Firestore document structure for a user
 */
interface UserDocument {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Convert Firestore document to UserEntity
 * 
 * @param doc - Firestore document data
 * @returns UserEntity
 */
const toUserEntity = (doc: UserDocument & { id: string }): UserEntity => ({
    id: doc.id,
    email: doc.email,
    createdAt: timestampToDate(doc.createdAt),
    updatedAt: timestampToDate(doc.updatedAt),
});

/**
 * User repository implementation using Firebase Firestore
 */
export class UserRepository implements IUserRepository {
    private readonly db: FirebaseFirestore.Firestore;
    private readonly collection: FirebaseFirestore.CollectionReference<UserDocument>;

    constructor() {
        this.db = getFirestore();
        this.collection = this.db.collection(COLLECTIONS.USERS) as FirebaseFirestore.CollectionReference<UserDocument>;
    }

    /**
     * Find a user by their email address
     * 
     * @param email - Email to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findByEmail(email: string): Promise<UserEntity | null> {
        const snapshot = await this.collection
            .where('email', '==', email.toLowerCase())
            .limit(1)
            .get();

        if (snapshot.empty) {
            return null;
        }

        const doc = snapshot.docs[0];
        const data = doc.data();
        data.id = doc.id;
        return toUserEntity(data as UserDocument & { id: string });
    }

    /**
     * Find a user by their unique ID
     * 
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findById(id: string): Promise<UserEntity | null> {
        const doc = await this.collection.doc(id).get();

        if (!doc.exists) {
            return null;
        }

        const data = doc.data()!;
        data.id = doc.id;
        return toUserEntity(data as UserDocument & { id: string });
    }

    /**
     * Create a new user
     * 
     * @param email - User's email address
     * @returns Promise resolving to the created UserEntity
     */
    async create(email: string): Promise<UserEntity> {
        const now = new Date();
        const user: UserEntity = {
            id: uuidv4(),
            email: email.toLowerCase(),
            createdAt: now,
            updatedAt: now,
        };

        await this.collection.doc(user.id).set({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
        return user;
    }

    /**
     * Update a user's information
     * 
     * @param id - User ID to update
     * @param updates - Partial user data to update
     * @returns Promise resolving to the updated UserEntity
     */
    async update(id: string, updates: Partial<UserEntity>): Promise<UserEntity> {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();

        if (!doc.exists) {
            throw new Error(`User with ID ${id} not found`);
        }

        const existingData = doc.data() as UserDocument;
        existingData.id = doc.id;
        const existingUser = toUserEntity(existingData as UserDocument & { id: string });
        
        const updatedUser: UserEntity = {
            ...existingUser,
            ...updates,
            updatedAt: new Date(),
        };

        await docRef.set({
            id: updatedUser.id,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        }, { merge: true });
        
        return updatedUser;
    }

    /**
     * Check if a user exists by email
     * 
     * @param email - Email to check
     * @returns Promise resolving to true if user exists
     */
    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.findByEmail(email);
        return user !== null;
    }

    /**
     * Check if a user exists by ID
     * 
     * @param id - User ID to check
     * @returns Promise resolving to true if user exists
     */
    async existsById(id: string): Promise<boolean> {
        const doc = await this.collection.doc(id).get();
        return doc.exists;
    }
}
