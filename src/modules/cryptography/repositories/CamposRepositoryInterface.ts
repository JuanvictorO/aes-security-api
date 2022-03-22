

import { BaseRepositoryInterface } from 'shared/repositories/BaseRepositoryInterface';
import { Campos } from '../infra/typeorm/entities/Campos';

export type CamposRepositoryInterface = BaseRepositoryInterface<Campos>;
