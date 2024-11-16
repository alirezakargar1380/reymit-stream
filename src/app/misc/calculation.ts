const getRandomValues = require('get-random-values');


// dec2hex :: Integer -> String
// i.e. 0-255 -> '00'-'ff'
export const dec2hex = (dec: any) => {
    return dec.toString(16).padStart(2, "0");
}


// generateId :: Integer -> String
export const generateId = (len: any) => {
    const arr = new Uint8Array((len || 40) / 2);
    getRandomValues(arr);
    return Array.from(arr, module.exports.dec2hex).join('');
}