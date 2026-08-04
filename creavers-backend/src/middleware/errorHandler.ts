import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { config } from '../config/env';
import { logger } from '../config/logger';
import { AppError } from '../utils/appError';

export const globalErrorHandler = (
  err: Error | AppError | ZodError | any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ZodError) {
    const formattedErrors = err.issues.map((issue) => ({
      field: issue.path.filter((p) => p !== 'body' && p !== 'query' && p !== 'params').join('.'),
      message: issue.message,
    }));

    logger.warn(`[400] Validation Error: ${JSON.stringify(formattedErrors)}`);

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
      timestamp: new Date().toISOString(),
    });
    return;
  }

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
