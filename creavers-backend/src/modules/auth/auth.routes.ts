import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middleware/validate.middleware';
import { loginSchema } from './auth.validation';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@example.com
 *           description: Email address of the user (Either email or phone is required)
 *         phone:
 *           type: string
 *           example: "+1234567890"
 *           description: Phone number of the user (Either email or phone is required)
 *         password:
 *           type: string
 *           format: password
 *           example: "SecretP@ss123"
 *     LoginResponseData:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Login successful
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 */

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and generate JWT access token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDTO'
 *           examples:
 *             loginWithEmail:
 *               summary: Login using Email
 *               value:
 *                 email: john.doe@example.com
 *                 password: "SecretP@ss123"
 *             loginWithPhone:
 *               summary: Login using Phone Number
 *               value:
 *                 phone: "+1234567890"
 *                 password: "SecretP@ss123"
 *     responses:
 *       200:
 *         description: Login successful. Returns JWT token and user profile.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponseData'
 *       400:
 *         description: Validation error or missing credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 - field: identifier
 *                   message: Please provide an email or phone number to log in
 *       401:
 *         description: Invalid credentials (wrong password)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Invalid credentials
 *       403:
 *         description: User account is unverified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User account is not verified
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User not found
 */
router.post('/login', validate(loginSchema), AuthController.login);

export default router;
