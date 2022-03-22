import 'dotenv/config';
import 'reflect-metadata';
import './container';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import * as Sentry from '@sentry/node';

import { errors, isCelebrateError } from 'celebrate';
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

// Init error handler if not mode development
if (process.env.APP_MODE !== 'development') {
  app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        if (error instanceof AppError || isCelebrateError(error)) {
          return false;
        }
        return true;
      },
    }) as express.ErrorRequestHandler,
  );
}

app.use(errors());

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
  console.log(`Aqui: ${err}`);
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
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
