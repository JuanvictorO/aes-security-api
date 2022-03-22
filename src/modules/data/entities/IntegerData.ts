import { IData } from "../../interfaces/DataInterface";
export class IntegerData implements IData {
  value;
  token: string;
  constructor(value: number, chaveKey: string) {
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

    return this.value + (valInt % 2147483647);
  }

  decrypt() {
    return this.value / 2;
  }
}
