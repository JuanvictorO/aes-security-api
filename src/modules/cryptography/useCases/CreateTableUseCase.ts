import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { TableDto } from '../entities/dto/TableDto';
import { Table } from '../infra/typeorm/entities/Table';
import { BaseRepository } from '../infra/typeorm/repositories/BaseRepository';
import { TableRepositoryInterface } from '../repositories/TableRepositoryInterface';

@injectable()
export class CreateTableUseCase {
  constructor(
    @inject('TableRepository')
    private tableRepository: TableRepositoryInterface,
    @inject('BaseRepository')
    private baseRepository: BaseRepository,
  ) {}

  public async execute({ base_id, table_name }: TableDto): Promise<Table> {
    const baseAlreadyExists = await this.baseRepository.findOne(base_id);
    if (!baseAlreadyExists) {
      throw new AppError('Base not found');
    }

    const tableAlreadyExists = await this.tableRepository.findOne({ base_id, table_name });
    if (tableAlreadyExists) {
      throw new AppError('This table name already exists');
    }

    const Table = await this.tableRepository.create({ base_id, table_name });

    return Table;
  }
}
