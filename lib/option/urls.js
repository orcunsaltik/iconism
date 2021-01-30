
const _ = require('../helper/helper');

module.exports = (ip) => {
    ip = !_.isArray(ip) ? [ip] : ip;
    const ife = (file) => _.extname(file).toLowerCase();
    return _.unique(ip.filter((file) => {
        const ext = ife(file);
        return ext === '' || ext === '.svg';
    }).map((file) => {
        const ext = ife(file);
        return  ext === ''
            ? file.replace(/\/$/, '') + '/*.svg'
            : file;
    }));
};