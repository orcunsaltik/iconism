const _ = require('../helper/helper');

module.exports = (arr) => arr.sort((a, b) => _.basename(a, '.svg') < _.basename(b, '.svg') ? -1 : 1);
