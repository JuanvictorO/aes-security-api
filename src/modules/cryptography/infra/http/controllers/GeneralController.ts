import { CreateFullSchemaUseCase } from '@modules/cryptography/useCases/CreateFullSchemaUseCase';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class GeneralController {
  public async createSchema(req: Request, res: Response): Promise<Response> {
    //TO DO: implementar autenticação por token
    const client_id = '37c52ac7-e4b9-48f7-ab77-49f98416b0b8';
    const { seed, encrypt_key, database_name, tables } = req.body;
    const aesDataUseCase = container.resolve(CreateFullSchemaUseCase);

    const dataEncoded = await aesDataUseCase.execute({ client_id, seed, encrypt_key, database_name, tables });

    return res.status(201).send(instanceToInstance(dataEncoded));
  }
}
