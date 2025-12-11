const createSvg = require('./createSvg');
const createAssets = require('./createAssets');
const createFonts = require('./createFonts');

module.exports = async (opts) =>
  new Promise((resolve, reject) => {
    try {
      opts = opts || {};
      createSvg(opts).then(opts => {
        createFonts(opts).then(() => {
          createAssets(opts).then(() => {
            resolve(opts);
          }).catch(e => reject(e));
        }).catch(e => reject(e));
      }).catch(e => reject(e));
    } catch (e) {
      reject(e);
    }
  });
