import { DateData } from "../../entities/DateData";
import { IntegerData } from "../../entities/IntegerData";
import { StringData } from "../../entities/StringData";

export class CreateDataUseCase {
  dataType: string = "integer";
  data: number | string | Date;
  constructor( dataType: string, data: number | string | Date ) {
    this.dataType = dataType;
    this.data = data;
  }

  async execute(): Promise<void> {
    let intObj;
    if ( this.dataType === "integer" ) {
      this.data = this.data as number;
      intObj = new IntegerData( this.data );
    }else if ( this.dataType === "string" ) {
      this.data = this.data as string;
      intObj = new StringData( this.data );
    }else{
      this.data = this.data as Date;
      intObj = new DateData( this.data );
    }
    console.log( intObj.crypt() );
  }
}
