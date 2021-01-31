[![Build Status](https://travis-ci.com/orcunsaltik/iconism.svg?branch=master)](https://travis-ci.com/orcunsaltik/iconism)[![Dependency Status](https://david-dm.org/orcunsaltik/iconism.svg)](https://david-dm.org/orcunsaltik/iconism)[![devDependencies Status](https://david-dm.org/orcunsaltik/iconism/dev-status.svg)](https://david-dm.org/orcunsaltik/iconism?type=dev)[![Maintainability](https://api.codeclimate.com/v1/badges/035ff3499e767eb6b552/maintainability)](https://codeclimate.com/github/orcunsaltik/iconism/maintainability)[![NPM Version](https://badge.fury.io/js/iconism.svg?style=flat)](https://npmjs.org/package/iconism)[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/orcunsaltik/iconism/issues)![node-current](https://img.shields.io/node/v/iconism)

# Iconism

A modern font and customizable asset generator in various formats by searching, optimizing and finally merging svg icon files from multiple directories or a configuration file that contains required properties.

Available Font Types:  **svg, ttf, woff, woff2, eot.**

Available Assets:  **html, css, scss, sass, json, svg sprite**

## Install

``` bash
npm install --save-dev iconism
```

## Usage

### In Scripts

```js
const iconism = require('iconism');

iconism({
        name: 'myicons',
       input: 'src/icons/svg',
      output: 'src/icons/dist',
       types: ['eot', 'ttf', 'woff', 'woff2', 'svg'],
      assets: ['html', 'css'],
      height: 512,
     descent: 64,
    optimize: true,
});

// in an async function
const styler = async () => {
    await iconism({
        ...
    });
}

```

### Command-line Interface


```
iconism --help

Usage: index [options]<input path...>

Convert svg icons to svg, ttf, woff, woff2 and eot font formats and generate web assets.

Options:
  -v, --version             output the current version
  -o, --output <value>      output directory
  -c, --config <value>      configuration file
  -f, --fontfamily <value>  font family  (default: iconfont)
  -i, --id <value>          font id      (default: fontfamily)
  -s, --style <value>       font style   (default: normal)
  -W, --weight <value>      font weight  (default: normal)
  -a, --ascent <int>        font ascent  (default: height - descent)
  -d, --descent <int>       font descent (default: 0)
  -h, --height <int>        font height  (default: maximum glyph height)
  -w, --width <int>         font width   (default: auto)
  -m, --metadata <value>    font metadata tag
  -r, --round <int>         svg path rounding (default: 1)
  -b, --begin <value>       start unicode codepoint (default:0xE000)
  -t, --types <value...>    font types (default: eot, woff2, woff)
  -A, --assets <value...>   assets (default: css, html)
  -H, --hash                css hash           (default: true)
  -T, --tag <value>         css tag            (default: null)
  -u, --url <value>         font directory url (default: true)
  -p, --prefix <value>      css prefix class   (default: i)
  -S, --selector <value>    css selector       (default: null)
  -O, --optimize            optimize svgs: svgo
  -D, --debug               output all information
  -e, --help                display help for command
```

## API

## iconism(options)

| option name    | type              | default                 | description                              |
| -------------- | ----------------- | ----------------------- | ---------------------------------------- |
| **`input`**    | `string\|array`   | **`* required`**        | `svg files directories, files or config` |
| **`output`**   | `string`          | **`required`**          | `output directory`                       |
| **`config`**   | `string`          | `null`                  | `configuration file path`                |
| **`name`**     | `string`          | `iconism`               | `font family`                            |
| **`id`**       | `string`          | `option.name`           | `font id`                                |
| **`style`**    | `string`          | `normal`                | `font style`                             |
| **`weight`**   | `integer\|string` | `400`                   | `font weight`                            |
| **`height`**   | `integer`         | `highest glyphs height` | `font height`                            |
| **`width`**    | `integer`         | `auto`                  | `font width`                             |
| **`ascent`**   | `integer`         | `height - descent`      | `font ascent`                            |
| **`descent`**  | `integer`         | `0`                     | `font descent`                           |
| **`metadata`** | `string`          | `null`                  | `font metadata / copyright`              |
| **`round`**    | `integer`         | `1`                     | `svg path rounding (0-99)`               |
| **`begin`**    | `integer`         | `0xE000`                | `first glyph unicode`                    |
| **`types`**    | `array`           | `['woff','ttf','svg']`  | `font types to be generated`             |
| **`assets`**   | `array`           | `['html','css']`        | `web assets to be generated`             |
| **`hash`**     | `bool`            | `false`                 | `css & font hash for cache`              |
| **`tag`**      | `string`          | `null`                  | `css tag`                                |
| **`url`**      | `string`          | `null`                  | `font directory path in css file`        |
| **`prefix`**   | `string`          | `i`                     | `css class prefix`                       |
| **`selector`** | `string`          | `null`                  | `css selector`                           |
| **`optimize`** | `bool`            | `true`                  | `optimize svg files`                     |
| **`svgo`**     | `object`          | `null`                  | `svgo options`                           |
| **`debug`**    | `function\|bool`  | `() => {}`              | `output all logging info`                |

All options are available except custom templates for web assets, font and asset filenames.
Configuration file "-c" option will help you provide such a file path to meet your needs.

### Input Option Examples

#### Directory

```
input: '../icons',...
```


#### Directories and files

```
input: ['../icons', '../svg/icons', 'angle-down.svg', 'add.svg'],...
```


#### Path to svg icons configuration file

```
input: '../icons/glyphs.json',...
```


#### Configuration

```
input: [
        {
            "name": "angle-down",
            "unicode": "\uE100",
            "path": "../icons/angle-down.svg"
        },
        {
            "name": "angle-down-circle",
            "unicode": "\uE101",
            "path": "../icons/angle-down-circle.svg"
        }
	...
 ]
```


#### Configuration with all properties

```
input: [
        {
               "name": "plus",
            "unicode": "\uE100",
            	  "d": "M7,9H4V7H7V4H9V7h3V9H9v3H7Z",
              "width": 512,
             "height": 512,
             viewPort: "0 0 512 512"
        },
	...
]
```

### All options separate configuration file example

```
module.exports = {
    templates: {
        sprite: "src/my-templates/sprite.ejs"
    },
    font: {
        names: {
            svg: "%name%-svg",
            eot: "ie%name%",
        },
        exports: ["woff2", "woff", "ttf"]
    },
    asset: {
        names: {
            sprite: "%name%-sprite"
        },
        exports: ["sass", "scss", "sprite"]
    },
    svgo: {
        plugins: [
            {cleanupAttrs: true},
            {removeDoctype: false},
            {removeXMLProcInst: true},
            {mergePaths: {force: false}},
            {convertShapeToPath: {convertArcs: false}},
        ]
    }
};
```

## Contributing

All contributions are welcome.

## Troubleshooting

When you encounter a problem, please open an issue. I would be glad to help you to find a solution if possible.

## Author

Orçun Saltık. Github: [@orcunsaltik](https://github.com/orcunsaltik)

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

