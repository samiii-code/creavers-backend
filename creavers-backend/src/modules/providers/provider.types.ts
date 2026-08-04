import { ProviderStatus } from '@prisma/client';

export { ProviderStatus };

export interface CreateProviderProfileDTO {
  categoryId: string;
  experienceYears: number;
  bio?: string;
  serviceArea?: string;
  availability?: string;
  nationalId?: string;
  profilePhoto?: string;
  licenseDocument?: string;
}

export interface UpdateProviderProfileDTO {
  categoryId?: string;
  experienceYears?: number;
  bio?: string;
  serviceArea?: string;
  availability?: string;
  nationalId?: string;
  profilePhoto?: string;
  licenseDocument?: string;
}

export interface ProviderProfileResponse {
  id: string;
  userId: string;
  categoryId: string;
  experienceYears: number;
  bio: string | null;
  serviceArea: string | null;
  availability: string | null;
  nationalId: string | null;
  profilePhoto: string | null;
  licenseDocument: string | null;
  status: ProviderStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    fullName: string;
    phone: string;
    email: string | null;
  };
  category?: {
    id: string;
    name: string;
  };
}

export interface ProviderParamId {
  id: string;
}
