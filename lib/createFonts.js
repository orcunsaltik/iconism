const svg2ttf    = require('svg2ttf');
const ttf2eot    = require('ttf2eot');
const ttf2woff   = require('ttf2woff');
const ttf2woff2  = require('ttf2woff2');
const createFont = require('./template/font');

module.exports = async (opts) =>
	new Promise(async (resolve, reject) => {
		try {

			const dir = opts.output;
			const data = opts.svg;

			let ttf;

			// svg
			if (opts.types.includes('svg')) {
				await createFont(dir, 'svg', data, opts);
			}

			// ttf
			if (opts.types.includes('ttf')) {
				ttf = svg2ttf(data, {});
				await createFont(dir, 'ttf', ttf.buffer, opts);
			}

			// eot
			if (opts.types.includes("eot")) {
				const eot = ttf2eot(ttf && new Uint8Array(ttf.buffer) || new Uint8Array(svg2ttf(data, {}).buffer));
				await createFont(dir, 'eot', eot.buffer, opts);
			}

			// woff
			if (opts.types.includes("woff")) {
				const woff = ttf2woff(ttf && new Uint8Array(ttf.buffer) || new Uint8Array(svg2ttf(data, {}).buffer));
				await createFont(dir, 'woff', woff.buffer, opts);
			}

			// woff2
			if (opts.types.includes("woff2")) {
				const woff2 = ttf2woff2(ttf && ttf.buffer || svg2ttf(data, {}).buffer);
				await createFont(dir, 'woff2', woff2, opts);
			}

			resolve();

		} catch (e) {
			reject(e);
		}
	});
