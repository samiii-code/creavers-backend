import { prisma } from '../config/database';
import { CreateUserDTO, UserResponse } from '../types/user.types';
import { Role, User } from '@prisma/client';

export class UserModel {
  private static userSelect = {
    id: true,
    fullName: true,
    phone: true,
    email: true,
    role: true,
    isVerified: true,
    createdAt: true,
    updatedAt: true,
  };

  public static async create(userData: CreateUserDTO & { password: string }): Promise<UserResponse> {
    return prisma.user.create({
      data: {
        fullName: userData.fullName,
        phone: userData.phone,
        email: userData.email || null,
        password: userData.password,
        role: userData.role || Role.CUSTOMER,
      },
      select: this.userSelect,
    });
  }

  public static async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  public static async findByPhone(phone: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { phone },
    });
  }

  public static async findByIdentifier(identifier: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: identifier },
        ],
      },
    });
  }

  public static async findById(id: string): Promise<UserResponse | null> {
    return prisma.user.findUnique({
      where: { id },
      select: this.userSelect,
    });
  }

  public static async findAll(): Promise<UserResponse[]> {
    return prisma.user.findMany({
      select: this.userSelect,
      orderBy: { createdAt: 'desc' },
    });
  }
}
