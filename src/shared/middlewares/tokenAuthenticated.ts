import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../shared/errors/AppError';

import { container } from 'tsyringe';
import { ShowClientUseCase } from '@modules/cryptography/useCases/ShowClienteUseCase';
import { authConfig } from '@config/auth';
import { verify } from 'jsonwebtoken';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
  const authHeaders = request.headers.authorization;

  if (!authHeaders) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeaders.split(' ');

  const showClientUseCase = container.resolve(ShowClientUseCase);

  await showClientUseCase.execute(token);

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};
