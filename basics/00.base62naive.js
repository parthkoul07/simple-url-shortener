const alphabet="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base=alphabet.length;

function encode(dbId){   //database id;
  if(dbId===0) return alphabet[0];
  let str = "";    //the short code;
  while(dbId>0){
    let rem = dbId % base;
    str = alphabet[rem] + str;  //prepend the character;
    dbId = Math.floor(dbId/base);
  }
  return str;
}

function decode(str){
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    let charValue = alphabet.indexOf(str[i]);
    num = (num * base) + charValue;
  }
  return num;   //returns database id;
}

const dbId = 123456789;
const shortUrl = encode(dbId); 
console.log(`Encoded: ${shortUrl}`); // Output: "8m0Kx"

const originalId = decode(shortUrl);
console.log(`Decoded: ${originalId}`); // Output: 123456789


