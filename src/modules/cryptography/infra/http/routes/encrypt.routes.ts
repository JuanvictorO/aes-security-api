import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { encryptController } from '../controllers/EncryptController';

const encryptRouter = Router();

encryptRouter.post(
  '/encrypt',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  encryptController.encrypt(),
);

encryptRouter.post(
  '/decrypt',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  encryptController.decrypt(),
);

export { encryptRouter };
