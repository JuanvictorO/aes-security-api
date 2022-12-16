import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { GeneralController } from '../controllers/GeneralController';

const generalController = new GeneralController();

const generalRouter = Router();

generalRouter.post(
  '/create/schema/',
  celebrate({
    [Segments.BODY]: {
      seed: Joi.string().required(),
      encrypt_key: Joi.string().max(16).min(16).required(),
      database_name: Joi.string().required(),
      tables: Joi.array().required()
    },
  }),
  generalController.createSchema,
);

generalRouter.post(
  '/encrypt',
  celebrate({
    [Segments.BODY]: {
      table_name: Joi.string().required(),
      data: Joi.array().required()
    },
  }),
  generalController.encrypt,
);

generalRouter.post(
  '/decrypt',
  celebrate({
    [Segments.BODY]: {
      table_name: Joi.string().required(),
      data: Joi.array().required()
    },
  }),
  generalController.encrypt,
);

export { generalRouter };
