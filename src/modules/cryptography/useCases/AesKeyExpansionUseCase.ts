import { AppError } from '@shared/errors/AppError';
import { convertStringToHex, cypherFeistel, keyExpansion, subkeysByteToHex } from '@shared/utils/criptografia';
import { inject, injectable } from 'tsyringe';
import Base64 from 'crypto-js/enc-base64';
import { SHA256 } from 'crypto-js';

interface Data {
  column_name: string;
}
@injectable()
export class AesKeyExpansionUseCase {
  public async execute(data: Data): Promise<any> {
    const tableName = 'exampleTable';
    const columnName = data.column_name;
    const encryptKey = process.env.EncryptKey;
    if (!encryptKey) {
      throw new AppError('Undefined Encrypt Key');
    }

    const encryptKeyHex = convertStringToHex(encryptKey);
    const expandedKey = keyExpansion(encryptKeyHex);
    const subKeys = subkeysByteToHex(expandedKey);

    const entropySeed = process.env.EntropySeedString;
    if (!entropySeed) {
      throw new AppError('Undefined Encrypt Key');
    }

    //const seedToBinary = convertStringToBinary(entropySeed);

    // const base64EncodedStr = btoa(unescape(encodeURIComponent(entropySeed)));

    const columnSeed = `${tableName}client_nameSW50ZWdyaXR5RXhhbXBsZQ==clientSince_dateSW50ZWdyaXR5RXhhbXBsZQ==cardHolder_nameSW50ZWdyaXR5RXhhbXBsZQ==card_numberSW50ZWdyaXR5RXhhbXBsZQ==cardExpiration_dateSW50ZWdyaXR5RXhhbXBsZQ==${columnName}`;

    const sha = SHA256(columnSeed).toString();
    const leftSha = `${sha}`.slice(0,32);
    const rightSha = `${sha}`.slice(32,64);
    const tokenFeistelWithAesSubKey = cypherFeistel(leftSha, rightSha, subKeys);

    return tokenFeistelWithAesSubKey;
  }
}
