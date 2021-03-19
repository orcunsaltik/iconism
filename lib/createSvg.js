const name     = require('../package.json').name;
const _        = require('./helper/helper');
const defaults = require('./config/defaults');
const load     = require('./option/load');
const loaddefs = require('./option/loaddefs');
const urls     = require('./option/urls');
const svgFont  = require('./svg/font');

module.exports = async (opts) =>
	new Promise(async (resolve, reject) => {
		try {

			let cfg, oo, oi, type = 'dir';

			cfg = opts.config 
                ? await load(opts.config)
                : await loaddefs(name);

			opts = Object.assign({}, defaults, cfg || {}, _.clean(opts));

			opts.debug = _.isFunction(opts.debug) 
                ? opts.debug  : opts.debug 
                ? console.log : () => {};

			oi = _.absPath(opts.input);
			oo = _.absPath(opts.output);

			if (!oo) {
				throw new Error('Output option required!');
			} else if (!_.exists(oo) || !_.isDirectory(oo)) {
				throw new Error(`Output directory not found! - "${oo}"`);
			}

			if (!oi) {
				throw new Error('Input option required!');
			}

			oi = _.isArray(oi) && oi.length === 1 && _.isString(oi[0]) 
                ? oi[0] : oi;

			if (_.isArray(oi) && _.isObject(oi[0])) {
				type = 'config';
			} else if (!_.isArray(oi) && _.extname(oi) === '.json') {
				type = 'file';
			} else {
				oi = urls(oi);
			}

			const dfo = defaults.font;
			const dao = defaults.asset;
			const cfo = ['eot', 'woff2', 'woff', 'ttf', 'svg'];
			const cao = ['html', 'css', 'scss', 'sass', 'json', 'sprite'];

			opts.input    = oi;
			opts.output   = oo;
			opts.id       = opts.id || opts.name;
			opts.begin    = parseInt(opts.begin);
			opts.optimize = !!opts.optimize;
			opts.hash     = !!opts.hash;
			
			opts.types = opts.types 
				? _.intersect(cfo, opts.types) 
				: dfo.exports;
			opts.assets = opts.assets 
				? _.intersect(opts.assets, cao)
				: dao.exports;
				
			opts.templates = Object.assign({}, defaults.templates, opts.templates );
			
			opts = await svgFont(opts, type);

			resolve(opts);

		} catch (e) {
			reject(e);
		}
	});
