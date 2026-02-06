import type { Request, Response, NextFunction } from 'express';

import { logger } from '@/utils/logger.js';

import { AppError } from './app-error.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Known / operational errors
  if (err instanceof AppError) {
    logger.warn(err.message, {
      path: _req.path,
      method: _req.method,
      statusCode: err.statusCode,
    });
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Unknown / programming errors
  logger.warn(err.message, {
    path: _req.path,
    method: _req.method,
  });

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
