
import moment from 'moment';
import { IData } from '../../interfaces/DataInterface';
export class DateData implements IData {
  value;
  token;
  dateMin: string= "1000-01-01";

  constructor(value: Date, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }
  
  XOR_hex(a: string, b: string, c: string, d: string) {
    var res = "",
        i = a.length,
        j = b.length,
        k = c.length,
        l = d.length;
    while (i-->0 && j-->0 && k-->0 && l-->0)
        res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16) ^ parseInt(c.charAt(k), 16) ^ parseInt(d.charAt(l), 16)).toString(16) + res;
    return res;
  }

  h2d() {

    const div: string[] = this.token.match(/.{16}/g) || [];
    const value = this.XOR_hex( div[0], div[1], div[2], div[3]);

    function add(x: any, y: any) {
        var c = 0, r = [];
        var x = x.split('').map(Number);
        var y = y.split('').map(Number);
        while(x.length || y.length) {
            var s = (x.pop() || 0) + (y.pop() || 0) + c;
            r.unshift(s < 10 ? s : s - 10); 
            c = s < 10 ? 0 : 1;
        }
        if(c) r.unshift(c);
        return r.join('');
    }

    var dec = '0';
    value.split('').forEach(function(chr) {
        var n = parseInt(chr, 16);
        for(var t = 8; t; t >>= 1) {
            dec = add(dec, dec);
            if(n & t) dec = add(dec, '1');
        }
    });
    return dec;
  }

  // motherfucker( JUMP: number){
  //   // const mod =  JUMP % 3652060;
    
  //   // var VALOR = this.value;
  //   var VALOR = "9463-07-15"; // this.value;
  //   var diff = moment(VALOR,"YYYY-MM-DD").diff(moment(this.dateMin,"YYYY-MM-DD")); // Diferença entre a data mínima e a data informada


  //   var dias = moment.duration(diff).asDays();

  //   const sumDiasJump = parseInt(dias.toFixed(0) + JUMP);

  //   const emDias = sumDiasJump % 3287176;
    
  //   var result = new Date(this.dateMin);
  //   result.setDate(result.getDate() + emDias);    

  //   // console.log( JUMP );
  // }

  crypt() {

    const JUMP = this.h2d();    
    // Diferença entre a data mínima e a data informada
    var diff = moment(this.value,"YYYY-MM-DD").diff(moment(this.dateMin,"YYYY-MM-DD"));
    var dias = moment.duration(diff).asDays();

    const sumDiasJump = dias.toFixed(0) + JUMP;

    const emDias = parseInt(sumDiasJump) % 3287176;

    var result = new Date(this.dateMin);
    result.setDate(result.getDate() + emDias);  
    
    return moment.utc(result).format('YYYY-MM-DD');
  }

  decrypt( dateCrypted: string ) {
    const mod = this.h2d();
    const date = new Date(dateCrypted);

    // date.setDate(date.getDate() - mod);

    return moment.utc(date).format('YYYY-MM-DD');
  }
}
