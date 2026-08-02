import { Request, Response } from 'express';
import { getIndexMessage } from '../services/index.service';

/**
 * @openapi
 * /:
 *   get:
 *     summary: Root Index Endpoint
 *     description: Returns current operational status of the Creavers backend.
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: Server is running successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Creavers Backend Running
 */
export const getIndex = (_req: Request, res: Response): Response => {
  const result = getIndexMessage();
  return res.status(200).json(result);
};
