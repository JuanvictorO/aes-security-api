export interface IData{
  value: number | string | Date;
  crypt(): number | Promise<string> | Date;
  decrypt(): any;
}
