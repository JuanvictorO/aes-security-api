import { IData } from '../../interfaces/DataInterface';
import crypto from 'crypto';
import aes from 'js-crypto-aes';
export class StringData implements IData {
  value;
  token: string;
  constructor(value: string, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }

  async crypt() {

    const div: string[] = this.token.match(/.{32}/g) || [];

    const key = Buffer.from(div[0]);
    const iv = Buffer.from(div[1], 'hex');
    const value = Buffer.from(this.value);
    const teste = await aes.encrypt(value, key, {name: 'AES-CBC', iv}).then( (encrypted) => {
      return encrypted;
    });
    const valueRet = Buffer.from(teste).toString('base64');

    return valueRet;
  }

  decrypt() {
    return this.value.slice(0, -1);
  }
}
