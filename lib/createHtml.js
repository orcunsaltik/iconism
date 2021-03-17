const asset = require('./template/asset');

module.exports = async (opts) =>
	new Promise((resolve, reject) => {
		asset('html', opts, {
				  name: opts.name,
				prefix: opts.prefix,
				   tag: opts.tag || 'span',
				 icons: opts.glyphs,
				  hash: opts.hash ? '?' + (+new Date).toString(36) : ''
			})
			.then(() => resolve())
			.catch(e => reject(e));
	});
