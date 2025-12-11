const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const getProps = require('./xml');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

module.exports = async (filepath, optimize, svgo, opts) => {
  let file = await readFile(filepath, 'utf8');
  let xml;

  if (optimize) {
    file = await svgo(file, {
      path: filepath,
      ...opts,
    });
    xml = await parser.parseStringPromise(file.data);
  } else {
    xml = await parser.parseStringPromise(file);
  }

  const glyph = getProps(xml);

  if (!glyph.width) {
    throw new Error(`Glyphs must have width attribute! - ${glyph.width}`);
  }

  if (!glyph.height) {
    throw new Error(`Glyphs must have height attribute! - ${glyph.height}`);
  }

  return glyph;
};
