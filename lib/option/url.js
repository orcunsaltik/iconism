
const _ = require('../helper/helper');

module.exports = (filepath) => !_.isAbsolute(filepath)
            ? _.join(_.root(), filepath)
            : filepath;
