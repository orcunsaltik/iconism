
module.exports = (opts, format) => {

    const fonts  = opts.types;
    const family = opts.name;
    const hash   = opts.hash ? '?' + (+new Date).toString(36) : '';
    const path   = opts.url || '.';
    const url    = ( path + '/' + family + ".").replace(/[\\|/]+/, '/');

    let src = '';

    if (fonts.includes('eot')) {
        src = `src: url("${url}eot${hash}")`;
        src += format !== 'sass'
           ? ';\n    '
           :  '\n    ';
    }

    src += 'src:';

    fonts.forEach((type, i, self) => {

        src += ` url("${url}${type}${hash}`;

        if (type === 'eot') {
            src += `#iefix") format("embedded-opentype")`;
        } else if (type === 'woff2' || type === 'woff' ) {
            src += `") format("${type}")`;
        } else if (type === 'ttf') {
            src += `") format("truetype")`;
        } else if (type === 'svg') {
            src += `#${family}") format("${type}")`;
        }

        src += i !== self.length - 1
            ? format !== 'sass'
            ? ",\n\t" : ","
            : '';
    });

    return src;
};
