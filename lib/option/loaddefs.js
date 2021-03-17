/* eslint no-empty: "off" */

const load = require('./load');
const cfns = require('./cfgfiles');
const _    = require('../helper/helper');

module.exports = async(n) => {
    let config;
    const files = cfns(n);
    for (const file of files) {
        try { 
            config = await load(_.resolve(_.root, file));
            if (config) break;
        } catch (e) {}
    } return config;
};
