import { Request, Response } from 'express';
import { CategoryService } from './category.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendResponse } from '../../utils/apiResponse';

export class CategoryController {
  /**
   * Controller to handle POST /api/categories
   */
  public static createCategory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const category = await CategoryService.createCategory(req.body);
      sendResponse(res, 201, 'Category created successfully', category);
    }
  );

  /**
   * Controller to handle GET /api/categories
   */
  public static getAllCategories = asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const categories = await CategoryService.getAllCategories();
      sendResponse(res, 200, 'Categories retrieved successfully', categories);
    }
  );

  /**
   * Controller to handle GET /api/categories/:id
   */
  public static getCategoryById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const category = await CategoryService.getCategoryById(id);
      sendResponse(res, 200, 'Category retrieved successfully', category);
    }
  );

  /**
   * Controller to handle PUT /api/categories/:id
   */
  public static updateCategory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const category = await CategoryService.updateCategory(id, req.body);
      sendResponse(res, 200, 'Category updated successfully', category);
    }
  );

  /**
   * Controller to handle DELETE /api/categories/:id
   */
  public static deleteCategory = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const category = await CategoryService.deleteCategory(id);
      sendResponse(res, 200, 'Category deleted successfully', category);
    }
  );
}
