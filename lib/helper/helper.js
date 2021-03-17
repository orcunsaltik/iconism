const {
	extname,
	basename,
	join,
	resolve,
	dirname,
	sep
} = require('path');
const fs = require('fs');
const os = require('os');
const root = require('njfs').root;

const _ = {
	  intersect: (obj, arg) => obj.filter(v => arg.includes(v)),
	    inArray: (obj, arg) => obj.indexOf(arg) < 0,
	     unique: (obj) => obj.filter((v, i) => obj.indexOf(v) === i),
	   isObject: obj => Object.prototype.toString.call(obj) === '[object Object]',
	    isArray: obj => Object.prototype.toString.call(obj) === '[object Array]',
	   isString: obj => Object.prototype.toString.call(obj) === '[object String]',
	 isFunction: obj => typeof obj === 'function',
	isDirectory: obj => fs.lstatSync(obj).isDirectory(),
	 isAbsolute: obj => os.platform() !== 'win32' ? /^\w:\//.test(obj) : /^\//.test(obj),
	     exists: obj => fs.existsSync(obj),
	    extname: obj => extname(obj),
	       join: (obj, arr) => join(obj, arr),
	    resolve: (obj, arr) => resolve(obj, arr),
	   basename: (obj, ext) => basename(obj, ext),
	    dirname: (obj) => dirname(obj),
	        sep: sep,
	       root: root(),
	  cleanPath: obj => obj.replace(/(\\|\/)+/g, '/')
};

_.clean = obj => {
	const n = {};
	Object.keys(obj).filter(k => obj[k] !== undefined &&
			(!_.isArray(obj[k]) || obj[k].length !== 0))
		.forEach(k => n[k] = obj[k]);
	return n;
};

_.absPath = obj => {
	obj = _.cleanPath(obj);
	return !_.isAbsolute(obj) ?
		resolve(_.root, obj) :
		obj;
};

module.exports = _;
