import {
  FindOneOptions,
  FindManyOptions,
  getRepository,
  Repository,
  EntityTarget,
  UpdateResult,
  DeleteResult,
  FindConditions,
  DeepPartial,
  Like,
} from 'typeorm';

import { BaseRepositoryInterface, Field, FindAllOptions } from './BaseRepositoryInterface';

export class BaseRepository<T> implements BaseRepositoryInterface<T> {
  protected ormRepository: Repository<T>;

  constructor(entity: EntityTarget<T>) {
    this.ormRepository = getRepository(entity);
  }

  public findOne(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: FindConditions<T> | FindOneOptions<T> | Field | any,
    options?: FindOneOptions<T> | undefined,
  ): Promise<T | undefined> {
    return this.ormRepository.findOne(id, options);
  }

  public findByIds(ids: string[], options?: FindManyOptions<T> | FindConditions<T>): Promise<T[]> {
    return this.ormRepository.findByIds(ids, options);
  }

  public count(options?: FindManyOptions<T>): Promise<number> {
    return this.ormRepository.count(options);
  }

  public create(data: DeepPartial<T>): Promise<T> {
    const entity = this.ormRepository.create(data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.ormRepository.save(entity as any);
  }

  public findAll(data: FindAllOptions<T>): Promise<T[]> {
    return this.ormRepository.find({
      ...data,
    });
  }

  public save(user: DeepPartial<T>): Promise<T> {
    return this.ormRepository.save(user);
  }

  public delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete(id);
  }
}
