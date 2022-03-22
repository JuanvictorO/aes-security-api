import { BaseRepositoryInterface } from '@shared/repositories/BaseRepositoryInterface';

import { Cliente } from '../infra/typeorm/entities/Cliente';

export type ClienteRepositoryInterface = BaseRepositoryInterface<Cliente>;
