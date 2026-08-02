import { Response } from 'express';
import { ApiResponse } from '../types';

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response => {
  const responsePayload: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
  return res.status(statusCode).json(responsePayload);
};
