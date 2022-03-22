import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';

import { container } from 'tsyringe';
import { ShowClienteUseCase } from '@modules/cryptography/useCases/ShowClienteUseCase';

interface JWTTokenPayload {
  iat: number;
  exp: number;
  sub: string;
  enterprise: string;
}

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeaders.split(' ');

  const showClienteUseCase = container.resolve(ShowClienteUseCase);

  const cliente = await showClienteUseCase.execute({ auth_token: token });

  try {
    const id = (await cliente).id;

    request.cliente = {
      id,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};
