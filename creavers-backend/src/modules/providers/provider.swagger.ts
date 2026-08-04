/**
 * @openapi
 * components:
 *   schemas:
 *     ProviderStatus:
 *       type: string
 *       enum: [PENDING, APPROVED, REJECTED]
 *       default: PENDING
 *     CreateProviderProfileInput:
 *       type: object
 *       required:
 *         - categoryId
 *         - experienceYears
 *       properties:
 *         categoryId:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         experienceYears:
 *           type: integer
 *           minimum: 0
 *           example: 5
 *         bio:
 *           type: string
 *           example: "Experienced plumbing and electrical expert."
 *         serviceArea:
 *           type: string
 *           example: "Downtown & Suburbs"
 *         availability:
 *           type: string
 *           example: "Mon-Fri 8am-6pm"
 *         nationalId:
 *           type: string
 *           example: "ID-987654321"
 *         profilePhoto:
 *           type: string
 *           example: "https://example.com/photos/provider1.jpg"
 *         licenseDocument:
 *           type: string
 *           example: "https://example.com/docs/license1.pdf"
 *     UpdateProviderProfileInput:
 *       type: object
 *       properties:
 *         categoryId:
 *           type: string
 *           format: uuid
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         experienceYears:
 *           type: integer
 *           minimum: 0
 *           example: 6
 *         bio:
 *           type: string
 *           example: "Updated bio description"
 *         serviceArea:
 *           type: string
 *           example: "Greater Metropolitan Area"
 *         availability:
 *           type: string
 *           example: "24/7 Emergency Service"
 *         nationalId:
 *           type: string
 *           example: "ID-987654321"
 *         profilePhoto:
 *           type: string
 *           example: "https://example.com/photos/provider1_new.jpg"
 *         licenseDocument:
 *           type: string
 *           example: "https://example.com/docs/license1_renewed.pdf"
 *     ProviderProfileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "p1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         userId:
 *           type: string
 *           format: uuid
 *           example: "u1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         categoryId:
 *           type: string
 *           format: uuid
 *           example: "c1b2c3d4-e5f6-7890-abcd-ef1234567890"
 *         experienceYears:
 *           type: integer
 *           example: 5
 *         bio:
 *           type: string
 *           nullable: true
 *           example: "Experienced plumbing expert"
 *         serviceArea:
 *           type: string
 *           nullable: true
 *           example: "Downtown"
 *         availability:
 *           type: string
 *           nullable: true
 *           example: "Mon-Fri 8am-6pm"
 *         nationalId:
 *           type: string
 *           nullable: true
 *           example: "ID-987654321"
 *         profilePhoto:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/photos/provider1.jpg"
 *         licenseDocument:
 *           type: string
 *           nullable: true
 *           example: "https://example.com/docs/license.pdf"
 *         status:
 *           $ref: '#/components/schemas/ProviderStatus'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ApiResponseProviderProfile:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Provider profile retrieved successfully
 *         data:
 *           $ref: '#/components/schemas/ProviderProfileResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 */

export const providerSwaggerDoc = {};
