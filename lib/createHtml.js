const asset = require('./template/asset');

module.exports = async (opts) => {
  await asset('html', opts, {
    name: opts.name,
    prefix: opts.prefix,
    tag: opts.tag || 'span',
    icons: opts.glyphs,
    hash: opts.hash ? '?' + +new Date().toString(36) : '',
  });
};
