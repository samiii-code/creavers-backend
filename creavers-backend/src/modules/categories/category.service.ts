import { prisma } from '../../config/database';
import { AppError } from '../../utils/appError';
import { CreateCategoryDTO, UpdateCategoryDTO, CategoryResponse } from './category.types';

export class CategoryService {
  /**
   * Create a new Category
   */
  public static async createCategory(dto: CreateCategoryDTO): Promise<CategoryResponse> {
    const existingCategory = await prisma.category.findUnique({
      where: { name: dto.name },
    });

    if (existingCategory) {
      throw new AppError('Category with this name already exists', 400);
    }

    const category = await prisma.category.create({
      data: {
        name: dto.name,
        description: dto.description || null,
      },
    });

    return category;
  }

  /**
   * Retrieve all categories
   */
  public static async getAllCategories(): Promise<CategoryResponse[]> {
    return prisma.category.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Retrieve a single category by ID
   */
  public static async getCategoryById(id: string): Promise<CategoryResponse> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    return category;
  }

  /**
   * Update an existing category by ID
   */
  public static async updateCategory(
    id: string,
    dto: UpdateCategoryDTO
  ): Promise<CategoryResponse> {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new AppError('Category not found', 404);
    }

    if (dto.name && dto.name !== existingCategory.name) {
      const duplicateCategory = await prisma.category.findUnique({
        where: { name: dto.name },
      });

      if (duplicateCategory) {
        throw new AppError('Category with this name already exists', 400);
      }
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });

    return updatedCategory;
  }

  /**
   * Delete a category by ID
   */
  public static async deleteCategory(id: string): Promise<CategoryResponse> {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new AppError('Category not found', 404);
    }

    return prisma.category.delete({
      where: { id },
    });
  }
}
