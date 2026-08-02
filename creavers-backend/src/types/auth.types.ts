import { Role } from '@prisma/client';
import { UserResponse } from './user.types';

export interface LoginDTO {
  identifier?: string;
  email?: string;
  phone?: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface JWTPayload {
  id: string;
  role: Role;
}
