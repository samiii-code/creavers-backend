import { Role, UserResponse } from '../users/user.types';

export interface LoginDTO {
  email?: string;
  phone?: string;
  identifier?: string;
  password: string;
}

export interface JWTPayload {
  userId: string;
  role: Role;
  phone: string;
}

export interface LoginResponse {
  token: string;
  user: UserResponse;
}

export interface AuthSuccessResponse {
  success: boolean;
  message: string;
  token: string;
  user: UserResponse;
}
