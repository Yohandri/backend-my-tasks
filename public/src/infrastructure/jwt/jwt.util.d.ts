/**
 * JWT Utility Module
 *
 * Provides JWT token generation and validation functionality.
 */
/**
 * String value type for JWT expiration (e.g., "24h", "7d")
 */
export type StringValue = string & {
    __brand: 'StringValue';
};
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
export declare const getJwtConfig: () => JwtConfig;
/**
 * Generate a JWT token for a user
 *
 * @param userId - User ID to include in the token
 * @param email - User email to include in the token
 * @returns Token response with token and expiration time
 */
export declare const generateToken: (userId: string, email: string) => TokenResponse;
/**
 * Verify and decode a JWT token
 *
 * @param token - JWT token to verify
 * @returns Decoded payload if valid
 * @throws Error if token is invalid or expired
 */
export declare const verifyToken: (token: string) => JwtPayload;
/**
 * Decode a token without verification (for reading purposes only)
 *
 * @param token - JWT token to decode
 * @returns Decoded payload or null if invalid
 */
export declare const decodeToken: (token: string) => JwtPayload | null;
/**
 * Check if a token is expired
 *
 * @param token - JWT token to check
 * @returns True if the token is expired
 */
export declare const isTokenExpired: (token: string) => boolean;
/**
 * Get token expiration time in milliseconds
 *
 * @param token - JWT token to check
 * @returns Expiration time in milliseconds or null if invalid
 */
export declare const getTokenExpiration: (token: string) => number | null;
/**
 * Generate a secure random string
 * Useful for generating unique IDs or secrets
 *
 * @param length - Length of the random string
 * @returns Random hex string
 */
export declare const generateSecureRandomString: (length?: number) => string;
//# sourceMappingURL=jwt.util.d.ts.map