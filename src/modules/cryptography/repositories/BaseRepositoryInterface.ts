import { BaseRepositoryInterface as RealBaseRepositoryInterface } from '../../../shared/repositories/BaseRepositoryInterface';

import { Base } from '../infra/typeorm/entities/Base';

export type BaseRepositoryInterface = RealBaseRepositoryInterface<Base>;
