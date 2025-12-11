const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const ejs = require('ejs');

module.exports = async (src, dest, data) => {
  const rendered = await ejs.renderFile(src, data, {
    async: true,
  });
  await writeFile(dest, rendered, 'utf8');
};
