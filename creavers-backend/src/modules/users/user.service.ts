import bcrypt from 'bcryptjs';
import { prisma } from '../../config/database';
import { AppError } from '../../utils/appError';
import { CreateUserDTO, UserResponse, Role } from './user.types';

export class UserService {
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

  /**
   * Register a new user in the database after hashing the password.
   */
  public static async registerUser(dto: CreateUserDTO): Promise<UserResponse> {
    const { fullName, phone, email, password, role } = dto;

    // Check if phone is already registered
    const existingPhoneUser = await prisma.user.findFirst({
      where: { phone },
    });
    if (existingPhoneUser) {
      throw new AppError('User with this phone number already exists', 409);
    }

    // Check if email is provided and already registered
    if (email && email.trim() !== '') {
      const existingEmailUser = await prisma.user.findUnique({
        where: { email: email.trim() },
      });
      if (existingEmailUser) {
        throw new AppError('User with this email address already exists', 409);
      }
    }

    // Hash password with bcryptjs
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user record using Prisma Client
    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email && email.trim() !== '' ? email.trim() : null,
        password: hashedPassword,
        role: role || Role.CUSTOMER,
      },
      select: UserService.userSelect,
    });

    return user;
  }

  /**
   * Retrieve all users ordered by creation date (newest first).
   */
  public static async getAllUsers(): Promise<UserResponse[]> {
    const users = await prisma.user.findMany({
      select: UserService.userSelect,
      orderBy: { createdAt: 'desc' },
    });
    return users;
  }

  /**
   * Retrieve a user by their unique ID.
   */
  public static async getUserById(id: string): Promise<UserResponse> {
    const user = await prisma.user.findUnique({
      where: { id },
      select: UserService.userSelect,
    });

    if (!user) {
      throw new AppError(`User with ID '${id}' not found`, 404);
    }

    return user;
  }
}
