import { CamposRepositoryInterface } from '@modules/encrypt/repositories/CamposRepositoryInterface';

import { BaseRepository } from '@shared/repositories/BaseRepository';

import { Campos } from '../entities/Campos';

export class CamposRepository extends BaseRepository<Campos> implements CamposRepositoryInterface {
  constructor() {
    super(Campos);
  }
}