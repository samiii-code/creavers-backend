import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { config } from '../../config/env';
import { AppError } from '../../utils/appError';
import { LoginDTO, LoginResponse, JWTPayload } from './auth.types';
import { UserResponse } from '../users/user.types';

export class AuthService {
  /**
   * Generates a 7-day JWT access token containing userId, role, and phone.
   */
  public static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '7d',
    });
  }

  /**
   * Authenticate user with Email or Phone and Password.
   */
  public static async login(dto: LoginDTO): Promise<LoginResponse> {
    const rawIdentifier = (dto.identifier || dto.phone || dto.email || '').trim();
    const { password } = dto;

    if (!rawIdentifier || !password) {
      throw new AppError('Email or phone number and password are required', 400);
    }

    // Query database for matching user by email or phone
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: rawIdentifier },
          { phone: rawIdentifier },
        ],
      },
    });

    // Handle User Not Found -> HTTP 404
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Handle Unverified User -> HTTP 403
    if (!user.isVerified) {
      throw new AppError('User account is not verified', 403);
    }

    // Verify hashed password using bcrypt -> HTTP 401
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate JWT payload with userId, role, and phone
    const token = this.generateToken({
      userId: user.id,
      role: user.role,
      phone: user.phone,
    });

    // Omit password from user response object
    const userResponse: UserResponse = {
      id: user.id,
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return {
      token,
      user: userResponse,
    };
  }
}
