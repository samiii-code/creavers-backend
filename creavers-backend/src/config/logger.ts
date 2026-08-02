import fs from 'fs';
import path from 'path';
import morgan from 'morgan';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file write stream
const logFilePath = path.join(logsDir, 'app.log');
const logFileStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// ANSI Color Helpers
const RESET = '\x1b[0m';
const DIM = '\x1b[90m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';

const getStatusColor = (status: number): string => {
  if (status >= 500) return RED;
  if (status >= 400) return YELLOW;
  if (status >= 300) return CYAN;
  if (status >= 200) return GREEN;
  return RESET;
};

const getMethodColor = (method: string): string => {
  switch (method.toUpperCase()) {
    case 'GET':
      return CYAN;
    case 'POST':
      return GREEN;
    case 'PUT':
    case 'PATCH':
      return YELLOW;
    case 'DELETE':
      return RED;
    default:
      return MAGENTA;
  }
};

/**
 * Custom logger utility supporting colored terminal logs and disk persistence in logs/app.log
 */
export const logger = {
  info: (message: string, ...meta: unknown[]): void => {
    const timestamp = new Date().toISOString();
    const metaStr = meta.length ? ' ' + JSON.stringify(meta) : '';
    console.log(`${GREEN}[INFO]${RESET} ${DIM}[${timestamp}]${RESET} ${message}${metaStr}`);
    logFileStream.write(`[INFO] [${timestamp}] ${message}${metaStr}\n`);
  },
  warn: (message: string, ...meta: unknown[]): void => {
    const timestamp = new Date().toISOString();
    const metaStr = meta.length ? ' ' + JSON.stringify(meta) : '';
    console.warn(`${YELLOW}[WARN]${RESET} ${DIM}[${timestamp}]${RESET} ${message}${metaStr}`);
    logFileStream.write(`[WARN] [${timestamp}] ${message}${metaStr}\n`);
  },
  error: (message: string, ...meta: unknown[]): void => {
    const timestamp = new Date().toISOString();
    const metaStr = meta.length ? ' ' + JSON.stringify(meta) : '';
    console.error(`${RED}[ERROR]${RESET} ${DIM}[${timestamp}]${RESET} ${message}${metaStr}`);
    logFileStream.write(`[ERROR] [${timestamp}] ${message}${metaStr}\n`);
  },
  debug: (message: string, ...meta: unknown[]): void => {
    const timestamp = new Date().toISOString();
    const metaStr = meta.length ? ' ' + JSON.stringify(meta) : '';
    console.debug(`${MAGENTA}[DEBUG]${RESET} ${DIM}[${timestamp}]${RESET} ${message}${metaStr}`);
    logFileStream.write(`[DEBUG] [${timestamp}] ${message}${metaStr}\n`);
  },
};

/**
 * Morgan HTTP request logging middleware formatting Method, URL, Status Code, and Response Time.
 */
export const httpLogger = morgan((tokens, req, res) => {
  const method = tokens.method(req, res) || 'GET';
  const url = tokens.url(req, res) || '/';
  const statusStr = tokens.status(req, res) || '200';
  const status = parseInt(statusStr, 10);
  const responseTime = tokens['response-time'](req, res) || '0';
  const timestamp = new Date().toISOString();

  const methodColor = getMethodColor(method);
  const statusColor = getStatusColor(status);

  // Colored format for terminal console
  const coloredLog = `${DIM}[${timestamp}]${RESET} ${methodColor}${method}${RESET} ${url} ${statusColor}${status}${RESET} - ${responseTime}ms`;

  // Plain format saved to logs/app.log file
  const fileLog = `[HTTP] [${timestamp}] ${method} ${url} ${status} - ${responseTime}ms`;
  logFileStream.write(fileLog + '\n');

  return coloredLog;
});
