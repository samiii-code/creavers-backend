import { Request, Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { AppError } from '../utils/appError';

/**
 * Middleware to authorize access based on user roles.
 * Usage: authorize("ADMIN"), authorize("ADMIN", "PROVIDER")
 * Returns 403 if the authenticated user lacks permission.
 */
export const authorize = (...allowedRoles: Role[] | string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('User is not authenticated', 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Forbidden: Insufficient permissions', 403));
    }

    next();
  };
};
