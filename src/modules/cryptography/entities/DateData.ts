
import moment from 'moment';
import { IData } from '../../interfaces/DataInterface';
export class DateData {
  value;
  token;
  dateMin: string= "1000-01-01";

  constructor(value: Date, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }

  XOR_hex(a: string, b: string, c: string, d: string, e: string, f: string, g: string, h: string) {
    var res = "",
        i = a.length,
        j = b.length,
        k = c.length,
        l = d.length,
        m = e.length,
        n = f.length,
        o = g.length,
        p = h.length;
    while (i-->0 && j-->0 && k-->0 && l-->0 && m-->0 && n-->0 && o-->0 && p-->0)
        res = (parseInt(a.charAt(i), 16) ^ parseInt(b.charAt(j), 16) ^ parseInt(c.charAt(k), 16) ^ parseInt(d.charAt(l), 16) ^ parseInt( e.charAt(m), 16 ) ^ parseInt( f.charAt(n), 16 ) ^ parseInt( g.charAt(o), 16 ) ^ parseInt( h.charAt(p), 16 ) ).toString(16) + res;
    return res;
  }

  h2d() {

    const div: string[] = this.token.match(/.{8}/g) || [];
    const value = this.XOR_hex( div[0], div[1], div[2], div[3], div[4], div[5], div[6], div[7] );

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

  crypt() {

    const JUMP = this.h2d();

    // Diferença entre a data mínima e a data informada
    var diff = moment(this.value,"YYYY-MM-DD").diff(moment(this.dateMin,"YYYY-MM-DD"));
    var dias = moment.duration(diff).asDays();

    var diasFixo = dias.toFixed(0);


    var jumpPlusDays: number = parseInt(diasFixo) + parseInt(JUMP);

    var limite: number = 3287177;
    const emDias = jumpPlusDays % limite;

    var result = new Date(this.dateMin);

    result.setUTCDate(result.getUTCDate() + emDias );

    return moment.utc(result).format('YYYY-MM-DD');
  }

  decrypt( dateCrypted: string ) {
    const JUMP = this.h2d();

    // Diferença entre a data mínima e a data informada
    var diff = moment(dateCrypted,"YYYY-MM-DD").diff(moment(this.dateMin,"YYYY-MM-DD"));
    var dias = moment.duration(diff).asDays();

    var diasFixo = dias.toFixed(0);

    console.log(diasFixo);

    var jumpPlusDays: number = parseInt(diasFixo) + parseInt(JUMP);

    var limite: number = 3287177;
    const emDias = jumpPlusDays % limite;

    var result = new Date(this.dateMin);

    result.setUTCDate(result.getUTCDate() - emDias );

    return moment.utc(result).format('YYYY-MM-DD');
  }
}
