import { verificaData } from '../../../shared/utils/verificaData';
import { DateData } from '../entities/DateData';
import { IntegerData } from '../entities/IntegerData';
import { StringData } from '../entities/StringData';

export class CreateDataUseCase {
  data: Array<Array<number | string | Date>>;
  seed: string;
  constructor(data: Array<Array<number | string | Date>>, seed: string) {
    this.data = data;
    this.seed = seed;
  }

  async execute(): Promise<any[]> {
    let arrReturn = Array<any>();

    for (const arrType of this.data) {
      // Pega o valor do array
      let value = arrType[1];

      // Pega o tipo do valor
      const type = this.getType(value);

      // Pega a chave do array
      const chaveKey: any = arrType[0];

      // Retorna o objeto criptografado
      arrReturn.push(  {
        [chaveKey]: await this.encryptData(type, value, chaveKey)
      });
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

  async encryptData(type: string, value: any, chaveKey:string): Promise<any> {
    switch (type) {
      case 'string':
        value = value as string;
        const strObj = new StringData(value, "2cbacfc285bc26b617b2533ef91d7846b424f0a3719c31de68fd87e109cfa9f0");
        const strCrypt = await strObj.crypt();

        return strCrypt;

      case 'integer':
        value = value as number;
        const intObj = new IntegerData(value, "eaeb82825559672c919a1933cb515c2767bfe68d1b050867f2f552bdea9ca170");
        const intCrypt = intObj.crypt();
        return intCrypt;

      case 'float':
        value = value as number;
        const floatObj = new IntegerData(value, chaveKey);
        const floatCrypt = floatObj.crypt();
        return floatCrypt;

      case 'date':
        value = value as Date;
        const dateObj = new DateData(value, 'eaeb82825559672c919a1933cb515c2767bfe68d1b050867f2f552bdea9ca170');
        const dateCrypt = dateObj.crypt();
        return dateCrypt;

      default:
        return;
    }
  }
}
