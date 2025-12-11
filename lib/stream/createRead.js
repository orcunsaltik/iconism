const fs = require('fs');

module.exports = async (path) =>
  new Promise((resolve, reject) => {
    const s = fs.createReadStream(path);
    const e = (e) => reject(e);
    const r = () => {
      s.removeListener('error', e);
      s.removeListener('readable', r);
      resolve(s);
    };
    s.on('error', e);
    s.on('readable', r);
  });
