
const url    = require('./option/url');
const render = require('./template/render');
const assets = require('./config/defaults').asset.names;
const _      = require('./helper/helper');

module.exports = async(opts) =>
    new Promise(async(resolve, reject) => {
        const dir = opts.output || '.';
        const des = _.resolve(dir, `${assets.sprite.replace(/%name%/, opts.name)}.svg`);
        const tpl = url(opts.templates.sprite);
        const obj = {
             symbols: opts.symbols,
            metadata: opts.metadata
        };
        render(tpl, des, obj)
            .then(() => {
                opts.debug(`${des} sprite file created!`);
                resolve();
            }).catch(e => reject(e));
    });
