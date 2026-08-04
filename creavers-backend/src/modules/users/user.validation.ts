import { z } from 'zod';
import { Role } from '@prisma/client';

/**
 * Zod schema for user registration validation
 */
export const registerUserSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .trim()
      .min(2, 'Full name must be at least 2 characters long'),

    phone: z
      .string()
      .trim()
      .min(5, 'Phone number must be at least 5 characters long'),

    email: z
      .string()
      .trim()
      .email('Invalid email address format')
      .optional()
      .nullable()
      .or(z.literal('')),

    password: z
      .string()
      .min(6, 'Password must be at least 6 characters long'),

    role: z
      .nativeEnum(Role)
      .optional()
      .default(Role.CUSTOMER),
  }),
});

/**
 * Zod schema for getting user by ID validation
 */
export const getUserByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .uuid('Invalid User ID format. Must be a valid UUID'),
  }),
});

export type RegisterUserValidationInput = z.infer<typeof registerUserSchema>['body'];
export type GetUserByIdValidationParams = z.infer<typeof getUserByIdSchema>['params'];
