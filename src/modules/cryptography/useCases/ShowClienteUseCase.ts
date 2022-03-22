import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { Cliente } from '../infra/typeorm/entities/Cliente';
import { ClienteRepositoryInterface } from '../repositories/ClienteRepositoryInterface';

type Request = {
  auth_token: string;
};

@injectable()
export class ShowClienteUseCase {
  static execute(arg0: { auth_token: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('ClienteRepository')
    private clienteRepository: ClienteRepositoryInterface,
  ) {}

  public async execute({ auth_token }: Request): Promise<Cliente> {
    const Cliente = await this.clienteRepository.findOne({ auth_token });

    if (!Cliente) {
      throw new AppError('Token not found');
    }

    return Cliente;
  }
}
