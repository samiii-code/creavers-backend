import { Request, Response } from 'express';
import { UserService } from './user.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendResponse } from '../../utils/apiResponse';

export class UserController {
  /**
   * Controller to handle POST /api/users/register
   */
  public static register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await UserService.registerUser(req.body);
    sendResponse(res, 201, 'User registered successfully', user);
  });

  /**
   * Controller to handle GET /api/users
   */
  public static getUsers = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await UserService.getAllUsers();
    sendResponse(res, 200, 'Users retrieved successfully', users);
  });

  /**
   * Controller to handle GET /api/users/:id
   */
  public static getUserById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await UserService.getUserById(id);
    sendResponse(res, 200, 'User retrieved successfully', user);
  });
}
