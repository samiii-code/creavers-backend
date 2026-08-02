import { RequestHandler } from 'express';
import { httpLogger } from '../config/logger';

export const requestLogger: RequestHandler = httpLogger;
