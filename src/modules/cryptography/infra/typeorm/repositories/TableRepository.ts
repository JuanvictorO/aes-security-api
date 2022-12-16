import { BaseRepository } from '@shared/repositories/BaseRepository';
import { TableRepositoryInterface } from '@modules/cryptography/repositories/TableRepositoryInterface';
import { Table } from '../entities/Table';

export class TableRepository extends BaseRepository<Table> implements TableRepositoryInterface {
  constructor() {
    super(Table);
  }
}
