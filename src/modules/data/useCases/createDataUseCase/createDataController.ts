import { Request, Response } from 'express';
import { CreateDataUseCase } from './createDataUseCase';

export class CreateDataController {
  async handle( req: Request, res: Response) {
    try{
      const data: Array<Array<number | string | Date>> = Object.entries(req.body);

      const createDataUseCase = new CreateDataUseCase( data );
      createDataUseCase.execute();
      res.status(200).send( JSON.stringify( createDataUseCase.data ) );
    }catch(err){
      res.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }

  }
}
