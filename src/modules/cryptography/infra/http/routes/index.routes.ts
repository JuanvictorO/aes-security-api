import { Router } from 'express';

import { encryptRouter } from './encrypt.routes';

const indexEncryptRouter = Router();

indexEncryptRouter.use('/', encryptRouter);

export { indexEncryptRouter };
