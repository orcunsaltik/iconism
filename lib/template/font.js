const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const _ = require('../helper/helper');

module.exports = async (dir, name, data, opts) =>
  new Promise((resolve, reject) => {
    const dest = _.resolve(dir, `${opts.font.names[name].replace(/%name%/, opts.name)}.${name}`);
    writeFile(dest, data, 'utf8')
      .then(() => {
        opts.debug(`${dest} font file created!`);
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
