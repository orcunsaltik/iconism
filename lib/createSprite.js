const render = require('./template/render');
const assets = require('./config/defaults').asset.names;
const _ = require('./helper/helper');

module.exports = async (opts) => {
  const dir = opts.output || '.';
  const des = _.resolve(dir, `${assets.sprite.replace(/%name%/, opts.name)}.svg`);
  const tpl = _.absPath(opts.templates.sprite);
  const obj = {
    symbols: opts.symbols,
    metadata: opts.metadata,
  };

  await render(tpl, des, obj);
  opts.debug(`${des} sprite file created!`);
};
