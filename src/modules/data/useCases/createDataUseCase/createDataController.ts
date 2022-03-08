import { Request, Response } from 'express';
import { CreateDataUseCase } from './createDataUseCase';

export class CreateDataController {
  async handle( req: Request, res: Response) {
    const { dataString, dataDate, dataInt } = req.body;

    const createDataUseCase = new CreateDataUseCase( "integer", dataInt );
    const createDataUseCase2 = new CreateDataUseCase( "string", dataString );
    const createDataUseCase3 = new CreateDataUseCase( "date", dataDate );

    await createDataUseCase.execute();
    await createDataUseCase2.execute();
    await createDataUseCase3.execute();

    return res.status(200).send();
  }
}
