import { BaseRepository } from '@shared/repositories/BaseRepository';
import { FieldRepositoryInterface } from '@modules/cryptography/repositories/FieldRepositoryInterface';

import { Field } from '../entities/Field';

export class FieldRepository extends BaseRepository<Field> implements FieldRepositoryInterface {
  constructor() {
    super(Field);
  }
}
