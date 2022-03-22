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

  crypt() {

    const div: string[] = this.token.match(/.{16}/g) || [];
    const value = this.XOR_hex( div[0], div[1], div[2], div[3]);

    const valInt = 2058867887756491758; // DESCOBRIR COMO CONVERTER O value PARA UInt64;

    const mod = valInt % 3652060;

    const date = new Date(this.value);

    date.setDate(date.getDate() + mod);

    return moment.utc(date).format('YYYY-MM-DD');
  }

  decrypt() {
    return new Date(this.value);
  }
}
