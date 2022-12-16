import { ClientRepositoryInterface } from '@modules/cryptography/repositories/ClientRepositoryInterface';
import { BaseRepository } from '@shared/repositories/BaseRepository';

import { Client } from '../entities/Client';

export class ClientRepository extends BaseRepository<Client> implements ClientRepositoryInterface {
  constructor() {
    super(Client);
  }
}
