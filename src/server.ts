import dotenv from 'dotenv';

import { config } from '@/config/index.js';

import app from './app.js';

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} with environment ${config.env}`);
});
