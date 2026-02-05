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

app.get('/health-check', (_req, res) => {
  res.status(200).send('OK');
});

export default app;
