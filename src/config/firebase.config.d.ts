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
 * Initialize Firebase Admin SDK
 *
 * @throws Error if configuration is missing
 */
export declare const initializeFirebase: () => admin.app.App;
/**
 * Get Firestore database instance
 *
 * @returns Firestore database instance
 */
export declare const getFirestore: () => admin.firestore.Firestore;
/**
 * Get Firebase Auth instance
 *
 * @returns Firebase Auth instance
 */
export declare const getAuth: () => admin.auth.Auth;
/**
 * Collection names used in Firestore
 */
export declare const COLLECTIONS: {
    readonly USERS: "users";
    readonly TASKS: "tasks";
};
export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS];
//# sourceMappingURL=firebase.config.d.ts.map