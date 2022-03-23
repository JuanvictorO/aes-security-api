import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';

import { container } from 'tsyringe';
import { ShowClienteUseCase } from '../../modules/cryptography/useCases/ShowClienteUseCase';

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeaders.split(' ');

  const showClienteUseCase = container.resolve(ShowClienteUseCase);

  const cliente = await showClienteUseCase.execute({ auth_token: token });

  try {
    const id = cliente.id;
    const key_cript = cliente.key_cript;
    const seed = cliente.seed;

    request.cliente = {
      id,
      key_cript,
      seed,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};
