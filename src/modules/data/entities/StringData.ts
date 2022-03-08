import { IData } from '../../interfaces/DataInterface';
export class StringData implements IData {
  value;

  constructor(value: string) {
    this.value = value;
  }

  crypt() {
    return this.value + "!";
  }

  decrypt() {
    return this.value.slice(0, -1);
  }
}
