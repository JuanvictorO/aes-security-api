import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { AesController } from './src/modules/cryptography/infra/http/controllers/AesController';

const aesController = new AesController();

const aesRouter = Router();

aesRouter.get('/', aesController.test);

export { aesRouter };
