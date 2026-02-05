import { env } from './env.js';

export const config = {
  env: env.NODE_ENV,
  port: env.PORT,
  jwt: {
    secret: env.JWT_SECRET,
  },
  database: {
    uri: env.DB_URI,
  },
};
