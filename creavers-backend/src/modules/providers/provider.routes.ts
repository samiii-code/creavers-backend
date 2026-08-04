import { Router } from 'express';
import { ProviderController } from './provider.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate.middleware';
import {
  createProviderProfileSchema,
  updateProviderProfileSchema,
  providerIdSchema,
} from './provider.validation';
import './provider.swagger';

const router = Router();

/**
 * @openapi
 * /api/providers/profile:
 *   post:
 *     summary: Create provider profile (PROVIDER role only)
 *     tags:
 *       - Provider Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProviderProfileInput'
 *     responses:
 *       201:
 *         description: Provider profile created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       400:
 *         description: Profile already exists or validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - PROVIDER role required
 */
router.post(
  '/profile',
  authenticate,
  authorize('PROVIDER'),
  validate(createProviderProfileSchema),
  ProviderController.createProfile
);

/**
 * @openapi
 * /api/providers/profile:
 *   get:
 *     summary: Get own provider profile (PROVIDER role only)
 *     tags:
 *       - Provider Profiles
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - PROVIDER role required
 *       404:
 *         description: Profile not found
 */
router.get(
  '/profile',
  authenticate,
  authorize('PROVIDER'),
  ProviderController.getOwnProfile
);

/**
 * @openapi
 * /api/providers/profile/{id}:
 *   get:
 *     summary: Get provider profile by ID
 *     tags:
 *       - Provider Profiles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Provider Profile ID
 *     responses:
 *       200:
 *         description: Provider profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       404:
 *         description: Provider profile not found
 */
router.get(
  '/profile/:id',
  validate(providerIdSchema),
  ProviderController.getProfileById
);

/**
 * @openapi
 * /api/providers/profile:
 *   put:
 *     summary: Update own provider profile (PROVIDER role only)
 *     tags:
 *       - Provider Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProviderProfileInput'
 *     responses:
 *       200:
 *         description: Provider profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseProviderProfile'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - PROVIDER role required
 *       404:
 *         description: Profile not found
 */
router.put(
  '/profile',
  authenticate,
  authorize('PROVIDER'),
  validate(updateProviderProfileSchema),
  ProviderController.updateOwnProfile
);

export default router;
