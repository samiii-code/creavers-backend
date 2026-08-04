import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate.middleware';
import { providerIdSchema } from '../providers/provider.validation';
import './admin.swagger';

const router = Router();

// Apply global ADMIN authentication and authorization to all admin routes
router.use(authenticate, authorize('ADMIN'));

/**
 * @openapi
 * /api/admin/providers/pending:
 *   get:
 *     summary: Retrieve all pending provider profiles (ADMIN only)
 *     tags:
 *       - Admin Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pending provider profiles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfileList'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - ADMIN role required
 */
router.get('/providers/pending', AdminController.getPendingProviders);

/**
 * @openapi
 * /api/admin/providers:
 *   get:
 *     summary: Retrieve all provider profiles (ADMIN only)
 *     tags:
 *       - Admin Management
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All provider profiles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfileList'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - ADMIN role required
 */
router.get('/providers', AdminController.getAllProviders);

/**
 * @openapi
 * /api/admin/providers/{id}/approve:
 *   patch:
 *     summary: Approve a provider profile (ADMIN only)
 *     tags:
 *       - Admin Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider Profile ID
 *     responses:
 *       200:
 *         description: Provider profile approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - ADMIN role required
 *       404:
 *         description: Provider profile not found
 */
router.patch(
  '/providers/:id/approve',
  validate(providerIdSchema),
  AdminController.approveProvider
);

/**
 * @openapi
 * /api/admin/providers/{id}/reject:
 *   patch:
 *     summary: Reject a provider profile (ADMIN only)
 *     tags:
 *       - Admin Management
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider Profile ID
 *     responses:
 *       200:
 *         description: Provider profile rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - ADMIN role required
 *       404:
 *         description: Provider profile not found
 */
router.patch(
  '/providers/:id/reject',
  validate(providerIdSchema),
  AdminController.rejectProvider
);

export default router;
