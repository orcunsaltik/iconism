module.exports = {
         name: "iconism",
        begin: 0xE000,
       weight: 400,
        style: "normal",
     metadata: "made with iconism",
          url: null,
     selector: null,
          tag: null,
       prefix: "i",
        width: "auto",
        round: 1,
    templates: {
           css: "lib/config/tpl/css.ejs",
          font: "lib/config/tpl/font.ejs",
          scss: "lib/config/tpl/scss.ejs",
          sass: "lib/config/tpl/sass.ejs",
          less: "lib/config/tpl/less.ejs",
          html: "lib/config/tpl/html.ejs",
          json: "lib/config/tpl/json.ejs",
        sprite: "lib/config/tpl/sprite.ejs"
    },
    font: {
        names: {
              eot: "%name%",
            woff2: "%name%",
             woff: "%name%",
              ttf: "%name%",
              svg: "%name%"
        },
        exports: ["woff2", "woff", "ttf"]
    },
    asset: {
        names: {
               css: "%name%",
              scss: "%name%",
              sass: "%name%",
              less: "%name%",
              html: "%name%",
              json: "%name%",
            sprite: "%name%-defs"
        },
        exports: ["html", "css"]
    },
    svgo: {
        plugins: [
            {cleanupAttrs: true},
            {removeDoctype: true},
            {removeXMLProcInst: true},
            {removeComments: true},
            {removeMetadata: true},
            {removeTitle: true},
            {removeDesc: true},
            {removeUselessDefs: true},
            {removeEditorsNSData: true},
            {removeEmptyAttrs: true},
            {removeHiddenElems: true},
            {removeEmptyText: true},
            {removeEmptyContainers: true},
            {removeViewBox: false},
            {cleanupEnableBackground: true},
            {convertStyleToAttrs: true},
            {convertColors: true},
            {convertPathData: true},
            {convertTransform: true},
            {removeUnknownsAndDefaults: true},
            {removeNonInheritableGroupAttrs: true},
            {removeUselessStrokeAndFill: true},
            {removeUnusedNS: true},
            {cleanupIDs: true},
            {cleanupNumericValues: true},
            {moveElemsAttrsToGroup: true},
            {moveGroupAttrsToElems: true},
            {collapseGroups: true},
            {removeRasterImages: false},
            {mergePaths: {force: true}},
            {convertShapeToPath: {convertArcs: true}},
            {sortAttrs: true},
            {removeDimensions: true},
            {removeAttrs: {attrs: '(stroke|fill)'}}]
    }
};
