import { AppError } from '@shared/errors/AppError';
import { verificaData } from '@shared/utils/verificaData';
import { inject, injectable } from 'tsyringe';
import { Column } from '../dto/FullSchemaDto';
import { DateData } from '../entities/DateData';
import { IntegerData } from '../entities/IntegerData';
import { StringData } from '../entities/StringData';
import { BaseRepositoryInterface } from '../repositories/BaseRepositoryInterface';
import { ClientRepositoryInterface } from '../repositories/ClientRepositoryInterface';
import { TableRepositoryInterface } from '../repositories/TableRepositoryInterface';

type Request = {
  client_id: string;
  data: any;
  table_name: string;
  isDecrypt?: boolean;
};

@injectable()
export class EncryptDataUseCase {
  constructor(
    @inject('ClientRepository')
    private clientRepository: ClientRepositoryInterface,
    @inject('BaseRepository')
    private baseRepository: BaseRepositoryInterface,
    @inject('TableRepository')
    private tableRepository: TableRepositoryInterface,
  ) {}

  async execute({ client_id, data, table_name, isDecrypt }: Request): Promise<any> {
    const client = await this.clientRepository.findOne(client_id);
    if (!client) {
      throw new AppError('Client not found');
    }

    const base_id = await this.baseRepository.findOne({ client_id: client.id });
    if (!base_id) {
      throw new AppError('Base has not been created');
    }

    const table = await this.tableRepository.findOne(
      { table_name },
      {
        relations: ['fields', 'fields.fieldType'],
      },
    );
    if (!table) {
      throw new AppError('Table not found');
    }

    const columns = table.fields;
    let result: any = [];
    for (const obj of data) {
      let tempObj = {}
      const propertyNames = Object.keys(obj);

      for(const ele of propertyNames) {
        const findColumn = columns.find(column => column.name === ele);
        if (findColumn) {
          const codedColumn = await this.encryptData(
            findColumn.fieldType.type_name,
            obj[ele],
            findColumn.token,
            isDecrypt,
          );

          tempObj = {
            ...tempObj,
            [ele]: codedColumn,
          };
        } else {
          tempObj = {
            ...tempObj,
            [ele]: obj[ele],
          };
        }
      }
      result.push(tempObj);
    }
    console.log(result);
    return result;
  }

  private validateType(value: any, type: string): void {
    if (
      (type === 'STRING' && (typeof value !== 'string' || verificaData(value) === true)) ||
      (type === 'DATE' && (typeof value !== 'string' || verificaData(value) === false)) ||
      (type === 'INT' && typeof value !== 'number')
    ) {
      throw new AppError(
        `Value not corresponds with type informed [${value}, typeExpeted: ${type}, typeFounded: ${typeof value}]`,
      );
    }
  }

  private async encryptData(type: string, value: any, token: string, decrypt?: boolean): Promise<any> {
    //this.validateType(value, type);
    console.log(type, value, token, decrypt);
    switch (type) {
      case 'STRING':
        value = value as string;
        const strObj = new StringData(value, token);
        const strCrypt = decrypt ? await strObj.decrypt(value) : await strObj.crypt();

        return strCrypt;

      case 'INT':
        value = value as number;
        const intObj = new IntegerData(value, token);
        const intCrypt = decrypt ? intObj.decrypt(value) : intObj.crypt();
        return intCrypt;

      case 'DATE':
        value = value as Date;
        const dateObj = new DateData(value, token);
        const dateCrypt = decrypt ? dateObj.decrypt(value) : dateObj.crypt();
        return dateCrypt;

      default:
        return;
    }
  }
}
