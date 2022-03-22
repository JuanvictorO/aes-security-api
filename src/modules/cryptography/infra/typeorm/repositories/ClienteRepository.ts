import { ClienteRepositoryInterface } from 'modules/cryptography/repositories/ClienteRepositoryInterface';
import { BaseRepository } from '@shared/repositories/BaseRepository';

import { Cliente } from '../entities/Cliente';

export class ClienteRepository extends BaseRepository<Cliente> implements ClienteRepositoryInterface {
  constructor() {
    super(Cliente);
  }
}
