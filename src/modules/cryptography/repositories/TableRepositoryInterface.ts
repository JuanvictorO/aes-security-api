import { BaseRepositoryInterface } from '@shared/repositories/BaseRepositoryInterface';
import { Table } from '../infra/typeorm/entities/Table';

export type TableRepositoryInterface = BaseRepositoryInterface<Table>;
