const asset   = require('./template/asset');
const fontSrc = require('./template/ffsrc');

module.exports = async (name, opts) =>
	new Promise((resolve, reject) => {
		asset(name, opts, {
				  family: opts.name,
				     src: fontSrc(opts, name),
				  prefix: opts.prefix,
				     tag: opts.tag,
				selector: opts.selector,
				  glyphs: opts.glyphs
			})
			.then(() => resolve())
			.catch(e => reject(e));
	});
