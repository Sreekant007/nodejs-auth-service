import type { Request, Response, NextFunction } from 'express';
import { AppError } from './app-error.js';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Known / operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // Unknown / programming errors
  console.error('❌ Unexpected error:', err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
