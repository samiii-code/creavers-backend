import { Role } from '@prisma/client';

export { Role };

export interface CreateUserDTO {
  fullName: string;
  phone: string;
  email?: string | null;
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

export interface GetUserByIdParams {
  id: string;
}
