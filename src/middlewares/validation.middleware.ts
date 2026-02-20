import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

import { BadRequestError, ValidationError } from '@/errors/http-errors.js';

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError('Validation Error', JSON.parse(result.error?.message));
    }

    req.body = result.data as z.infer<T>;
    next();
  };
