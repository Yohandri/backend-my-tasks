"use strict";
/**
 * User Repository Implementation
 *
 * Implements IUserRepository using Firebase Firestore.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
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
 * Convert Firestore document to UserEntity
 *
 * @param doc - Firestore document data
 * @returns UserEntity
 */
const toUserEntity = (doc) => ({
    id: doc.id,
    email: doc.email,
    createdAt: timestampToDate(doc.createdAt),
    updatedAt: timestampToDate(doc.updatedAt),
});
/**
 * User repository implementation using Firebase Firestore
 */
class UserRepository {
    db;
    collection;
    constructor() {
        this.db = (0, firebase_config_1.getFirestore)();
        this.collection = this.db.collection(firebase_config_1.COLLECTIONS.USERS);
    }
    /**
     * Find a user by their email address
     *
     * @param email - Email to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findByEmail(email) {
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
        return toUserEntity(data);
    }
    /**
     * Find a user by their unique ID
     *
     * @param id - User ID to search for
     * @returns Promise resolving to UserEntity or null if not found
     */
    async findById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            return null;
        }
        const data = doc.data();
        data.id = doc.id;
        return toUserEntity(data);
    }
    /**
     * Create a new user
     *
     * @param email - User's email address
     * @returns Promise resolving to the created UserEntity
     */
    async create(email) {
        const now = new Date();
        const user = {
            id: (0, uuid_1.v4)(),
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
    async update(id, updates) {
        const docRef = this.collection.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error(`User with ID ${id} not found`);
        }
        const existingData = doc.data();
        existingData.id = doc.id;
        const existingUser = toUserEntity(existingData);
        const updatedUser = {
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
    async existsByEmail(email) {
        const user = await this.findByEmail(email);
        return user !== null;
    }
    /**
     * Check if a user exists by ID
     *
     * @param id - User ID to check
     * @returns Promise resolving to true if user exists
     */
    async existsById(id) {
        const doc = await this.collection.doc(id).get();
        return doc.exists;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map