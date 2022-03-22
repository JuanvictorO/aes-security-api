import { Router } from 'express';
import { CreateDataController } from '../infra/http/controllers/createDataController';

export const apiRouter = Router();

const createDataController = new CreateDataController();

apiRouter.post('/:tableName', createDataController.handle);

apiRouter.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});
