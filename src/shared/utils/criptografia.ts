export const convertStringToHex = (str: string): string => {
  return str
    .split('')
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

export const convertHexToString = (hex: string): string => {
  return hex
    .split(/(\w\w)/g)
    .filter(p => !!p)
    .map(c => String.fromCharCode(parseInt(c, 16)))
    .join('');
};

export const hex2bin = (hexSource: string): string => {
  var bin = '';
  for (var i=0;i<hexSource.length;i=i+2) {
      bin += String.fromCharCode(hexdec(hexSource.substr(i,2)));
  }
  return bin;
}

const hexdec = (hexString: string): number => {
  hexString = (hexString + '').replace(/[^a-f0-9]/gi, '')
  return parseInt(hexString, 16)
}

export const convertStringToBinary = (str: string): string => {
  let res = '';
  res = str
    .split('')
    .map(char => {
      return char.charCodeAt(0).toString(2);
    })
    .join('');
  return res;
};

export const cypherFeistel = (left: string, right: string, aesSubKeys: Array<string>): string => {
  for(let i = 0; i < 10; i++) {
    const rightXorSubKey = hexXor(right, aesSubKeys[i]);
    const leftXorSubKey = hexXor(left, rightXorSubKey);
    right = leftXorSubKey;
    left = rightXorSubKey;
  }

  return left + right;
};

export const hexXor = function (hex1: string, hex2: string) {
  const buf1 = Buffer.from(hex1, 'hex');
  const buf2 = Buffer.from(hex2, 'hex');
  const bufResult = buf1.map((b, i) => b ^ buf2[i]);
  return bufResult.toString('hex');
};

export const toHexString = function (byteArray: Uint8Array) {
  return byteArray.reduce((output, elem) =>
    (output + ('0' + elem.toString(16)).slice(-2)), '');
};

export const convertBase = function () {

  function convertBase(baseFrom: number, baseTo: number) {
      return function (num: string) {
          return parseInt(num, baseFrom).toString(baseTo);
      };
  }

  // binary to decimal
  convertBase.bin2dec = convertBase(2, 10);

  // binary to hexadecimal
  convertBase.bin2hex = convertBase(2, 16);

  // decimal to binary
  convertBase.dec2bin = convertBase(10, 2);

  // decimal to hexadecimal
  convertBase.dec2hex = convertBase(10, 16);

  // hexadecimal to binary
  convertBase.hex2bin = convertBase(16, 2);

  // hexadecimal to decimal
  convertBase.hex2dec = convertBase(16, 10);

  return convertBase;
}();


