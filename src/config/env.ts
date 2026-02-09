import path from 'path';

import dotenv from 'dotenv';
import { z } from 'zod';

/**
 * Load ENV file based on current NODE_ENV variable
 */
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'qa', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables', parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
