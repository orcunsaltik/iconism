
const fs        = require('fs');
const util      = require('util');
const writeFile = util.promisify(fs.writeFile);
const ejs       = require('ejs');

module.exports = async (src, dest, data) =>
    new Promise(async(resolve, reject) => {
        try {
            const rendered = await ejs.renderFile(src, data, {async: true});
            await writeFile(dest, rendered, 'utf8');
            resolve();
        } catch (e) {
            reject(e);
        }
    });
