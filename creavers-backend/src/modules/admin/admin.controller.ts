import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendResponse } from '../../utils/apiResponse';

export class AdminController {
  /**
   * Controller to handle GET /api/admin/providers/pending
   */
  public static getPendingProviders = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const providers = await AdminService.getPendingProviders();
      sendResponse(res, 200, 'Pending provider profiles retrieved successfully', providers);
    }
  );

  /**
   * Controller to handle GET /api/admin/providers
   */
  public static getAllProviders = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const providers = await AdminService.getAllProviders();
      sendResponse(res, 200, 'All provider profiles retrieved successfully', providers);
    }
  );

  /**
   * Controller to handle PATCH /api/admin/providers/:id/approve
   */
  public static approveProvider = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const provider = await AdminService.approveProvider(id);
      sendResponse(res, 200, 'Provider profile approved successfully', provider);
    }
  );

  /**
   * Controller to handle PATCH /api/admin/providers/:id/reject
   */
  public static rejectProvider = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const provider = await AdminService.rejectProvider(id);
      sendResponse(res, 200, 'Provider profile rejected successfully', provider);
    }
  );
}
