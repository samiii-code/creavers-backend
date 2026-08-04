import { z } from 'zod';

/**
 * Validation schema for creating a provider profile
 */
export const createProviderProfileSchema = z.object({
  body: z.object({
    categoryId: z
      .string({ message: 'Category ID is required' })
      .min(1, 'Category ID cannot be empty'),
    experienceYears: z
      .number({ message: 'Experience years is required and must be a number' })
      .int('Experience years must be an integer')
      .min(0, 'Experience years cannot be negative'),
    bio: z.string().trim().optional(),
    serviceArea: z.string().trim().optional(),
    availability: z.string().trim().optional(),
    nationalId: z.string().trim().optional(),
    profilePhoto: z.string().trim().optional(),
    licenseDocument: z.string().trim().optional(),
  }),
});

/**
 * Validation schema for updating a provider profile
 */
export const updateProviderProfileSchema = z.object({
  body: z.object({
    categoryId: z.string().min(1, 'Category ID cannot be empty').optional(),
    experienceYears: z
      .number()
      .int('Experience years must be an integer')
      .min(0, 'Experience years cannot be negative')
      .optional(),
    bio: z.string().trim().optional(),
    serviceArea: z.string().trim().optional(),
    availability: z.string().trim().optional(),
    nationalId: z.string().trim().optional(),
    profilePhoto: z.string().trim().optional(),
    licenseDocument: z.string().trim().optional(),
  }),
});

/**
 * Validation schema for provider ID path parameter
 */
export const providerIdSchema = z.object({
  params: z.object({
    id: z.string({ message: 'Provider profile ID is required' }),
  }),
});

export type CreateProviderProfileInput = z.infer<typeof createProviderProfileSchema>['body'];
export type UpdateProviderProfileInput = z.infer<typeof updateProviderProfileSchema>['body'];
