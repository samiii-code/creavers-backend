import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { asyncHandler } from '../utils/asyncHandler';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await UserService.registerUser(req.body);
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user,
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.status(200).json({
    success: true,
    data: users,
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await UserService.getUserById(id);
  res.status(200).json({
    success: true,
    data: user,
  });
});
