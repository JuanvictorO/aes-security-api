import { Router } from 'express';

export const apiRouter = Router();

apiRouter.post('/', (req, res) => {
    res.send(req.body);
});

apiRouter.get('/', (req, res) => {
    res.send({
        message: 'Hello World'
    });
});
