import { prisma } from '../../config/database';
import { AppError } from '../../utils/appError';
import { ProviderProfileResponse } from '../providers/provider.types';

export class AdminService {
  /**
   * Get all pending provider profiles requiring approval.
   */
  public static async getPendingProviders(): Promise<ProviderProfileResponse[]> {
    return prisma.providerProfile.findMany({
      where: { status: 'PENDING' },
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
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Get all provider profiles regardless of status.
   */
  public static async getAllProviders(): Promise<ProviderProfileResponse[]> {
    return prisma.providerProfile.findMany({
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
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Approve a provider profile (set status to APPROVED).
   */
  public static async approveProvider(id: string): Promise<ProviderProfileResponse> {
    const profile = await prisma.providerProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new AppError('Provider profile not found', 404);
    }

    return prisma.providerProfile.update({
      where: { id },
      data: { status: 'APPROVED' },
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
  }

  /**
   * Reject a provider profile (set status to REJECTED).
   */
  public static async rejectProvider(id: string): Promise<ProviderProfileResponse> {
    const profile = await prisma.providerProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new AppError('Provider profile not found', 404);
    }

    return prisma.providerProfile.update({
      where: { id },
      data: { status: 'REJECTED' },
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
  }
}
