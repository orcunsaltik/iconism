
const fs       = require('fs');
const util     = require('util');
const readFile = util.promisify(fs.readFile);
const getProps = require('./xml');
const xml2js   = require('xml2js');
const parser   = new xml2js.Parser();

module.exports = async(filepath, optimize, svgo) =>
    new Promise(async(resolve, reject) => {
        try {
            let file = await readFile(filepath, 'utf8'), xml, glyph;

            if (optimize) {
                file = await svgo.optimize(file, {path: filepath});
                 xml = await parser.parseStringPromise(file.data);
            } else {
                 xml = await parser.parseStringPromise(file);
            }

            glyph = getProps(xml);

            if (!glyph.width) {
                throw new Error(`Glyphs must have width attribute! - ${glyph.width}`);
            }

            if (!glyph.height) {
                throw new Error(`Glyphs must have height attribute! - ${glyph.height}`);
            }

            resolve(glyph);

        } catch (e) { reject(e); }
    });