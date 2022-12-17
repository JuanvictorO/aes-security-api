import { IData } from '../../interfaces/DataInterface';
//import aes from 'js-crypto-aes';
import { AES, enc, mode, pad } from 'crypto-js';
import { convertHexToString } from '@shared/utils/criptografia';
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

  crypt() {
    const div: string[] = this.token.match(/.{32}/g) || [];
    const key = enc.Hex.parse(div[0]);
    const iv = enc.Hex.parse(div[1]);

    const aesEncrypt = AES.encrypt(this.value, key, {
      keySize: 128/8,
      iv: iv,
      mode: mode.CBC,
    });

    return aesEncrypt.toString();
  }

  decrypt() {
    const div: string[] = this.token.match(/.{32}/g) || [];

    const key = enc.Hex.parse(div[0]);
    const iv = enc.Hex.parse(div[1]);

    const aesDecryptHex = AES.decrypt(this.value, key, {
      keySize: 128/8,
      iv: iv,
      mode: mode.CBC,
    });
    const dataDecrypted = convertHexToString(aesDecryptHex.toString());

    return dataDecrypted;
  }
}
