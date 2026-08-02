import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { LoginDTO, AuthResponse, JWTPayload } from '../types/auth.types';
import { UserResponse } from '../types/user.types';
import { config } from '../config/env';

export class AuthService {
  /**
   * Validates minimum password length requirement (>= 8 chars)
   */
  public static validatePassword(password: string): void {
    if (!password || password.length < 8) {
      const error: any = new Error('Password must be at least 8 characters long');
      error.statusCode = 400;
      throw error;
    }
  }

  /**
   * Hashes plain password using bcrypt (10 rounds) after validation
   */
  public static async hashPassword(password: string): Promise<string> {
    this.validatePassword(password);
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares plain text password against stored bcrypt hash
   */
  public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Signs a JWT authentication token
   */
  public static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: '7d',
    });
  }

  /**
   * Authenticates a user by Phone or Email and Password
   */
  public static async login(dto: LoginDTO): Promise<AuthResponse> {
    const identifier = dto.identifier || dto.phone || dto.email;
    const { password } = dto;

    if (!identifier || !password) {
      const error: any = new Error('Please provide email/phone and password');
      error.statusCode = 400;
      throw error;
    }

    // Find user by phone or email
    const user = await UserModel.findByIdentifier(identifier);
    if (!user) {
      const error: any = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Verify password against stored hash
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      const error: any = new Error('Invalid credentials');
      error.statusCode = 401;
      throw error;
    }

    // Generate JWT Token
    const token = this.generateToken({
      id: user.id,
      role: user.role,
    });

    // Exclude password from returned user object
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
