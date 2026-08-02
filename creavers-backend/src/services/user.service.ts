import bcrypt from 'bcryptjs';
import { UserModel } from '../models/user.model';
import { CreateUserDTO, UserResponse } from '../types/user.types';

export class UserService {
  public static async registerUser(dto: CreateUserDTO): Promise<UserResponse> {
    const { fullName, phone, email, password, role } = dto;

    if (!fullName || !phone || !password) {
      const error: any = new Error('Full name, phone, and password are required fields');
      error.statusCode = 400;
      throw error;
    }

    if (email) {
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        const error: any = new Error('User with this email already exists');
        error.statusCode = 409;
        throw error;
      }
    }

    // Hash password with bcrypt (10 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await UserModel.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
      role,
    });

    return newUser;
  }

  public static async getAllUsers(): Promise<UserResponse[]> {
    return UserModel.findAll();
  }

  public static async getUserById(id: string): Promise<UserResponse> {
    const user = await UserModel.findById(id);
    if (!user) {
      const error: any = new Error(`User with ID '${id}' not found`);
      error.statusCode = 404;
      throw error;
    }
    return user;
  }
}
