export interface IData{
  value: number | string | Date;
  crypt(): number | string | Date;
  decrypt(): any;
}
