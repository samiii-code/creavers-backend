import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from '../utils/appError';
import { JWTPayload } from '../modules/auth/auth.types';

/**
 * Middleware to authenticate requests via JWT access token.
 * Verifies token, decodes payload, and attaches authenticated user to req.user.
 */
export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication token missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError('Authentication token missing', 401);
    }

    const decoded = jwt.verify(token, config.jwtSecret) as JWTPayload;

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      next(new AppError('Invalid or expired authentication token', 401));
    } else {
      next(error);
    }
  }
};
