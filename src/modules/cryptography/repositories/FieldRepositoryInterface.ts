import { BaseRepositoryInterface } from '@shared/repositories/BaseRepositoryInterface';
import { Field } from '../infra/typeorm/entities/Field';

export type FieldRepositoryInterface = BaseRepositoryInterface<Field>;
