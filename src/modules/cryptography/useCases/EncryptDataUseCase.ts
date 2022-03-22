import { AppError } from '../../../shared/errors/AppError';
import { inject } from 'tsyringe';
import { verificaData } from '../../../shared/utils/verificaData';
import { DateData } from '../entities/DateData';
import { IntegerData } from '../entities/IntegerData';
import { StringData } from '../entities/StringData';
import { CamposRepositoryInterface } from '../repositories/CamposRepositoryInterface';
import { TabelaRepositoryInterface } from '../repositories/TabelaRepositoryInterface';

type Request = {
  data: Array<Array<number | string | Date>>;
  tabela_nome: string;
  cliente_id: string;
};

export class EncryptDataUseCase {
  constructor(
    @inject('TabelaRepository')
    private tabelaRepository: TabelaRepositoryInterface,
    @inject('CamposRepository')
    private camposRepository: CamposRepositoryInterface,
  ) {}

  async execute({ data, tabela_nome, cliente_id }: Request): Promise<any> {
    const tabela = await this.tabelaRepository.findOne({
      where: {
        cliente_id,
        tabela_nome,
      },
      relations: ['campos'],
    });

    if (!tabela) {
      throw new AppError('Tabela não encontrada');
    }

    if(tabela.campos.length === 0) {
      throw new AppError('Tabela não possui campos');
    }


    let arrReturn = {};

    for (let i = 0; i < tabela.campos.length; i++) {
      const campo = tabela.campos[i];

    }

    for (const arrType of data) {
      // Pega o valor do array
      let value = arrType[1];

      // Pega o tipo do valor
      const type = this.getType(value);

      // Pega a chave do array
      const chaveKey: any = arrType[0];

      // Retorna o objeto criptografado
      arrReturn = { ...arrReturn, [chaveKey]: await this.encryptData(type, value, chaveKey) };
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

  async encryptData(type: string, value: any, chaveKey: string): Promise<any> {
    switch (type) {
      case 'string':
        value = value as string;
        const strObj = new StringData(value, '2cbacfc285bc26b617b2533ef91d7846b424f0a3719c31de68fd87e109cfa9f0');
        const strCrypt = await strObj.crypt();

        return strCrypt;

      case 'integer':
        value = value as number;
        const intObj = new IntegerData(value, 'eaeb82825559672c919a1933cb515c2767bfe68d1b050867f2f552bdea9ca170');
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
