
const createStyle  = require('./createStyle');
const createHtml   = require('./createHtml');
const createJson   = require('./createJson');
const createSprite = require('./createSprite');

module.exports = async (opts) =>
    new Promise(async(resolve, reject) => {        
        try {
            // css
            if (opts.assets.includes('css')) {
                await createStyle('css', opts);
            }
            // sass
            if (opts.assets.includes('sass')) {
                await createStyle('sass', opts);
            }
            // scss
            if (opts.assets.includes('scss')) {
                await createStyle('scss', opts);
            }
             // html
            if (opts.assets.includes('html')) {
                await createHtml(opts);
            }
            // json
            if (opts.assets.includes('json')) {
                await createJson(opts);
            }
            // sprite
            if (opts.assets.includes('sprite')) {
                await createSprite(opts);
            }

            resolve();
            
        } catch (e) {
            reject(e);
        }
    });
