# iconism

[![CI](https://github.com/orcunsaltik/iconism/actions/workflows/ci.yml/badge.svg)](https://github.com/orcunsaltik/iconism/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/iconism.svg)](https://www.npmjs.com/package/iconism)
[![npm downloads](https://img.shields.io/npm/dt/iconism.svg)](https://www.npmjs.com/package/iconism)
[![node-current](https://img.shields.io/node/v/iconism)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/iconism.svg)](LICENSE)

> Modern font and customizable asset generator from SVG icons

A complete fonts and web assets generator that searches, optimizes, and merges SVG icon files from multiple directories or configuration files.

## Features

- ✅ Multiple font formats: **SVG, TTF, WOFF, WOFF2, EOT**
- ✅ Web assets: **HTML, CSS, SCSS, SASS, JSON, SVG Sprite**
- ✅ CLI and programmatic API
- ✅ **TypeScript support** with complete type definitions
- ✅ **Modern demo page** with dark mode, search, and copy-to-clipboard
- ✅ **CSS utilities** (size, rotate, flip, spin animations)
- ✅ **SCSS/SASS mixins** for flexible icon usage
- ✅ SVG optimization with SVGO
- ✅ Custom templates support
- ✅ Unicode codepoint mapping
- ✅ Zero configuration defaults

## Requirements

- Node.js >= 18.0.0

## Installation

### Global (CLI)

```bash
npm install -g iconism
```

### Local (API)

```bash
npm install --save-dev iconism
```

## Usage

### TypeScript

iconism comes with full TypeScript support:

```typescript
import iconism, { IconismOptions } from 'iconism';

const options: IconismOptions = {
  name: 'myicons',
  input: 'src/icons/*.svg',
  output: 'dist/fonts',
  types: ['woff2', 'woff', 'ttf'],
  assets: ['css', 'scss', 'html'],
  optimize: true,
};

await iconism(options);
```

### Programmatic API

```javascript
const iconism = require('iconism');

// Basic usage
iconism({
  name: 'myicons',
  input: 'src/icons/svg',
  output: 'dist/fonts',
  types: ['woff2', 'woff', 'ttf'],
  assets: ['html', 'css'],
  height: 512,
  descent: 64,
  optimize: true,
});

// Async/await
const generate = async () => {
  await iconism({
    name: 'icons',
    input: 'icons/*.svg',
    output: 'build',
    types: ['woff2', 'woff'],
    assets: ['css', 'scss'],
  });
  console.log('Icons generated!');
};

generate();
```

### Command-line Interface

```bash
iconism --help

Usage: iconism [options] <input path...>

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
  -b, --begin <value>       start unicode codepoint (default: 0xE000)
  -t, --types <value...>    font types (default: woff2, woff, ttf)
  -A, --assets <value...>   assets (default: css, html)
  -H, --hash                css hash (default: false)
  -T, --tag <value>         css tag (default: null)
  -u, --url <value>         font directory url (default: null)
  -p, --prefix <value>      css prefix class (default: i)
  -S, --selector <value>    css selector (default: null)
  -O, --optimize            optimize svgs with svgo
  -D, --debug               output all information
  -e, --help                display help for command
```

#### CLI Examples

```bash
# Generate fonts from directory
iconism -o dist/fonts src/icons/*.svg

# Generate with specific types
iconism -o dist -t woff2 woff -A css scss src/icons/*.svg

# Use configuration file
iconism -c iconism.config.js -o dist src/icons/*.svg
```

## API Reference

### iconism(options)

| Option         | Type              | Default                  | Description                              |
| -------------- | ----------------- | ------------------------ | ---------------------------------------- |
| **`input`**    | `string\|array`   | **`* required`**         | SVG files directories, files or config   |
| **`output`**   | `string`          | **`* required`**         | Output directory                         |
| **`config`**   | `string`          | `null`                   | Configuration file path                  |
| **`name`**     | `string`          | `iconism`                | Font family name                         |
| **`id`**       | `string`          | `option.name`            | Font ID                                  |
| **`style`**    | `string`          | `normal`                 | Font style                               |
| **`weight`**   | `integer\|string` | `400`                    | Font weight                              |
| **`height`**   | `integer`         | `max glyph height`       | Font height                              |
| **`width`**    | `integer`         | `auto`                   | Font width                               |
| **`ascent`**   | `integer`         | `height - descent`       | Font ascent                              |
| **`descent`**  | `integer`         | `0`                      | Font descent                             |
| **`metadata`** | `string`          | `null`                   | Font metadata / copyright                |
| **`round`**    | `integer`         | `1`                      | SVG path rounding (0-99)                 |
| **`begin`**    | `integer`         | `0xE000`                 | First glyph unicode codepoint            |
| **`types`**    | `array`           | `['woff2','woff','ttf']` | Font types to generate                   |
| **`assets`**   | `array`           | `['html','css']`         | Web assets to generate                   |
| **`hash`**     | `boolean`         | `false`                  | Add hash to CSS & font for cache busting |
| **`tag`**      | `string`          | `null`                   | CSS tag                                  |
| **`url`**      | `string`          | `null`                   | Font directory URL in CSS                |
| **`prefix`**   | `string`          | `i`                      | CSS class prefix                         |
| **`selector`** | `string`          | `null`                   | CSS selector                             |
| **`optimize`** | `boolean`         | `true`                   | Optimize SVG files with SVGO             |
| **`svgo`**     | `object`          | `null`                   | Custom SVGO options                      |
| **`debug`**    | `function\|bool`  | `() => {}`               | Debug logging function                   |

## Input Options

### Directory

```javascript
iconism({
  input: 'src/icons',
  output: 'dist',
});
```

### Multiple Directories and Files

```javascript
iconism({
  input: ['src/icons', 'assets/svg', 'icons/arrow.svg', 'icons/check.svg'],
  output: 'dist',
});
```

### JSON Configuration File

```javascript
iconism({
  input: 'icons/config.json',
  output: 'dist',
});
```

**icons/config.json:**

```json
[
  {
    "name": "arrow-down",
    "unicode": "\uE100",
    "path": "icons/arrow-down.svg"
  },
  {
    "name": "arrow-up",
    "unicode": "\uE101",
    "path": "icons/arrow-up.svg"
  }
]
```

### Enhanced JSON Output

When generating JSON assets, you get rich metadata:

```json
{
  "name": "myicons",
  "version": "1.0.0",
  "prefix": "i",
  "icons": {
    "arrow-down": {
      "unicode": 57600,
      "hex": "e100",
      "character": "",
      "className": "i-arrow-down"
    },
    "arrow-up": {
      "unicode": 57601,
      "hex": "e101",
      "character": "",
      "className": "i-arrow-up"
    }
  }
}
```

### Inline Configuration

```javascript
iconism({
  input: [
    {
      name: 'plus',
      unicode: '\uE100',
      d: 'M7,9H4V7H7V4H9V7h3V9H9v3H7Z',
      width: 512,
      height: 512,
      viewBox: '0 0 512 512',
    },
    {
      name: 'minus',
      unicode: '\uE101',
      path: 'icons/minus.svg',
    },
  ],
  output: 'dist',
});
```

## Advanced Configuration

### CSS Utilities

Generated CSS includes helpful utility classes:

```css
/* Size utilities */
.i-sm {
  font-size: 0.75em;
}
.i-lg {
  font-size: 1.25em;
}
.i-xl {
  font-size: 1.5em;
}
.i-2x {
  font-size: 2em;
}
.i-3x {
  font-size: 3em;
}

/* Rotate utilities */
.i-rotate-90 {
  transform: rotate(90deg);
}
.i-rotate-180 {
  transform: rotate(180deg);
}
.i-rotate-270 {
  transform: rotate(270deg);
}

/* Flip utilities */
.i-flip-horizontal {
  transform: scaleX(-1);
}
.i-flip-vertical {
  transform: scaleY(-1);
}
```

**Usage:**

```html
<span class="i i-arrow-down i-2x i-rotate-90"></span>
```

### SCSS Mixins

Generated SCSS includes powerful mixins:

```scss
// Use icon by name
.my-button {
  @include icon('arrow-down');
  @include icon-size(1.5rem);
  @include icon-rotate(45);
}

// Flip icon
.back-button {
  @include icon('arrow-right');
  @include icon-flip(horizontal);
}

// Spin animation
.loading-icon {
  @include icon('spinner');
}
.loading-icon.i-spin {
  animation: i-spin 2s linear infinite;
}
```

### Modern Demo Page

The generated HTML demo includes:

- 🌙 **Dark mode** with persistent preference
- 🔍 **Real-time search** - Filter icons instantly
- 📋 **Copy to clipboard** - Click any icon to copy its class name
- 📱 **Responsive design** - Works on all devices
- ⌨️ **Keyboard shortcuts** - `/` to search, `Esc` to clear
- 📊 **Live stats** - See total and visible icon counts
- 🎨 **Grid/List views** - Toggle between layouts

## Advanced Configuration

Create an `iconism.config.js` file for advanced options:

```javascript
module.exports = {
  name: 'custom-icons',
  input: 'src/icons',
  output: 'dist/fonts',
  types: ['woff2', 'woff', 'ttf'],
  assets: ['sass', 'scss', 'sprite'],
  templates: {
    sprite: 'templates/sprite.ejs',
  },
  font: {
    names: {
      svg: '%name%-svg',
      woff2: '%name%-webfont',
    },
    exports: ['woff2', 'woff', 'ttf'],
  },
  asset: {
    names: {
      sprite: '%name%-sprite',
    },
    exports: ['sass', 'scss', 'sprite'],
  },
  svgo: {
    plugins: [
      { name: 'mergePaths', params: { force: false } },
      { name: 'convertShapeToPath', params: { convertArcs: false } },
    ],
  },
};
```

Then run:

```bash
iconism -c iconism.config.js
```

## Changelog

### v2.0.0 (2025)

#### 🚨 Breaking Changes

- **BREAKING:** Requires Node.js 18+

#### ✨ New Features

- **TypeScript Support:** Complete type definitions (`iconism.d.ts`)
- **Modern Demo Page:**
  - Dark mode with localStorage persistence
  - Real-time icon search and filtering
  - Copy to clipboard functionality
  - Grid and list view toggles
  - Keyboard shortcuts (`/` for search, `Esc` to clear)
  - Live icon statistics
  - Responsive mobile-first design
- **CSS Utilities:** Size, rotate, flip, and spin animations
- **SCSS/SASS Mixins:** `@include icon()`, `@include icon-size()`, `@include icon-rotate()`, `@include icon-flip()`
- **Enhanced JSON Output:** Rich metadata with unicode, hex, character, and className

#### 🐛 Bug Fixes

- **CRITICAL:** Fixed SVG sprite closing tag bug (`<svg>` → `</svg>`)
- Fixed 87 ESLint issues across the codebase
- Fixed async Promise executor anti-patterns (7 instances)
- Fixed path concatenation issues (8 instances, now using `path.join()`)
- Fixed tab/space inconsistencies (50+ instances)
- Fixed mixed operator precedence issues (6 instances)

#### 📦 Dependency Updates

- Updated njfs: 1.2.5 → 2.0.0
- Updated svg2ttf: 5.1.0 → 6.0.3
- Updated ttf2eot: 2.0.0 → 3.1.0
- Updated ttf2woff: 2.0.2 → 3.0.0
- Updated ttf2woff2: 4.0.2 → 5.0.0
- Updated svgo: 2.2.2 → 2.8.0
- Updated ejs: 3.1.6 → 3.1.10
- Updated xml2js: 0.4.23 → 0.6.2

#### 🔧 Development

- Added Prettier for consistent code formatting
- Modern ESLint 8 configuration with standard config
- Travis CI → GitHub Actions (Node 18/20/22)
- Added `.vscode/settings.json` for better IDE support
- Comprehensive `.prettierrc` and `.editorconfig`

#### 📚 Documentation

- Completely rewritten README with modern examples
- Added TypeScript usage examples
- Added CSS utilities documentation
- Added SCSS mixins documentation
- Added demo page features documentation
- Updated badges (CI, npm version, downloads)

### v1.2.3 (2021)

- Previous stable release

## Migration from v1.x

```javascript
// v1.x - Still works in v2.0.0
iconism({
  input: 'icons',
  output: 'dist',
});

// v2.x - Now requires Node.js 18+
// All other APIs remain the same
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Troubleshooting

When you encounter a problem, please [open an issue](https://github.com/orcunsaltik/iconism/issues).

## Author

**Orçun Saltık**

- GitHub: [@orcunsaltik](https://github.com/orcunsaltik)
- Email: saltikorcun@gmail.com

## License

[MIT](LICENSE) © Orçun Saltık
