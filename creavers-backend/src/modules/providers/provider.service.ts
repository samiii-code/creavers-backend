import { prisma } from '../../config/database';
import { AppError } from '../../utils/appError';
import {
  CreateProviderProfileDTO,
  UpdateProviderProfileDTO,
  ProviderProfileResponse,
} from './provider.types';

export class ProviderService {
  /**
   * Create a Provider Profile for the authenticated provider.
   * Enforces 1-to-1 profile creation rule per user.
   */
  public static async createProfile(
    userId: string,
    dto: CreateProviderProfileDTO
  ): Promise<ProviderProfileResponse> {
    // Check if category exists
    const category = await prisma.category.findUnique({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    // Check if provider already has a profile
    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (existingProfile) {
      throw new AppError('Provider profile already exists for this user', 400);
    }

    const profile = await prisma.providerProfile.create({
      data: {
        userId,
        categoryId: dto.categoryId,
        experienceYears: dto.experienceYears,
        bio: dto.bio || null,
        serviceArea: dto.serviceArea || null,
        availability: dto.availability || null,
        nationalId: dto.nationalId || null,
        profilePhoto: dto.profilePhoto || null,
        licenseDocument: dto.licenseDocument || null,
        status: 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return profile;
  }

  /**
   * Get own Provider Profile for the authenticated user.
   */
  public static async getOwnProfile(userId: string): Promise<ProviderProfileResponse> {
    const profile = await prisma.providerProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!profile) {
      throw new AppError('Provider profile not found', 404);
    }

    return profile;
  }

  /**
   * Get Provider Profile by ID.
   */
  public static async getProfileById(id: string): Promise<ProviderProfileResponse> {
    const profile = await prisma.providerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!profile) {
      throw new AppError('Provider profile not found', 404);
    }

    return profile;
  }

  /**
   * Update own Provider Profile for the authenticated user.
   */
  public static async updateOwnProfile(
    userId: string,
    dto: UpdateProviderProfileDTO
  ): Promise<ProviderProfileResponse> {
    const existingProfile = await prisma.providerProfile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new AppError('Provider profile not found', 404);
    }

    if (dto.categoryId && dto.categoryId !== existingProfile.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: dto.categoryId },
      });

      if (!category) {
        throw new AppError('Category not found', 404);
      }
    }

    const updatedProfile = await prisma.providerProfile.update({
      where: { userId },
      data: {
        ...(dto.categoryId !== undefined && { categoryId: dto.categoryId }),
        ...(dto.experienceYears !== undefined && { experienceYears: dto.experienceYears }),
        ...(dto.bio !== undefined && { bio: dto.bio }),
        ...(dto.serviceArea !== undefined && { serviceArea: dto.serviceArea }),
        ...(dto.availability !== undefined && { availability: dto.availability }),
        ...(dto.nationalId !== undefined && { nationalId: dto.nationalId }),
        ...(dto.profilePhoto !== undefined && { profilePhoto: dto.profilePhoto }),
        ...(dto.licenseDocument !== undefined && { licenseDocument: dto.licenseDocument }),
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            phone: true,
            email: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedProfile;
  }
}
