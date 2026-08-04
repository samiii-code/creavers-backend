/**
 * @openapi
 * components:
 *   schemas:
 *     ApiResponseProviderProfileList:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Provider profiles retrieved successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProviderProfileResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 */

export const adminSwaggerDoc = {};
