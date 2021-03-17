module.exports = {
         name: 'iconism',
        begin: 0xE000,
       weight: 400,
        style: 'normal',
     metadata: 'made with iconism',
          url: null,
     selector: null,
          tag: null,
       prefix: 'i',
        width: 'auto',
        round: 1,
    templates: {
           css: __dirname + '/tpl/css.ejs',
          font: __dirname + '/tpl/font.ejs',
          scss: __dirname + '/tpl/scss.ejs',
          sass: __dirname + '/tpl/sass.ejs',
          less: __dirname + '/tpl/less.ejs',
          html: __dirname + '/tpl/html.ejs',
          json: __dirname + '/tpl/json.ejs',
        sprite: __dirname + '/tpl/sprite.ejs'
    },
    font: {
        names: {
              eot: '%name%',
            woff2: '%name%',
             woff: '%name%',
              ttf: '%name%',
              svg: '%name%'
        },
        exports: ['woff2', 'woff', 'ttf']
    },
    asset: {
        names: {
               css: '%name%',
              scss: '%name%',
              sass: '%name%',
              less: '%name%',
              html: '%name%',
              json: '%name%',
            sprite: '%name%-defs'
        },
        exports: ['html', 'css']
    },
    svgo: {
        plugins: [
            'cleanupAttrs',
            'removeDoctype',
            'removeXMLProcInst',
            'removeComments',
            'removeMetadata',
            'removeTitle',
            'removeDesc',
            'removeUselessDefs',
            'removeEditorsNSData',
            'removeEmptyAttrs',
            'removeHiddenElems',
            'removeEmptyText',
            'removeEmptyContainers',
            //removeViewBox,
            'cleanupEnableBackground',
            'convertStyleToAttrs',
            'convertColors',
            'convertPathData',
            'convertTransform',
            'removeUnknownsAndDefaults',
            'removeNonInheritableGroupAttrs',
            'removeUselessStrokeAndFill',
            'removeUnusedNS',
            'cleanupIDs',
            'cleanupNumericValues',
            'moveElemsAttrsToGroup',
            'moveGroupAttrsToElems',
            'collapseGroups',
            //removeRasterImages,
            {name: 'mergePaths', params: {force: true}},
            {name: 'convertShapeToPath', params: {convertArcs: true}},
            'sortAttrs',
            'removeDimensions',
            {name: 'removeAttrs', params: {attrs: '(stroke|fill)'}}
        ]
    }
};