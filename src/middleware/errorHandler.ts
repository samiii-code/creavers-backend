import { Request, Response, NextFunction } from 'express';
import { config } from '../config/env';
import { logger } from '../config/logger';
import { AppError } from '../utils/appError';

export const globalErrorHandler = (
  err: Error | AppError | any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`[${statusCode}] ${message}`, err.stack);

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isProduction ? {} : { stack: err.stack }),
    timestamp: new Date().toISOString(),
  });
};

export { globalErrorHandler as errorHandler };
