import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { FullSchemaDto } from '../dto/FullSchemaDto';
import { ClientRepositoryInterface } from '../repositories/ClientRepositoryInterface';
import { CreateBaseUseCase } from './CreateBaseUseCase';
import { CreateFieldUseCase } from './CreateFieldUseCase';
import { CreateTableUseCase } from './CreateTableUseCase';

@injectable()
export class CreateFullSchemaUseCase {
  constructor(
    private clientRepository: ClientRepositoryInterface,
    //@inject('CreateBaseUseCase')
    private createBaseUseCase: CreateBaseUseCase,
    //@inject('CreateTableUseCase')
    private createTableUseCase: CreateTableUseCase,
    //@inject('Repository')
    private createFieldUseCase: CreateFieldUseCase,
  ) {}

  public async execute({ client_id, seed, encrypt_key, database_name, tables }: FullSchemaDto): Promise<void> {
    //TO DO validar encrypt_key
    const client = await this.clientRepository.findOne(client_id);
    if (!client) {
      throw new AppError('Client not found');
    }

    client.seed = seed;
    client.encrypt_key = encrypt_key;

    try {
      await this.clientRepository.save(client);

      const base = await this.createBaseUseCase.execute({ client_id, name: database_name });
      tables.forEach(async (element) => {
        const table = await this.createTableUseCase.execute({ base_id: base.id, table_name: element.name });

        element.columns.forEach(async (column) => {
          await this.createFieldUseCase.execute({ table_id: table.id, field_type_name: column.type, name: column.name })
        });
      });

    } catch (err) {
      throw new AppError(err);
    }
  }
}
