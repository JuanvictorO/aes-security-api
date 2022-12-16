import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { BaseDto } from '../dto/BaseDto';
import { Base } from '../infra/typeorm/entities/Base';
import { BaseRepositoryInterface } from '../repositories/BaseRepositoryInterface';
import { ClientRepositoryInterface } from '../repositories/ClientRepositoryInterface';

@injectable()
export class CreateBaseUseCase {
  constructor(
    @inject('OfficeRepository')
    private baseRepository: BaseRepositoryInterface,
    @inject('ClientRepository')
    private clientRepository: ClientRepositoryInterface,
  ) {}

  public async execute({ client_id, name }: BaseDto): Promise<Base> {
    const baseAlreadyExists = await this.baseRepository.findOne({ name });
    if(baseAlreadyExists) {
      throw new AppError('This base name already exists');
    }

    const base = await this.baseRepository.create({ name, client_id });

    return base;
  }
}
