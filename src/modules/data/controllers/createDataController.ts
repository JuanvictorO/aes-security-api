import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { CreateDataUseCase } from '../useCases/createDataUseCase';

export class CreateDataController {
  async handle(req: Request, res: Response) {
    const data: Array<Array<number | string | Date>> = Object.entries(req.body);

    const createDataUseCase = new CreateDataUseCase(data);
    const encryptData = await createDataUseCase.execute();
    res.status(201).json(encryptData);
  }
}
