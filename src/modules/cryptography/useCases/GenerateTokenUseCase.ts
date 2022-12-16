import { AppError } from '@shared/errors/AppError';
import { convertStringToHex, cypherFeistel, keyExpansion, subkeysByteToHex } from '@shared/utils/criptografia';
import { injectable } from 'tsyringe';
import { SHA256 } from 'crypto-js';

interface Data {
  table_name: string;
  column_name: string;
  encrypt_key: string;
  seed: string;
  table_columns_name: Array<string>;
}
@injectable()
export class GenerateTokenUseCase {
  public execute(data: Data): string {
    const { table_name, column_name, encrypt_key, seed, table_columns_name } = data;

    const encryptKeyHex = convertStringToHex(encrypt_key);
    const expandedKey = keyExpansion(encryptKeyHex);
    const subKeys = subkeysByteToHex(expandedKey);

    const bufferSeed = Buffer.from(seed);
    const seedBase64 = Buffer.from(bufferSeed).toString('base64');

    let columnSeed = `${table_name}${column_name}`
    columnSeed += table_columns_name.map((name) => {
      return `${seedBase64}==${name}`;
    });
    columnSeed += `${seedBase64}==${column_name}`;

    const sha = SHA256(columnSeed).toString();
    const leftSha = `${sha}`.slice(0, 32);
    const rightSha = `${sha}`.slice(32, 64);
    const tokenFeistelWithAesSubKey = cypherFeistel(leftSha, rightSha, subKeys);

    return tokenFeistelWithAesSubKey;
  }
}
