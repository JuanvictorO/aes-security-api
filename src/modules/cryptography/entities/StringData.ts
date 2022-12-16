import { IData } from '../../interfaces/DataInterface';
import aes from 'js-crypto-aes';
export class StringData implements IData {
  value;
  token: string;
  constructor(value: string, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }

  base64ToArrayBuffer(base64: string){
    var binary_string = Buffer.from(base64, 'base64').toString('binary');
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async crypt() {
    const div: string[] = this.token.match(/.{32}/g) || [];
    console.log(div)
    const key = new Uint8Array(Buffer.from(div[0]));
    const iv = Buffer.from(div[1], 'hex');
    console.log(iv)
    const value = new Uint8Array(Buffer.from(this.value));
    console.log(value);
    const teste = await aes.encrypt(value, key, {name: 'AES-CBC', iv});
    console.log(teste);
    const valueRet = Buffer.from(teste).toString('base64');
    console.log(valueRet);
    return valueRet;
  }

  async decrypt( valueCrypted: string ) {
    const div: string[] = this.token.match(/.{32}/g) || [];

    const key = Buffer.from(div[0]);
    const iv = Buffer.from(div[1], 'hex');

    const bufValue = Buffer.from(this.base64ToArrayBuffer(valueCrypted)); // Converte a string em base64 para arraybuffer
    const uintValue = new Uint8Array(bufValue); // Converte o arraybuffer em uint8array


    const teste2 = await aes.decrypt(uintValue, key, {name: 'AES-CBC', iv}).then( (decrypted) => {
      return decrypted;
    });

    const message = Buffer.from(teste2).toString();

    return message;
  }
}
