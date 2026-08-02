// Shared TypeScript types, interfaces, and module declarations

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
  timestamp?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export * from './user.types';
