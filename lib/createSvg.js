const name = require('../package.json').name;
const _ = require('./helper/helper');
const defaults = require('./config/defaults');
const load = require('./option/load');
const loaddefs = require('./option/loaddefs');
const urls = require('./option/urls');
const svgFont = require('./svg/font');
const extend = require('extend');

module.exports = async (opts) => {
  let type = 'dir';

  const cfg = opts.config ? await load(opts.config) : await loaddefs(name);

  opts = extend(true, defaults, opts, cfg || {});

  opts.debug = _.isFunction(opts.debug) ? opts.debug : opts.debug ? console.log : () => {};

  const oi = _.absPath(opts.input);
  const oo = _.absPath(opts.output);

  if (!oo) {
    throw new Error('Output option required!');
  } else if (!_.exists(oo) || !_.isDirectory(oo)) {
    throw new Error(`Output directory not found! - "${oo}"`);
  }

  if (!oi) {
    throw new Error('Input option required!');
  }

  let input = _.isArray(oi) && oi.length === 1 && _.isString(oi[0]) ? oi[0] : oi;

  if (_.isArray(input) && _.isObject(input[0])) {
    type = 'config';
  } else if (!_.isArray(input) && _.extname(input) === '.json') {
    type = 'file';
  } else {
    input = urls(input);
  }

  const dfo = defaults.font;
  const dao = defaults.asset;
  const cfo = ['eot', 'woff2', 'woff', 'ttf', 'svg'];
  const cao = ['html', 'css', 'scss', 'sass', 'json', 'sprite'];

  opts.input = input;
  opts.output = oo;
  opts.id = opts.id || opts.name;
  opts.begin = parseInt(opts.begin);
  opts.optimize = !!opts.optimize;
  opts.hash = !!opts.hash;

  opts.types = opts.types ? _.intersect(cfo, opts.types) : dfo.exports;
  opts.assets = opts.assets ? _.intersect(opts.assets, cao) : dao.exports;

  opts = await svgFont(opts, type);

  return opts;
};
