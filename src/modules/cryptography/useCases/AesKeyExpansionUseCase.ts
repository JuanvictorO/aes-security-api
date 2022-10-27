import { AppError } from '@shared/errors/AppError';
import { convertStringToBinary, convertStringToHex, cypherFeistel } from '@shared/utils/criptografia';
import { inject, injectable } from 'tsyringe';
import Base64 from 'crypto-js/enc-base64';
import { SHA256 } from 'crypto-js';

@injectable()
export class AesKeyExpansionUseCase {
  public async execute(): Promise<any> {
    const tableName = 'exampleTable';
    const columnName = 'client_name';
    const encryptKey = process.env.EncryptKey;
    if (!encryptKey) {
      throw new AppError('Undefined Encrypt Key');
    }

    const encryptKeyHex = convertStringToHex(encryptKey);

    const subKeys = [
      '2a5f68291e6a5e1e26531f5c65175a1a',
      'd8e1ca64c68b947ae0d88b2685cfd13c',
      '56df21f39054b589708c3eaff543ef93',
      '4400fd15d454489ca4d87633519b99a0',
      '40ee1dc494ba55583062236b61f9bacb',
      'f91a022b6da057735dc274183c3bced3',
      '5b9164c0363133b36bf347ab57c88978',
      '3336d89b0507eb286ef4ac83393c25fb',
      'c309d789c60e3ca1a8fa902291c6b5d9',
      '41dce20887d2dea92f284e8bbeeefb52',
    ];

    const entropySeed = process.env.EntropySeedString;
    if (!entropySeed) {
      throw new AppError('Undefined Encrypt Key');
    }

    //const seedToBinary = convertStringToBinary(entropySeed);

    const base64EncodedStr = btoa(unescape(encodeURIComponent(entropySeed)));

    const columnSeed = `${tableName}client_nameSW50ZWdyaXR5RXhhbXBsZQ==clientSince_dateSW50ZWdyaXR5RXhhbXBsZQ==cardHolder_nameSW50ZWdyaXR5RXhhbXBsZQ==card_numberSW50ZWdyaXR5RXhhbXBsZQ==cardExpiration_dateSW50ZWdyaXR5RXhhbXBsZQ==${columnName}`;

    const sha = SHA256(columnSeed).toString();

    const leftSha = `${sha}`.slice(0,32);
    const rightSha = `${sha}`.slice(33,64);

    const tokenFeistelWithAesSubKey = cypherFeistel(leftSha, rightSha, subKeys);
    return tokenFeistelWithAesSubKey;
  }
}
