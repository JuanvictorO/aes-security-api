import { Request, RequestHandler, response, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class encryptController {
  public async encrypt(req: Request, res: Response): Promise<Response> {
    const { ...rest } = req.body;

    //const encryptUseCase = container.resolve(EncryptUseCase);

    //const dataEncoded = await encryptUseCase.execute({ name, email, phone, identify, password });

    return response.json(instanceToInstance({ ...rest }));
  }

  public async decrypt(req: Request, res: Response): Promise<Response> {
    const { ...rest } = req.body;

    //const encryptUseCase = container.resolve(EncryptUseCase);

    //const dataEncoded = await encryptUseCase.execute({ name, email, phone, identify, password });

    return response.json(instanceToInstance({ ...rest }));
  }
}
