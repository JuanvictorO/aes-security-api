import { Router } from 'express';
import { aesRouter } from '../../../../../../aes.routes';

import { encryptRouter } from './encrypt.routes';

const indexEncryptRouter = Router();

//indexEncryptRouter.use('/', encryptRouter);
indexEncryptRouter.use('/test', aesRouter);

export { indexEncryptRouter };
