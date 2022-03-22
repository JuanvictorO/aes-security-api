import { BaseRepositoryInterface } from 'shared/repositories/BaseRepositoryInterface';

import { Tabela } from '../infra/typeorm/entities/Tabela';

export type TabelaRepositoryInterface = BaseRepositoryInterface<Tabela>;
