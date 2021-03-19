const render = require('./render');
const _      = require('../helper/helper');

module.exports = async (name, opts, args) =>
	new Promise((resolve, reject) => {
		const dir = opts.output;
		const des = _.resolve(dir, `${opts.asset.names[name].replace(/%name%/, opts.name)}.${name}`);
		const tpl = _.absPath(opts.templates[name]);
		const msg = `${des} ${name} file created!`;
		render(tpl, des, args)
			.then(() => {
				opts.debug(msg);
				resolve();
			}).catch(e => reject(e));
	});
