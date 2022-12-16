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
    private tableRepository: TableRepositoryInterface
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

    const table = await this.tableRepository.findOne({ table_name });
    if (!table) {
      throw new AppError('Table not found');
    }

    const columns = table.fields;

    const arrReturn = data.map(())
    columns.forEach((column) => {
        //const findColumn = data.find(element => Object.keys(element) === column.name);
        //if (findColumn) {

        //}
    });
    for (let i = 0; i < tabela.campos.length; i++) {
      const campo = tabela.campos[i];

      for (const arrType of data) {
        // Pega a chave do array
        const chaveKey: any = arrType[0];

        if (chaveKey === campo.nome) {
          // Pega o valor do array
          const value = arrType[1];

          const type = this.getType(value);

          const columnName: any = arrType[0];
          arrReturn = {
            ...arrReturn,
            [columnName]: await this.encryptData(type, value, campo.token, decrypt || false),
          };
        }
      }
    }

    return arrReturn;
  }

  getType(value: any): string {
    if (typeof value === 'string') {
      return verificaData(value) ? 'date' : 'string';
    } else if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        return 'integer';
      } else {
        return 'float';
      }
    } else {
      throw new Error('Tipo não suportado');
    }
  }

  async encryptData(type: string, value: any, chaveKey: string, decrypt: boolean): Promise<any> {
    switch (type) {
      case 'string':
        value = value as string;
        const strObj = new StringData(value, chaveKey);
        const strCrypt = decrypt ? await strObj.decrypt(value) : await strObj.crypt();

        return strCrypt;

      case 'integer':
        value = value as number;
        const intObj = new IntegerData(value, chaveKey);
        const intCrypt = decrypt ? intObj.decrypt(value) : intObj.crypt();
        return intCrypt;

      case 'float':
        value = value as number;
        const floatObj = new IntegerData(value, chaveKey);
        const floatCrypt = decrypt ? floatObj.decrypt(value) : floatObj.crypt();
        return floatCrypt;

      case 'date':
        value = value as Date;
        const dateObj = new DateData(value, chaveKey);
        const dateCrypt = decrypt ? dateObj.decrypt(value) : dateObj.crypt();
        return dateCrypt;

      default:
        return;
    }
  }
}
