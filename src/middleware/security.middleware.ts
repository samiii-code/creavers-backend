import helmet from 'helmet';
import cors from 'cors';
import { config } from '../config/env';

export const helmetSecurity = helmet({
  contentSecurityPolicy: false, // Disabled CSP to allow Swagger UI inline assets
  crossOriginEmbedderPolicy: false,
});

export const corsSecurity = cors({
  origin: config.corsOrigin === '*' ? '*' : config.corsOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
});
