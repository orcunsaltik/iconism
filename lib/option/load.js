/* eslint no-empty: "off" */

const read = require('../stream/createRead');
const tStr = require('../stream/toString');

module.exports = async (filepath) => {
  let config;
  try {
    config = require(filepath);
  } catch (e) {
    try {
      config = await read(filepath);
      config = await tStr(config);
      config = JSON.parse(config);
    } catch (e) {}
  }
  return config;
};
