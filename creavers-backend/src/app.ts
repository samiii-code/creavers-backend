import express, { Application } from 'express';
import {
  helmetSecurity,
  corsSecurity,
  compressionMiddleware,
  globalRateLimiter,
  requestLogger,
  notFoundHandler,
  globalErrorHandler,
} from './middleware';
import { setupSwagger } from './config/swagger';
import routes from './routes';

const app: Application = express();

// Security Middlewares
app.use(helmetSecurity);
app.use(corsSecurity);

// Body Parsing & Compression Middlewares
app.use(compressionMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging & Rate Limiting Middlewares
app.use(requestLogger);
app.use('/api', globalRateLimiter);

// OpenAPI Swagger Documentation
setupSwagger(app);

// Application Routes (includes GET / & GET /health)
app.use('/', routes);
app.use('/api', routes);
app.use('/api/v1', routes);


// 404 Not Found & Global Exception Middlewares
app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
