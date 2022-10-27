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
  let leftBites = parseInt(hex2bin(left));
  console.log(leftBites);
  let rightBites = parseInt(hex2bin(right));

  const binarySubKey = parseInt(hex2bin(aesSubKeys[0]));

  console.log(binarySubKey);

  const rightXorSubKey = binarySubKey ^ rightBites;

  console.log(rightXorSubKey);

  const leftXorSubKey = leftBites ^ rightXorSubKey;

  return binaryAgent(`${parseInt(`${leftXorSubKey}`, 2).toString(16)}`);
};

export const binaryAgent = (str: string): string => {
  const newBin = str.split(' ');
  let binCode = [];

  for (let i = 0; i < newBin.length; i++) {
    binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
  }
  return binCode.join('');
};


