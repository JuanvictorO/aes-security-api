import { AesKeyExpansionUseCase } from '@modules/cryptography/useCases/AesKeyExpansionUseCase';
import { EncryptDataUseCase } from '@modules/cryptography/useCases/EncryptDataUseCase';
import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AesController {
  public async test(req: Request, res: Response): Promise<Response> {
    const aesDataUseCase = container.resolve(AesKeyExpansionUseCase);

    const dataEncoded = await aesDataUseCase.execute();

    return res.status(201).send(instanceToInstance(dataEncoded));
  }
}
