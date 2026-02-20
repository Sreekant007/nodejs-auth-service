import { Prisma } from '@prisma/client';
import type { Request, Response, NextFunction } from 'express';

import { logger } from '@/utils/logger.js';

import { AppError } from './app-error.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Known / operational errors
  if (err instanceof AppError) {
    logger.error(err.message, {
      path: _req.path,
      method: _req.method,
      statusCode: err.statusCode,
    });
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      error: err.details || {},
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  }

  // Prisma: Unique constraint violation
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      message: 'Resource already exists',
    });
  }

  // Unknown / programming errors
  logger.error(err.message, {
    path: _req.path,
    method: _req.method,
  });

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message || 'An unexpected error occurred',
  });
};
