import { EncryptDataUseCase } from '@modules/cryptography/useCases/EncryptDataUseCase';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class EncryptController {
  public async encrypt(req: Request, res: Response): Promise<Response> {
    const data: Array<Array<number | string | Date>> = Object.entries(req.body);
    const cliente_id = req.cliente.id;
    const { tabela_nome } = req.params;

    //const stringSeed = generateStringSeed(table_name, Object.keys(req.body), 'SW50ZWdyaXR5RXhhbXBsZQ==');

    const encryptDataUseCase = container.resolve(EncryptDataUseCase);

    const dataEncoded = await encryptDataUseCase.execute({ data, tabela_nome, cliente_id });

    return res.status(201).send(instanceToInstance(dataEncoded));
  }

  public async decrypt(req: Request, res: Response): Promise<Response> {
    const data: Array<Array<number | string | Date>> = Object.entries(req.body);
    const cliente_id = req.cliente.id;
    const { tabela_nome } = req.params;

    const encryptDataUseCase = container.resolve(EncryptDataUseCase);

    const dataEncoded = await encryptDataUseCase.execute({ data, tabela_nome, cliente_id });

    return res.status(201).json(dataEncoded);
  }
}
