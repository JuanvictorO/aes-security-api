import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { EncryptController } from '../controllers/EncryptController';

const encryptController = new EncryptController();

const encryptRouter = Router();

encryptRouter.post(
  '/encrypt/:table',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  encryptController.encrypt,
);

encryptRouter.post(
  '/decrypt/:table',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  encryptController.decrypt,
);

export { encryptRouter };
