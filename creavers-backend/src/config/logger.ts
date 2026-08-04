import fs from 'fs';
import path from 'path';
import winston from 'winston';
import morgan from 'morgan';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom log formats
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${level}] [${timestamp}] ${message}${metaStr}`;
  })
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${level.toUpperCase()}] [${timestamp}] ${message}${metaStr}`;
  })
);

/**
 * Production-ready Winston Logger instance
 */
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      format: fileFormat,
    }),
  ],
});

/**
 * Morgan HTTP request logging middleware
 */
export const httpLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res) || 'GET';
  const url = tokens.url(req, res) || '/';
  const status = tokens.status(req, res) || '200';
  const responseTime = tokens['response-time'](req, res) || '0';

  const logMessage = `${method} ${url} ${status} - ${responseTime}ms`;
  logger.info(`[HTTP] ${logMessage}`);
  return null;
});

