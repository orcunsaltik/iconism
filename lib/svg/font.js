
const glob     = require('glob');
const svgpath  = require('svgpath');
const SVGO     = require('svgo');
const ejs      = require('ejs');
const _        = require('../helper/helper');
const getGlyph = require('../glyph/get');
const url      = require('../option/url');
const load     = require('../option/load');
const uc2hd    = require('./codepoint');
const sort     = require('./sort');

module.exports = async(opts, type) => new Promise(async(resolve, reject) => {
    try {

        const inputs = type === 'dir' 
                ? sort(_.unique(opts.input.flatMap(file => glob.sync(file))))
                : type === 'file' 
                ? await load(opts.innput)
                : opts.input;

        if (!inputs.length) {
            throw new Error(`${opts.input}: No Input File!`);
        }
        
        const svgo = new SVGO(opts.svgo);

        const titles  = [];
        const points  = [];
        const glyphs  = [];

        let maxWidth  = 0;
        let maxHeight = 0;
        let glyph;    
        
        opts.glyphs  = [];
        opts.symbols = [];
        
        if (type === 'dir') {
            for (const input of inputs) {

                glyph      = await getGlyph(input, opts.optimize, svgo);
                maxWidth   = glyph.width  > maxWidth  ? glyph.width  : maxWidth;
                maxHeight  = glyph.height > maxHeight ? glyph.height : maxHeight;
                glyph.name = _.basename(input, '.svg');

                if (titles.includes(glyph.name)) {
                    throw new Error(`Glyph names must be unique: ${glyph.name}`);
                }

                glyph.path = input;
                
                opts.symbols.push({
                         id: glyph.name, 
                          d: glyph.d,
                    viewBox: glyph.viewBox
                });
                
                glyphs.push(glyph);
            }
        } else {
            for (const input of inputs) {

                if (!input.name) {
                    throw new Error(`Glyph name required!`);
                }

                if (titles.includes(input.name)) {
                    throw new Error(`Glyph names must be unique! - ${input.name}`);
                } 

                if (!input.unicode) {
                    throw new Error(`Glyph codepoint required! - ${input.name}`);
                }

                if (input.d) {                
                    input.width  = parseInt(input.width);
                    input.height = parseInt(input.height);
                    input.d      = opts.optimize 
                                        ? svgo.optimize(input.d) 
                                        : input.d;
                } else if (input.path) {
                    
                    const { d, width, height, viewBox
                    } = await getGlyph(input.path, opts.optimize, svgo);
                    
                    input.d       = d;
                    input.width   = input.width   || width;
                    input.height  = input.height  || height;
                    input.viewBox = input.viewBox || viewBox;
                }

                if (input.width <= 0) {
                    throw new Error(`Glyph width required! - ${input.name}`);
                }
                
                if (input.height <= 0) {
                    throw new Error(`Glyph height required! - ${input.name}`);
                }

                maxWidth  = input.width  >  maxWidth ?  input.width : maxWidth;
                maxHeight = input.height > maxHeight ? input.height : maxHeight;

                input.viewBox = input.viewBox || `0 0 ${input.width} ${input.height}`;

                opts.symbols.push({
                         id: input.name, 
                          d: input.d,
                    viewBox: input.viewBox
                });

                ((str) => {
                    for (let i = 0; i < str.length; i++) {
                        points.push(str.charAt(i).codePointAt(0));
                    }
                })(input.unicode);          

                glyphs.push(input);
            }
        }

        opts.width   = opts.width || maxWidth;               
        opts.descent = opts.descent > 0 ? -opts.descent : opts.descent || 0;
        opts.height  = opts.ascent ? opts.ascent - opts.descent : opts.height || maxHeight;
        opts.ascent  = opts.height - Math.abs(opts.descent);
        
        if (type === 'dir') {
            opts.start = opts.begin;
        }

        for (glyph of glyphs) {

            const scaleY = parseFloat(opts.height / glyph.height);
            const scaleX = opts.width === 'auto' ? scaleY : parseFloat(opts.width / glyph.width);

            glyph.width  *= scaleX;
            glyph.height *= scaleY;

            glyph.d = svgpath(glyph.d)
                        .scale(scaleX, -scaleY)
                        .translate(0, opts.height + opts.descent)
                        .round(opts.round)
                        .toString();

            if (type === 'dir') { 
                glyph.unicode = String.fromCodePoint(opts.start++);
            }

            maxWidth = glyph.width > maxWidth ? glyph.width : maxWidth;

            opts.glyphs.push(glyph);
        }
        
        opts.maxWidth = maxWidth;

        if (type === 'dir') {            
            opts.end   = (opts.start - 1).toString(16).toUpperCase();
            opts.start =     (opts.begin).toString(16).toUpperCase();
        } else {
            opts.begin = Math.min.apply(Math, points);
            opts.start = opts.begin.toString(16).toUpperCase();
            opts.end   = Math.max.apply(Math, points).toString(16).toUpperCase();            
        }
        
        opts.uc2hd = uc2hd;
        opts.svg = await ejs.renderFile(url(opts.templates.font), opts, {async: true});
       
        resolve(opts);

    } catch (e) { reject(e); }
});
