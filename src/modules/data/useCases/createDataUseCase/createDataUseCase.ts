import { DateData } from "../../entities/DateData";
import { IntegerData } from "../../entities/IntegerData";
import { StringData } from "../../entities/StringData";

export class CreateDataUseCase {
  data: Array<Array<number | string | Date>>;
  constructor( data: Array<Array<number | string | Date>> ) {
    this.data = data;
  }

  async execute(): Promise<void> {
    let arrReturn = [];

    for ( const arrType of this.data ) {
      let chave:any = arrType[0];
      let value = arrType[1];

      switch ( typeof value ) {
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
        // case "Date":
        //   value = value as Date;
        //   const dateObj = new DateData( value );

        //   break;
        default:
          break;
      }
    }
  }
}
