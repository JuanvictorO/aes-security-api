import moment from "moment";

export const verificaData = ( data: string ): boolean => {
  // use moment.js to validate if is date

  const momentData = moment( data, 'YYYY-MM-DD' );
  return momentData.isValid() && /^\d{4}-\d{2}-\d{2}$/.test( data );
}
