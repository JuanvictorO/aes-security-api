export interface IData{
  value: number | string | Date;
  crypt(): number | Promise<string> | Date | string;
  decrypt( valueCrypt:string | number ): number | Promise<string> | Date | string;
}
