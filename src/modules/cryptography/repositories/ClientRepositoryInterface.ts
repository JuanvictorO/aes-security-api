import { BaseRepositoryInterface } from '../../../shared/repositories/BaseRepositoryInterface';

import { Client } from '../infra/typeorm/entities/Client';

export type ClientRepositoryInterface = BaseRepositoryInterface<Client>;
