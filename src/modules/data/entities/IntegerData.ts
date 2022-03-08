import { IData } from "../../interfaces/DataInterface";

export class IntegerData implements IData{
  value;

  constructor(value: number) {
    this.value = value;
  }

  crypt() {
    return this.value * 2;
  }

  decrypt() {
    return this.value / 2;
  }
}
