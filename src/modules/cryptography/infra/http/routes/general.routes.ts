import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { GeneralController } from '../controllers/GeneralController';

const generalController = new GeneralController();

const generalRouter = Router();

generalRouter.post(
  '/create/schema/',
  celebrate({
    [Segments.BODY]: {
      seed: Joi.string(),
      encrypt_key: Joi.string().max(16).min(16),
      database_name: Joi.string(),
      tables: Joi.array()
    },
  }),
  generalController.createSchema,
);

/*
encryptRouter.post(
  '/encrypt/:table',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  generalController.encrypt,
);

encryptRouter.post(
  '/decrypt/:table',
  celebrate({
    [Segments.BODY]: {
      data: Joi.array().required(),
    },
  }),
  generalController.decrypt,
);
*/
export { generalRouter };
