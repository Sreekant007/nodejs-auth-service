import { errorHandler } from '@/errors/error-handler.js';
import { BadRequestError, NotFoundError } from '@/errors/http-errors.js';
import { asyncHandler } from '@/middlewares/async-handler.js';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
dotenv.config();

const app = express();

/* Global Middleware */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/* Health check */
app.get(
  '/health-check',
  asyncHandler(async (_req, res) => {
    throw new BadRequestError('This is a test error');
  }),
);

/* 404 handler */
app.use((_req, _res) => {
  throw new NotFoundError();
});
/* Global error handler (MUST be last) */
app.use(errorHandler);

export default app;
