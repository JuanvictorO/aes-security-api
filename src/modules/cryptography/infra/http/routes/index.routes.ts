import { Router } from 'express';
import { aesRouter, encryptRouter } from '../../../../../../aes.routes';

const indexEncryptRouter = Router();

//indexEncryptRouter.use('/', encryptRouter);
indexEncryptRouter.use('/test', aesRouter);
indexEncryptRouter.use('/api', encryptRouter)

export { indexEncryptRouter };
