import { IData } from '../../interfaces/DataInterface';
export class DateData implements IData {
  value;

  constructor(value: Date) {
    this.value = value;
  }

  crypt() {
    const arrDate = this.value.toString().split("-");
    const year = Number(arrDate[0]) + 1;
    const month = Number(arrDate[1]) + 1;
    const day = Number(arrDate[2]) + 1;
    return `${year}-${month}-${day}`;
  }

  decrypt() {
    return new Date(this.value);
  }
}
