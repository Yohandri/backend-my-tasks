/**
 * JWT Utility Module
 * 
 * Provides JWT token generation and validation functionality.
 */

import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * String value type for JWT expiration (e.g., "24h", "7d")
 */
export type StringValue = string & { __brand: 'StringValue' };

/**
 * JWT configuration options
 */
export interface JwtConfig {
    secret: string;
    expiresIn: string;
}

/**
 * JWT payload structure
 */
export interface JwtPayload {
    userId: string;
    email: string;
    iat?: number;
    exp?: number;
}

/**
 * JWT token response
 */
export interface TokenResponse {
    token: string;
    expiresIn: string;
}

/**
 * Get JWT configuration from environment variables
 * 
 * @returns JWT configuration object
 * @throws Error if required environment variables are missing
 */
export const getJwtConfig = (): JwtConfig => {
    const secret = process.env['JWT_SECRET'];
    const expiresIn = process.env['JWT_EXPIRATION'] || '24h';

    if (!secret) {
        throw new Error('JWT_SECRET environment variable is not set');
    }

    return { secret, expiresIn };
};

/**
 * Generate a JWT token for a user
 * 
 * @param userId - User ID to include in the token
 * @param email - User email to include in the token
 * @returns Token response with token and expiration time
 */
export const generateToken = (userId: string, email: string): TokenResponse => {
    const config = getJwtConfig();

    const payload: JwtPayload = {
        userId,
        email,
    };

    const token = jwt.sign(payload, config.secret, {
        expiresIn: config.expiresIn,
    } as SignOptions);

    return {
        token,
        expiresIn: config.expiresIn,
    };
};

/**
 * Verify and decode a JWT token
 * 
 * @param token - JWT token to verify
 * @returns Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export const verifyToken = (token: string): JwtPayload => {
    const config = getJwtConfig();
    return jwt.verify(token, config.secret) as JwtPayload;
};

/**
 * Decode a token without verification (for reading purposes only)
 * 
 * @param token - JWT token to decode
 * @returns Decoded payload or null if invalid
 */
export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwt.decode(token) as JwtPayload;
    } catch {
        return null;
    }
};

/**
 * Check if a token is expired
 * 
 * @param token - JWT token to check
 * @returns True if the token is expired
 */
export const isTokenExpired = (token: string): boolean => {
    const payload = decodeToken(token);
    
    if (!payload || !payload.exp) {
        return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
};

/**
 * Get token expiration time in milliseconds
 * 
 * @param token - JWT token to check
 * @returns Expiration time in milliseconds or null if invalid
 */
export const getTokenExpiration = (token: string): number | null => {
    const payload = decodeToken(token);
    
    if (!payload || !payload.exp) {
        return null;
    }

    return payload.exp * 1000;
};

/**
 * Generate a secure random string
 * Useful for generating unique IDs or secrets
 * 
 * @param length - Length of the random string
 * @returns Random hex string
 */
export const generateSecureRandomString = (length: number = 32): string => {
    return crypto.randomBytes(length).toString('hex');
};
