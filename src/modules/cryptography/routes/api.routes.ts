import { ensureAuthenticated } from '@shared/middlewares/tokenAuthenticated';
import { Router } from 'express';
import { AesController } from '../infra/http/controllers/AesController';
import { EncryptController } from '../infra/http/controllers/EncryptController';

export const apiRouter = Router();

const encryptController = new EncryptController();
const aesController = new AesController();

//apiRouter.use(ensureAuthenticated);

apiRouter.post('/encrypt/:tableName', encryptController.encrypt);

apiRouter.post('/decrypt/:tableName', encryptController.decrypt);

apiRouter.post('/test', aesController.test);

