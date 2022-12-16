import { container } from 'tsyringe';
import { FieldRepository } from '../infra/typeorm/repositories/FieldRepository';
import { ClientRepository } from '../infra/typeorm/repositories/ClientRepository';
import { TableRepository } from '../infra/typeorm/repositories/TableRepository';
import { FieldRepositoryInterface } from './FieldRepositoryInterface';
import { ClientRepositoryInterface } from './ClientRepositoryInterface';
import { TableRepositoryInterface } from './TableRepositoryInterface';
import { BaseRepositoryInterface } from './BaseRepositoryInterface';
import { FieldTypeRepositoryInterface } from './FieldTypeRepositoryInterface';
import { FieldTypeRepository } from '../infra/typeorm/repositories/FieldTypeRepository';
import { BaseRepository } from '../infra/typeorm/repositories/BaseRepository';

container.registerSingleton<ClientRepositoryInterface>('ClientRepository', ClientRepository);
container.registerSingleton<BaseRepositoryInterface>('BaseRepository', BaseRepository);
container.registerSingleton<TableRepositoryInterface>('TableRepository', TableRepository);
container.registerSingleton<FieldRepositoryInterface>('FieldRepository', FieldRepository);
container.registerSingleton<FieldTypeRepositoryInterface>('FieldTypeRepository', FieldTypeRepository);


