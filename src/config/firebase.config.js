"use strict";
/**
 * Firebase Configuration Module
 *
 * This module handles the initialization and configuration of Firebase Admin SDK.
 * It provides a singleton instance of Firestore for database operations.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLECTIONS = exports.getAuth = exports.getFirestore = exports.initializeFirebase = void 0;
const admin = __importStar(require("firebase-admin"));
/**
 * Environment configuration for Firebase
 */
const getFirebaseConfig = () => ({
    projectId: process.env['FIREBASE_PROJECT_ID'] || '',
    clientEmail: process.env['FIREBASE_CLIENT_EMAIL'] || '',
    privateKey: process.env['FIREBASE_PRIVATE_KEY']?.replace(/\\n/g, '\n') || '',
});
/**
 * Check if Firebase is already initialized
 */
const isFirebaseInitialized = () => admin.apps.length > 0;
/**
 * Initialize Firebase Admin SDK
 *
 * @throws Error if configuration is missing
 */
const initializeFirebase = () => {
    if (isFirebaseInitialized()) {
        return admin.app();
    }
    const config = getFirebaseConfig();
    if (!config.projectId || !config.clientEmail || !config.privateKey) {
        throw new Error('Firebase configuration is missing. Please set FIREBASE_PROJECT_ID, ' +
            'FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY environment variables.');
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
exports.initializeFirebase = initializeFirebase;
/**
 * Get Firestore database instance
 *
 * @returns Firestore database instance
 */
const getFirestore = () => {
    const app = (0, exports.initializeFirebase)();
    return admin.firestore(app);
};
exports.getFirestore = getFirestore;
/**
 * Get Firebase Auth instance
 *
 * @returns Firebase Auth instance
 */
const getAuth = () => {
    const app = (0, exports.initializeFirebase)();
    return admin.auth(app);
};
exports.getAuth = getAuth;
/**
 * Collection names used in Firestore
 */
exports.COLLECTIONS = {
    USERS: 'users',
    TASKS: 'tasks',
};
//# sourceMappingURL=firebase.config.js.map