import { generateStringSeed } from '../../../../../shared/utils/generateStringSeed';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { EncryptDataUseCase } from '../../../useCases/EncryptDataUseCase';

export class CreateDataController {
  async handle(req: Request, res: Response) {
    const data: Array<Array<number | string | Date>> = Object.entries(req.body);
    const tableName = req.params.tableName;


    const stringSeed = generateStringSeed(  tableName, Object.keys(req.body),"SW50ZWdyaXR5RXhhbXBsZQ==" );

    const createDataUseCase = new EncryptDataUseCase(data, stringSeed);
    const encryptData = await createDataUseCase.execute();
    res.status(201).json(encryptData);
  }
}
