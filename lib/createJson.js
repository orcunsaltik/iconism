const asset = require('./template/asset');
const fontSrc = require('./template/ffsrc');

module.exports = async (name, opts) => {
  await asset(name, opts, {
    family: opts.name,
    src: fontSrc(opts, name),
    prefix: opts.prefix,
    tag: opts.tag,
    selector: opts.selector,
    glyphs: opts.glyphs,
  });
};
