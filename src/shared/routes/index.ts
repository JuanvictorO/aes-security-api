import { Router } from 'express';

import { dataRouter } from '../../modules/cryptography/routes/index.routes';

const routes = Router();

routes.use('/api', dataRouter);

export default routes;
