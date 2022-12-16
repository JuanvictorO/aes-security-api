import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { FieldDto } from '../dto/FieldDto';
import { Field } from '../infra/typeorm/entities/Field';
import { FieldType } from '../infra/typeorm/entities/FieldType';
import { FieldRepositoryInterface } from '../repositories/FieldRepositoryInterface';
import { FieldTypeRepositoryInterface } from '../repositories/FieldTypeRepositoryInterface';
import { TableRepositoryInterface } from '../repositories/TableRepositoryInterface';

@injectable()
export class CreateFieldUseCase {
  constructor(
    @inject('FieldRepository')
    private fieldRepository: FieldRepositoryInterface,
    @inject('TableRepository')
    private tableRepository: TableRepositoryInterface,
    @inject('FieldTypeRepository')
    private fieldTypeRepository: FieldTypeRepositoryInterface,
  ) {}

  public async execute({ table_id, field_type_name, name, token }: FieldDto): Promise<Field> {
    const tableExists = await this.tableRepository.findOne(table_id);
    if (!tableExists) {
      throw new AppError('Table not found');
    }

    const fieldType = await this.fieldTypeRepository.findOne({type_name: field_type_name.toUpperCase()});
    if (!fieldType) {
      throw new AppError('FieldType not found');
    }

    const fieldAlreadyExists = await this.fieldRepository.findOne({ table_id, name });
    if (fieldAlreadyExists) {
      throw new AppError('Field already exists');
    }

    const field = await this.fieldRepository.create({ table_id, field_type_id: fieldType.id, name, token });
    return field;
  }
}
