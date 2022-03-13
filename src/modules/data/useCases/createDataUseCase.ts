import { verificaData } from '../../../shared/utils/verificaData';
import { DateData } from '../entities/DateData';
import { IntegerData } from '../entities/IntegerData';
import { StringData } from '../entities/StringData';

export class CreateDataUseCase {
  data: Array<Array<number | string | Date>>;
  constructor(data: Array<Array<number | string | Date>>) {
    this.data = data;
  }

  async execute(): Promise<any[]> {
    let arrReturn = [];

    let type;

    for (const arrType of this.data) {
      // Pega o valor do array
      let value = arrType[1];

      // Pega o tipo do valor
      const type = this.getType(value);

      // Pega a chave do array
      let chave: any = arrType[0];

      // Retorna o objeto criptografado
      arrReturn[chave] = this.encryptData(type, value);
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

  encryptData(type: string, value: any): any {
    switch (type) {
      case 'string':
        value = value as string;
        const strObj = new StringData(value);
        const strCrypt = strObj.crypt();
        return strCrypt;

      case 'integer':
        value = value as number;
        const intObj = new IntegerData(value);
        const intCrypt = intObj.crypt();
        return intCrypt;

      case 'float':
        value = value as number;
        const floatObj = new IntegerData(value);
        const floatCrypt = floatObj.crypt();
        return floatCrypt;

      case 'date':
        value = value as Date;
        const dateObj = new DateData(value);
        const dateCrypt = dateObj.crypt();
        return dateCrypt;

      default:
        return;
    }
  }
}
