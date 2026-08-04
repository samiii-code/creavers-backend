import { Router } from 'express';
import { CategoryController } from './category.controller';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { validate } from '../../middleware/validate.middleware';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryParamSchema,
} from './category.validation';
import './category.swagger';

const router = Router();

/**
 * @openapi
 * /api/categories:
 *   post:
 *     summary: Create a new category (ADMIN only)
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseCategory'
 *       400:
 *         description: Validation error or category already exists
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - ADMIN role required
 */
router.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  validate(createCategorySchema),
  CategoryController.createCategory
);

/**
 * @openapi
 * /api/categories:
 *   get:
 *     summary: Retrieve all categories (Public)
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseCategoryList'
 */
router.get('/', CategoryController.getAllCategories);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     summary: Get category by ID (Public)
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseCategory'
 *       404:
 *         description: Category not found
 */
router.get('/:id', validate(categoryParamSchema), CategoryController.getCategoryById);

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     summary: Update an existing category (ADMIN only)
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCategoryInput'
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseCategory'
 *       400:
 *         description: Validation error or duplicate category name
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - ADMIN role required
 *       404:
 *         description: Category not found
 */
router.put(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(updateCategorySchema),
  CategoryController.updateCategory
);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID (ADMIN only)
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseCategory'
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       403:
 *         description: Forbidden - ADMIN role required
 *       404:
 *         description: Category not found
 */
router.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  validate(categoryParamSchema),
  CategoryController.deleteCategory
);

export default router;
