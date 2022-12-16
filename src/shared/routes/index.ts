import { generalRouter } from '@modules/cryptography/infra/http/routes/general.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/api/v1', generalRouter);

export default routes;
