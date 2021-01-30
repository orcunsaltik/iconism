
const asset = require('./template/asset');

module.exports = async(opts) =>
    new Promise(async(resolve, reject) => {
        try {
            await asset('json', opts, {glyphs: opts.glyphs});
            resolve();
        } catch (e) { reject(e); }
    });
