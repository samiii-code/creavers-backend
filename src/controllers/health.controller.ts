import { Request, Response } from 'express';
import { HealthService } from '../services/health.service';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Database Health Check
 *     description: Checks active PostgreSQL database connection using Prisma ORM.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Database is connected and operational.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Database Connected
 *       500:
 *         description: Database connection failed or unreachable.
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Database Failed
 */
export const getHealthStatus = asyncHandler(async (_req: Request, res: Response) => {
  const result = await HealthService.getHealthStatus();
  const statusCode = result === 'Database Connected' ? 200 : 500;
  res.status(statusCode).send(result);
});
