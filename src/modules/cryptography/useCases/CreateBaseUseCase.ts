import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { BaseDto } from '../entities/dto/BaseDto';
import { Base } from '../infra/typeorm/entities/Base';
import { BaseRepositoryInterface } from '../repositories/BaseRepositoryInterface';

@injectable()
export class CreateBaseUseCase {
  constructor(
    @inject('BaseRepository')
    private baseRepository: BaseRepositoryInterface,
  ) {}

  public async execute({ client_id, name }: BaseDto): Promise<Base> {
    const baseAlreadyExists = await this.baseRepository.findOne({ name });
    if (baseAlreadyExists) {
      throw new AppError('This base name already exists');
    }

    const base = await this.baseRepository.create({ name, client_id });

    return base;
  }
}
