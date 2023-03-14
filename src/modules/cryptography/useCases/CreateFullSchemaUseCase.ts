import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { FullSchemaDto } from '../entities/dto/FullSchemaDto';
import { ClientRepositoryInterface } from '../repositories/ClientRepositoryInterface';
import { CreateBaseUseCase } from './CreateBaseUseCase';
import { CreateFieldUseCase } from './CreateFieldUseCase';
import { CreateTableUseCase } from './CreateTableUseCase';
import { GenerateTokenUseCase } from './GenerateTokenUseCase';

@injectable()
export class CreateFullSchemaUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepositoryInterface,
    private createBaseUseCase: CreateBaseUseCase,
    private createTableUseCase: CreateTableUseCase,
    private createFieldUseCase: CreateFieldUseCase,
    private generateTokenUseCase: GenerateTokenUseCase,
  ) {}

  @Transactional()
  public async execute({ client_id, seed, encrypt_key, database_name, tables }: FullSchemaDto): Promise<void> {
    //TO DO validar encrypt_key
    const client = await this.clientRepository.findOne(client_id);
    if (!client) {
      throw new AppError('Client not found');
    }

    client.seed = seed;
    client.encrypt_key = encrypt_key;

    await this.clientRepository.save(client);

    const base = await this.createBaseUseCase.execute({ client_id, name: database_name });

    for (let i = 0; i < tables.length; i++) {
      const indexTable = tables[i];
      if (!indexTable.name || !indexTable.columns) {
        throw new AppError('Need to pass table name and columns');
      }

      const table = await this.createTableUseCase.execute({ base_id: base.id, table_name: indexTable.name });

      for (let x = 0; x < indexTable.columns.length; x++) {
        const indexColumn = indexTable.columns[x];
        if (!indexColumn.name || !indexColumn.type) {
          throw new AppError('Need to pass column name and type');
        }

        const token = this.generateTokenUseCase.execute({
          table_name: table.table_name,
          column_name: indexColumn.name,
          encrypt_key,
          seed,
          table_columns_name: indexTable.columns,
        });

        await this.createFieldUseCase.execute({
          table_id: table.id,
          field_type_name: indexColumn.type,
          name: indexColumn.name,
          token,
        });
      }
    }
  }
}
