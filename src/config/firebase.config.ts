/**
 * Firebase Configuration Module
 * 
 * This module handles the initialization and configuration of Firebase Admin SDK.
 * It provides a singleton instance of Firestore for database operations.
 */

import * as admin from 'firebase-admin';

/**
 * Interface representing Firebase configuration options
 */
export interface FirebaseConfig {
    projectId: string;
    clientEmail: string;
    privateKey: string;
}

/**
 * Environment configuration for Firebase
 */
const getFirebaseConfig = (): FirebaseConfig => ({
    projectId: process.env['FIREBASE_PROJECT_ID'] || '',
    clientEmail: process.env['FIREBASE_CLIENT_EMAIL'] || '',
    privateKey: process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n') || '',
});

/**
 * Check if Firebase is already initialized
 */
const isFirebaseInitialized = (): boolean => admin.apps.length > 0;

/**
 * Initialize Firebase Admin SDK
 * 
 * @throws Error if configuration is missing
 */
export const initializeFirebase = (): admin.app.App => {
    if (isFirebaseInitialized()) {
        return admin.app();
    }

    const config = getFirebaseConfig();

    if (!config.projectId || !config.clientEmail || !config.privateKey) {
        throw new Error(
            'Firebase configuration is missing. Please set FIREBASE_PROJECT_ID, ' +
            'FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.'
        );
    }

    // Initialize Firebase Admin
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: config.projectId,
            clientEmail: config.clientEmail,
            privateKey: config.privateKey,
        }),
    });

    return admin.app();
};

/**
 * Get Firestore database instance
 * 
 * @returns Firestore database instance
 */
export const getFirestore = (): admin.firestore.Firestore => {
    const app = initializeFirebase();
    return admin.firestore(app);
};

/**
 * Get Firebase Auth instance
 * 
 * @returns Firebase Auth instance
 */
export const getAuth = (): admin.auth.Auth => {
    const app = initializeFirebase();
    return admin.auth(app);
};

/**
 * Collection names used in Firestore
 */
export const COLLECTIONS = {
    USERS: 'users',
    TASKS: 'tasks',
} as const;

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
