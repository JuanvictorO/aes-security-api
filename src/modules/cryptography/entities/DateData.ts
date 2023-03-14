export class DateData {
  value;
  token;
  timestamp: number = new Date(9999, 11, 31).getTime() - new Date(1001, 0, 1).getTime();

  constructor(value: Date, chaveKey: string) {
    this.value = value;
    this.token = chaveKey;
  }

  XOR_hex(a: string, b: string, c: string, d: string, e: string, f: string, g: string) {
    g = g.padStart(10, '0');
    var res = '',
      i = a.length,
      j = b.length,
      k = c.length,
      l = d.length,
      m = e.length,
      n = f.length,
      o = g.length;
    while (i-- > 0 && j-- > 0 && k-- > 0 && l-- > 0 && m-- > 0 && n-- > 0 && o-- > 0)
      res =
        (
          parseInt(a.charAt(i), 16) ^
          parseInt(b.charAt(j), 16) ^
          parseInt(c.charAt(k), 16) ^
          parseInt(d.charAt(l), 16) ^
          parseInt(e.charAt(m), 16) ^
          parseInt(f.charAt(n), 16) ^
          parseInt(g.charAt(o), 16)
        ).toString(16) + res;
    return res;
  }

  h2d() {
    const div: string[] = this.token.match(/.{4,10}/g) || [];
    const value = this.XOR_hex(div[0], div[1], div[2], div[3], div[4], div[5], div[6]);

    function add(x: any, y: any) {
      var c = 0,
        r = [];
      var x = x.split('').map(Number);
      var y = y.split('').map(Number);
      while (x.length || y.length) {
        var s = (x.pop() || 0) + (y.pop() || 0) + c;
        r.unshift(s < 10 ? s : s - 10);
        c = s < 10 ? 0 : 1;
      }
      if (c) r.unshift(c);
      return r.join('');
    }

    var dec = '0';
    value.split('').forEach(function (chr) {
      var n = parseInt(chr, 16);
      for (var t = 8; t; t >>= 1) {
        dec = add(dec, dec);
        if (n & t) dec = add(dec, '1');
      }
    });
    return dec;
  }

  crypt() {
    const dateValue = new Date(this.value);
    return new Date(dateValue.getTime() + (parseInt(this.h2d()) % this.timestamp));
  }

  decrypt(dateCrypted: string) {
    return new Date(new Date(dateCrypted).getTime() - (parseInt(this.h2d()) % this.timestamp));
  }
}
