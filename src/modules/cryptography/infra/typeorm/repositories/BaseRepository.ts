import { BaseRepository as RealBaseRepository } from '@shared/repositories/BaseRepository';
import { BaseRepositoryInterface } from '@modules/cryptography/repositories/BaseRepositoryInterface';

import { Base } from '../entities/Base';

export class BaseRepository extends RealBaseRepository<Base> implements BaseRepositoryInterface {
  constructor() {
    super(Base);
  }
}
