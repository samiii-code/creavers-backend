/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     CreateCategoryInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Electronics"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Gadgets and electronic equipment"
 *     UpdateCategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           example: "Home & Electronics"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Updated category description"
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         name:
 *           type: string
 *           example: "Electronics"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Gadgets and electronic equipment"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-04T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-08-04T10:00:00.000Z"
 *     ApiResponseCategory:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Category retrieved successfully"
 *         data:
 *           $ref: '#/components/schemas/CategoryResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 *     ApiResponseCategoryList:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Categories retrieved successfully"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CategoryResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 */

export const categorySwaggerDoc = {};
