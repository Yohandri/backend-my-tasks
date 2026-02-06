"use strict";
/**
 * JWT Utility Module
 *
 * Provides JWT token generation and validation functionality.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureRandomString = exports.getTokenExpiration = exports.isTokenExpired = exports.decodeToken = exports.verifyToken = exports.generateToken = exports.getJwtConfig = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * Get JWT configuration from environment variables
 *
 * @returns JWT configuration object
 * @throws Error if required environment variables are missing
 */
const getJwtConfig = () => {
    const secret = process.env['JWT_SECRET'];
    const expiresIn = process.env['JWT_EXPIRATION'] || '24h';
    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }
    return { secret, expiresIn };
};
exports.getJwtConfig = getJwtConfig;
/**
 * Generate a JWT token for a user
 *
 * @param userId - User ID to include in the token
 * @param email - User email to include in the token
 * @returns Token response with token and expiration time
 */
const generateToken = (userId, email) => {
    const config = (0, exports.getJwtConfig)();
    const payload = {
        userId,
        email,
    };
    const token = jsonwebtoken_1.default.sign(payload, config.secret, {
        expiresIn: config.expiresIn,
    });
    return {
        token,
        expiresIn: config.expiresIn,
    };
};
exports.generateToken = generateToken;
/**
 * Verify and decode a JWT token
 *
 * @param token - JWT token to verify
 * @returns Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
const verifyToken = (token) => {
    const config = (0, exports.getJwtConfig)();
    return jsonwebtoken_1.default.verify(token, config.secret);
};
exports.verifyToken = verifyToken;
/**
 * Decode a token without verification (for reading purposes only)
 *
 * @param token - JWT token to decode
 * @returns Decoded payload or null if invalid
 */
const decodeToken = (token) => {
    try {
        return jsonwebtoken_1.default.decode(token);
    }
    catch {
        return null;
    }
};
exports.decodeToken = decodeToken;
/**
 * Check if a token is expired
 *
 * @param token - JWT token to check
 * @returns True if the token is expired
 */
const isTokenExpired = (token) => {
    const payload = (0, exports.decodeToken)(token);
    if (!payload || !payload.exp) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
};
exports.isTokenExpired = isTokenExpired;
/**
 * Get token expiration time in milliseconds
 *
 * @param token - JWT token to check
 * @returns Expiration time in milliseconds or null if invalid
 */
const getTokenExpiration = (token) => {
    const payload = (0, exports.decodeToken)(token);
    if (!payload || !payload.exp) {
        return null;
    }
    return payload.exp * 1000;
};
exports.getTokenExpiration = getTokenExpiration;
/**
 * Generate a secure random string
 * Useful for generating unique IDs or secrets
 *
 * @param length - Length of the random string
 * @returns Random hex string
 */
const generateSecureRandomString = (length = 32) => {
    return crypto_1.default.randomBytes(length).toString('hex');
};
exports.generateSecureRandomString = generateSecureRandomString;
//# sourceMappingURL=jwt.util.js.map