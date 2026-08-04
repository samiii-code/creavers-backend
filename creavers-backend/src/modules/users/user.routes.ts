import { Router } from 'express';
import { UserController } from './user.controller';
import { validate } from '../../middleware/validate.middleware';
import { registerUserSchema, getUserByIdSchema } from './user.validation';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Role:
 *       type: string
 *       enum: [CUSTOMER, PROVIDER, ADMIN]
 *       default: CUSTOMER
 *     RegisterUserDTO:
 *       type: object
 *       required:
 *         - fullName
 *         - phone
 *         - password
 *       properties:
 *         fullName:
 *           type: string
 *           example: John Doe
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         email:
 *           type: string
 *           format: email
 *           nullable: true
 *           example: john.doe@example.com
 *         password:
 *           type: string
 *           format: password
 *           minLength: 6
 *           example: "SecretP@ss123"
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         fullName:
 *           type: string
 *           example: John Doe
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *         email:
 *           type: string
 *           nullable: true
 *           example: john.doe@example.com
 *         role:
 *           $ref: '#/components/schemas/Role'
 *         isVerified:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     ApiResponseUser:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: User registered successfully
 *         data:
 *           $ref: '#/components/schemas/UserResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 *     ApiResponseUserList:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Users retrieved successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
 *         timestamp:
 *           type: string
 *           format: date-time
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Error description message
 *         timestamp:
 *           type: string
 *           format: date-time
 */

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserDTO'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       400:
 *         description: Validation failure or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: User with email or phone already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/register', validate(registerUserSchema), UserController.register);

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUserList'
 */
router.get('/', UserController.getUsers);

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The UUID of the user to retrieve
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseUser'
 *       400:
 *         description: Invalid UUID format
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', validate(getUserByIdSchema), UserController.getUserById);

export default router;
