import { BaseRepository } from '@shared/repositories/BaseRepository';
import { FieldTypeRepositoryInterface } from '@modules/cryptography/repositories/FieldTypeRepositoryInterface';

import { FieldType } from '../entities/FieldType';

export class FieldTypeRepository extends BaseRepository<FieldType> implements FieldTypeRepositoryInterface {
  constructor() {
    super(FieldType);
  }
}
