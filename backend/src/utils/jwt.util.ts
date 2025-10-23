import jwt from 'jsonwebtoken';
import config from '../config/env';

interface TokenPayload {
  id: string;
  email: string;
}

/**
 * Generate JWT token
 */
export const generateToken = (payload: TokenPayload): string => {
  // @ts-ignore - Type issue with jsonwebtoken, but works at runtime
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

