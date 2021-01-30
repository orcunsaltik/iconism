#!/usr/bin/env node

const commasp = (value) => value.split(',');
const program = require('commander');
const iconism = require('../lib/index');

program
  .version(require('../package').version, '-v, --version', 'output the current version')
  .usage('[options]<input path...>')
  .description('Convert svg icons to svg, ttf, woff, woff2 and eot font formats and generate web assets.')
  .helpOption('-e, --help', 'display help for command')
  .option('-o, --output <value>',    'output directory')
  .option('-c, --config <value>',    'configuration file')
  .option('-f, --fontfamily <value>','font family  (default: iconfont)')
  .option('-i, --id <value>',        'font id      (default: fontfamily)')
  .option('-s, --style <value>',     'font style   (default: normal)')
  .option('-W, --weight <value>',    'font weight  (default: normal)')
  .option('-a, --ascent <int>',      'font ascent  (default: height - descent)',     Number.parseInt)
  .option('-d, --descent <int>',     'font descent (default: 0)',                    Number.parseInt)
  .option('-h, --height <int>',      'font height  (default: maximum glyph height)', Number.parseInt)
  .option('-w, --width <int>',       'font width   (default: auto)',                 Number.parseInt)
  .option('-m, --metadata <value>',  'font metadata tag')
  .option('-r, --round <int>',       'svg path rounding (default: 1)',            Number.parseInt)
  .option('-b, --begin <number>',    'start unicode codepoint (default:0xE000)',  Number.parseInt)
  .option('-t, --types <value...>',  'font types (default: eot, woff2, woff)',    commasp)
  .option('-A, --assets <value...>', 'assets (default: css, html)',               commasp)
  .option('-H, --hash',              'css hash')
  .option('-T, --tag <value>',       'css tag            (default: null)')
  .option('-u, --url <value>',       'font directory url (default: true)')
  .option('-p, --prefix <value>',    'css prefix class   (default: i)')
  .option('-S, --selector <value>',  'css selector       (default: null)')
  .option('-O, --optimize',          'optimize svgs: svgo')
  .option('-D, --debug',             'output all logging information')
  .parse(process.argv);


(async () => {
        try {
            await iconism({
                   input: program.args,
                  output: program.output,
                  config: program.config,
                    name: program.fontfamily,
                      id: program.id,
                   style: program.style,
                  weight: program.weight,
                  height: program.height,
                   width: program.width,
                  ascent: program.ascent,
                 descent: program.descent,
                metadata: program.metadata,
                   round: program.round,
                   begin: program.begin,
                   types: program.types,
                  assets: program.assets,
                    hash: program.hash,
                     tag: program.tag,
                     url: program.url,
                  prefix: program.prefix,
                selector: program.selector,
                optimize: program.optimize,
                   debug: program.debug
            });
    } catch (e) {
        if (program.debug) {
            console.log(e);
        }
    }
})();