import { verificaData } from "../../../../shared/utils/verificaData";
import { DateData } from "../../entities/DateData";
import { IntegerData } from "../../entities/IntegerData";
import { StringData } from "../../entities/StringData";

export class CreateDataUseCase {
  data: Array<Array<number | string | Date>>;
  constructor( data: Array<Array<number | string | Date>> ) {
    this.data = data;
  }

  async execute(): Promise<any[]> {
    let arrReturn = [];

    for ( const arrType of this.data ) {

      let value = arrType[1];
      let type;

      if( typeof value === "string" ) {
        type = verificaData( value ) ? "date" : "string";
      }else{
        type = "number";
      }

      let chave:any = arrType[0];
      switch ( type ) {
        case "number":
          value = value as number;
          const intObj = new IntegerData( value );
          const intCrypt = intObj.crypt();
          arrReturn[ chave ] = intCrypt;
          break;
        case "string":
          value = value as string;
          const strObj = new StringData( value );
          const strCrypt = strObj.crypt();
          arrReturn[ chave ] =  strCrypt;
          break;
        case "date":
          value = value as Date;
          const dateObj = new DateData( value );
          const dateCrypt = dateObj.crypt();
          arrReturn[ chave ] = dateCrypt;
          break;
        default:
          break;
      }
    }
    return arrReturn;
  }
}
