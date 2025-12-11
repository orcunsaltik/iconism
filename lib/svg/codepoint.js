module.exports = (str) => {
  let u = '';
  let i = 0;
  for (; i < str.length; i++) {
    u += '&#x' + str.charAt(i).codePointAt(0).toString(16) + ';';
  }
  return u;
};
