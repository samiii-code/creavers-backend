import { PrismaClient } from '@prisma/client';
import { config } from './env';
import { logger } from './logger';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: config.isProduction ? ['error'] : ['error'],
  });

if (!config.isProduction) {
  global.prisma = prisma;
}

/**
 * Utility function to test active PostgreSQL database connection.
 * @returns Promise<boolean> true if connected, false otherwise
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    return false;
  }
};

export const connectDB = async (): Promise<void> => {
  const isConnected = await checkDatabaseConnection();
  if (isConnected) {
    logger.info('PostgreSQL Database connected successfully via Prisma');
  } else {
    logger.warn('PostgreSQL Database is unreachable. Running in offline mode.');
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await prisma.$disconnect();
  } catch {
    // Ignore disconnect errors
  }
};
