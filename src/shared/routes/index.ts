import { indexEncryptRouter } from '@modules/cryptography/infra/http/routes/index.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/api', indexEncryptRouter);

export default routes;
