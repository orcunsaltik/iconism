
const {
    extname, 
    basename, 
    join, 
    resolve,
    dirname,
    sep,
    isAbsolute
}        = require('path');
const fs = require('fs');

const helper = {
     intersect: (obj, arg) => obj.filter(v => arg.includes(v)),
       inArray: (obj, arg) => obj.indexOf(arg) < 0,
        unique: (obj) => obj.filter((v, i) => obj.indexOf(v) === i),
      isObject: obj => Object.prototype.toString.call(obj) === '[object Object]',
       isArray: obj => Object.prototype.toString.call(obj) === '[object Array]',
      isString: obj => Object.prototype.toString.call(obj) === '[object String]',
    isFunction: obj => typeof obj === 'function',
   isDirectory: obj => fs.lstatSync(obj).isDirectory(),
    isAbsolute: obj => isAbsolute(obj),  
        exists: obj => fs.existsSync(obj),
       extname: obj => extname(obj),
          join: (obj, arr) => join(obj, arr),
       resolve: (obj, arr) => resolve(obj, arr),
      basename: (obj, ext) => basename(obj, ext),
       dirname: (obj) => dirname(obj),
           sep: sep,
          root:  () => { 
                    const pwd = (process.cwd() || process.env.PWD || process.env.INIT_CWD).split(/\\|\//); 
                    const cfd = __dirname.split(sep);
                    return cfd.slice(0, cfd.indexOf(pwd.slice(-2)[0]) + 1).join(sep);
                }   
};

helper.clean = obj => {
    const n = {};
    Object.keys(obj).filter(k => obj[k] !== undefined &&
                                (!helper.isArray(obj[k]) || obj[k].length !== 0))
                   .forEach(k => n[k] = obj[k]);
    return n;
};

module.exports = helper;