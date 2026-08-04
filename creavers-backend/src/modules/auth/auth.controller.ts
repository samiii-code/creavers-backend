import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { asyncHandler } from '../../utils/asyncHandler';

export class AuthController {
  /**
   * Controller handler for POST /api/auth/login
   */
  public static login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const result = await AuthService.login(req.body);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  });
}
