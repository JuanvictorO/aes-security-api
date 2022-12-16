import { CreateFullSchemaUseCase } from '@modules/cryptography/useCases/CreateFullSchemaUseCase';
import { EncryptDataUseCase } from '@modules/cryptography/useCases/EncryptDataUseCase';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class GeneralController {
  public async createSchema(req: Request, res: Response): Promise<Response> {
    //TO DO: implementar autenticação por token
    const client_id = '37c52ac7-e4b9-48f7-ab77-49f98416b0b8';
    const { seed, encrypt_key, database_name, tables } = req.body;
    const aesDataUseCase = container.resolve(CreateFullSchemaUseCase);

    await aesDataUseCase.execute({ client_id, seed, encrypt_key, database_name, tables });

    return res.status(201).send(instanceToInstance({
      status: true
    }));
  }

  public async encrypt(req: Request, res: Response): Promise<Response> {
    //TO DO: implementar autenticação por token
    const client_id = '37c52ac7-e4b9-48f7-ab77-49f98416b0b8';
    const { table_name, data } = req.body;
    const encryptDataUseCase = container.resolve(EncryptDataUseCase);

    const response = await encryptDataUseCase.execute({ client_id, table_name, data, isDecrypt: false });
    return res.status(201).send(instanceToInstance(response));
  }

  public async decrypt(req: Request, res: Response): Promise<Response> {
    //TO DO: implementar autenticação por token
    const client_id = '37c52ac7-e4b9-48f7-ab77-49f98416b0b8';
    const { table_name, data } = req.body;
    const encryptDataUseCase = container.resolve(EncryptDataUseCase);

    const response = await encryptDataUseCase.execute({ client_id, table_name, data, isDecrypt: true });
    return res.status(201).send(instanceToInstance(response));
  }
}
