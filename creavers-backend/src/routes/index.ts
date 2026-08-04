import { Router } from 'express';
import { getIndex } from '../controllers/index.controller';
import healthRoutes from './health.routes';
import userRoutes from '../modules/users/user.routes';
import authRoutes from '../modules/auth/auth.routes';

const router = Router();

// GET / -> Root index endpoint
router.get('/', getIndex);

// System health check routes
router.use('/health', healthRoutes);

// Authentication routes
router.use('/auth', authRoutes);

// User management routes
router.use('/users', userRoutes);

export default router;
