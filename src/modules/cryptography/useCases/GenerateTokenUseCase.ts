import { convertStringToHex, cypherFeistel, keyExpansion, subkeysByteToHex } from '@shared/utils/criptografia';
import { injectable } from 'tsyringe';
import { SHA256 } from 'crypto-js';
import { Column } from '../dto/FullSchemaDto';

interface Data {
  table_name: string;
  column_name: string;
  encrypt_key: string;
  seed: string;
  table_columns_name: Array<Column>;
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

    let columnSeed = `${table_name}${table_columns_name[0].name}`
    table_columns_name.forEach((column, index) => {
      if(index != 0) {
        columnSeed = `${columnSeed}${seedBase64}${column.name}`;
      }
    });
    columnSeed = `${columnSeed}${seedBase64}${column_name}`;

    const sha = SHA256(columnSeed).toString();
    const leftSha = `${sha}`.slice(0, 32);
    const rightSha = `${sha}`.slice(32, 64);
    const tokenFeistelWithAesSubKey = cypherFeistel(leftSha, rightSha, subKeys);

    return tokenFeistelWithAesSubKey;
  }
}
