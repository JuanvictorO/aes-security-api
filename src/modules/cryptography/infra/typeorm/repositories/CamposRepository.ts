import { BaseRepository } from '@shared/repositories/BaseRepository';
import { CamposRepositoryInterface } from 'modules/cryptography/repositories/CamposRepositoryInterface';

import { Campos } from '../entities/Campos';

export class CamposRepository extends BaseRepository<Campos> implements CamposRepositoryInterface {
  constructor() {
    super(Campos);
  }
}
