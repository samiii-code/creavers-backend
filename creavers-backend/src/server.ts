import app from './app';
import { config } from './config/env';
import { connectDB, disconnectDB } from './config/database';
import { logger } from './config/logger';

// Catch uncaught synchronous exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', error);
  process.exit(1);
});

const startServer = async () => {
  try {
    // Attempt database connection
    await connectDB();

    const server = app.listen(config.port, () => {
      logger.info(`Server running in [${config.nodeEnv}] mode on port ${config.port}`);
      logger.info(`Swagger UI available at http://localhost:${config.port}/api-docs`);
    });

    // Catch unhandled async promise rejections
    process.on('unhandledRejection', (reason: unknown) => {
      logger.error('UNHANDLED REJECTION! Closing server...', reason);
      server.close(() => {
        process.exit(1);
      });
    });

    const handleShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await disconnectDB();
        logger.info('HTTP server and Database connection closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => handleShutdown('SIGTERM'));
    process.on('SIGINT', () => handleShutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
