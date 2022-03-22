import moment from 'moment';
import { IData } from '../../interfaces/DataInterface';
export class DateData implements IData {
  value;
  token;
  constructor(value: Date, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }

  XOR_hex(a: string, b: string, c: string, d: string) {
    var res = "",
        i = a.length,
        j = b.length,
        k = c.length,
        l = d.length;
    while (i-->0 && j-->0 && k-->0 && l-->0)
        res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16) ^ parseInt(c.charAt(k), 16) ^ parseInt(d.charAt(l), 16)).toString(16) + res;
    return res;
  }

  getUInt64() {
    const div: string[] = this.token.match(/.{16}/g) || [];
    const value = this.XOR_hex( div[0], div[1], div[2], div[3]);
    const fromHexString = (hexString: any) => new Uint8Array(hexString.match(/.{1,2}/g).map((byte: string) => parseInt(byte, 16)));

    const arrayUInt8 = fromHexString(value); // DESCOBRIR COMO CONVERTER O value PARA UInt64;

    const valInt = (new BigUint64Array(arrayUInt8.buffer)[0]).toString();

    const mod = parseInt(valInt) % 3652060;

    return mod;
  }

  crypt() {

    const mod = this.getUInt64();
    const date = new Date(this.value);

    date.setDate(date.getDate() + mod);

    return moment.utc(date).format('YYYY-MM-DD');
  }

  decrypt( dateCrypted: string ) {
    const mod = this.getUInt64();
    const date = new Date(dateCrypted);

    date.setDate(date.getDate() - mod);

    return moment.utc(date).format('YYYY-MM-DD');
  }
}
