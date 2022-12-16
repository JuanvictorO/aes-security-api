import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Client } from '../infra/typeorm/entities/Client';
import { ClientRepositoryInterface } from '../repositories/ClientRepositoryInterface';

type Request = {
  auth_token: string;
};

@injectable()
export class ShowClientUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepositoryInterface,
  ) {}

  public async execute(auth_token: string): Promise<Client> {
    const client = await this.clientRepository.findOne({ auth_token });

    if (!client) {
      throw new AppError('Client not found');
    }

    return client;
  }
}
