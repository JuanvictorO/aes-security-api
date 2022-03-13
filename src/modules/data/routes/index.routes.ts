import { Router } from 'express';

import { apiRouter } from './api.routes';

export * from './api.routes';

const dataRouter = Router();

dataRouter.use('/', apiRouter);

export { dataRouter };
