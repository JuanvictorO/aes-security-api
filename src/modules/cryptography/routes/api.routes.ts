import { Router } from 'express';
import { EncryptController } from '../infra/http/controllers/EncryptController';

export const apiRouter = Router();

const encryptController = new EncryptController();

apiRouter.post('/encrypt/:tableName', encryptController.encrypt);

apiRouter.post('/decrypt/:tableName', encryptController.decrypt);
