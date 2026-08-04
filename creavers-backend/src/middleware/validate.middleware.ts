import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * Higher-order middleware function to validate Express request data against Zod schema.
 * Supports validating req.body, req.query, and req.params.
 */
export const validate =
  (schema: ZodSchema) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
