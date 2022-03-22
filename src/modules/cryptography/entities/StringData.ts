import { IData } from '../../interfaces/DataInterface';
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

  async decrypt( valueCrypted: string ) {
    const div: string[] = this.token.match(/.{32}/g) || [];

    const key = Buffer.from(div[0]);
    const iv = Buffer.from(div[1], 'hex');

    const teste2 = await aes.decrypt(new Uint8Array(Buffer.from(valueCrypted)), key, {name: 'AES-CBC', iv}).then( (decrypted) => {
      return decrypted;
    });

    const message = Buffer.from(teste2).toString();

    return message;
  }
}
