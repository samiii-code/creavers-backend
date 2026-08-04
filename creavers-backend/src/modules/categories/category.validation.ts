import { z } from 'zod';

/**
 * Validation schema for creating a new category
 * - Category name: required, minimum 3 characters
 * - Description: optional
 */
export const createCategorySchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'Category name is required' })
      .trim()
      .min(3, 'Category name must be at least 3 characters long'),
    description: z.string().trim().optional(),
  }),
});

/**
 * Validation schema for updating an existing category
 */
export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string({ message: 'Category ID is required' }),
  }),
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, 'Category name must be at least 3 characters long')
      .optional(),
    description: z.string().trim().optional(),
  }),
});

/**
 * Validation schema for routes requiring a category ID parameter
 */
export const categoryParamSchema = z.object({
  params: z.object({
    id: z.string({ message: 'Category ID is required' }),
  }),
});

export type CreateCategoryValidationInput = z.infer<typeof createCategorySchema>['body'];
export type UpdateCategoryValidationInput = z.infer<typeof updateCategorySchema>['body'];
export type CategoryParamValidation = z.infer<typeof categoryParamSchema>['params'];
