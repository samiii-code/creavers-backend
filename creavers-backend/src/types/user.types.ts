import { Role } from '@prisma/client';

export interface CreateUserDTO {
  fullName: string;
  phone: string;
  email?: string;
  password: string;
  role?: Role;
}

export interface UserResponse {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  role: Role;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
