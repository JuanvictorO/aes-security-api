import {
  DeleteResult,
  FindConditions,
  FindOneOptions,
  ObjectID,
  UpdateResult,
  FindManyOptions,
  DeepPartial,
} from 'typeorm';

export type Field = string | number | Date | ObjectID | undefined;

export interface FindAllOptions<T> extends FindManyOptions<T> {
  paginate?: Partial<{
    active: boolean;
    page: number;
    perPage: number;
  }>;
  searchIn?: Partial<{
    value: string;
    columns: string[];
  }>;
}

export interface BaseRepositoryInterface<T> {
  findByIds(ids: string[], options?: FindManyOptions<T> | FindConditions<T>): Promise<T[]>;
  findOne(
    id?: Field | FindOneOptions<T> | FindConditions<T>,
    options?: FindOneOptions<T> | undefined,
  ): Promise<T | undefined>;
  create(data: DeepPartial<T>): Promise<T>;
  count(options?: FindManyOptions<T>): Promise<number>;
  save(user: DeepPartial<T>): Promise<T>;
  delete(id: string): Promise<DeleteResult>;
  findAll(options?: FindAllOptions<T>): Promise<T[]>;
}
