import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'dotenv/config';
import './container';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import cors from 'cors';
import routes from './routes';
import { AppError } from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';

// Initialize cls-hooked to use transaction
initializeTransactionalContext();
// Patch Repository with BaseRepository
patchTypeORMRepositoryWithBaseRepository();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({
        status: 'error',
        message: err.message,
      });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Security Server is running on port ${process.env.SERVER_PORT}`);
});
