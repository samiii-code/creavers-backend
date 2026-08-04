import { Request, Response } from 'express';
import { ProviderService } from './provider.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendResponse } from '../../utils/apiResponse';
import { AppError } from '../../utils/appError';

export class ProviderController {
  /**
   * Controller to handle POST /api/providers/profile (Create own profile)
   */
  public static createProfile = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Authentication required', 401);
      }

      const profile = await ProviderService.createProfile(userId, req.body);
      sendResponse(res, 201, 'Provider profile created successfully', profile);
    }
  );

  /**
   * Controller to handle GET /api/providers/profile (View own profile)
   */
  public static getOwnProfile = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Authentication required', 401);
      }

      const profile = await ProviderService.getOwnProfile(userId);
      sendResponse(res, 200, 'Provider profile retrieved successfully', profile);
    }
  );

  /**
   * Controller to handle GET /api/providers/profile/:id (View profile by ID)
   */
  public static getProfileById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const profile = await ProviderService.getProfileById(id);
      sendResponse(res, 200, 'Provider profile retrieved successfully', profile);
    }
  );

  /**
   * Controller to handle PUT /api/providers/profile (Update own profile)
   */
  public static updateOwnProfile = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Authentication required', 401);
      }

      const profile = await ProviderService.updateOwnProfile(userId, req.body);
      sendResponse(res, 200, 'Provider profile updated successfully', profile);
    }
  );
}
