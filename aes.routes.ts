import { EncryptController } from '@modules/cryptography/infra/http/controllers/EncryptController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { AesController } from './src/modules/cryptography/infra/http/controllers/GeneralController';

const aesController = new AesController();
const encryptController = new EncryptController();

const aesRouter = Router();
const encryptRouter = Router();

aesRouter.post('/', aesController.test);
encryptRouter.post('/encrypt', encryptController.encrypt);
encryptRouter.post('/decrypt', encryptController.decrypt);

export { aesRouter, encryptRouter };
