import { Router } from 'express';
import { CreateDataController } from '../controllers/createDataController';

export const apiRouter = Router();

const createDataController = new CreateDataController();

apiRouter.post('/:tableName', createDataController.handle);

apiRouter.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});
