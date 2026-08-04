import { z } from 'zod';

/**
 * Zod schema for login endpoint validation.
 * Ensures either email, phone, or identifier is provided alongside password.
 */
export const loginSchema = z.object({
  body: z
    .object({
      email: z
        .string()
        .trim()
        .email('Invalid email address format')
        .optional()
        .or(z.literal('')),

      phone: z
        .string()
        .trim()
        .min(3, 'Phone number must be at least 3 characters long')
        .optional()
        .or(z.literal('')),

      identifier: z
        .string()
        .trim()
        .min(1, 'Identifier cannot be empty')
        .optional()
        .or(z.literal('')),

      password: z
        .string()
        .min(1, 'Password is required'),
    })
    .refine(
      (data) =>
        (data.email && data.email.trim() !== '') ||
        (data.phone && data.phone.trim() !== '') ||
        (data.identifier && data.identifier.trim() !== ''),
      {
        message: 'Please provide an email or phone number to log in',
        path: ['identifier'],
      }
    ),
});

export type LoginValidationInput = z.infer<typeof loginSchema>['body'];
