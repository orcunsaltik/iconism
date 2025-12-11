declare module 'iconism' {
  export interface IconismOptions {
    /**
     * SVG files directories, files or configuration
     * @required
     */
    input: string | string[] | IconConfig[];

    /**
     * Output directory
     * @required
     */
    output: string;

    /**
     * Configuration file path
     */
    config?: string;

    /**
     * Font family name
     * @default 'iconism'
     */
    name?: string;

    /**
     * Font ID
     * @default options.name
     */
    id?: string;

    /**
     * Font style
     * @default 'normal'
     */
    style?: string;

    /**
     * Font weight
     * @default 400
     */
    weight?: number | string;

    /**
     * Font height (defaults to maximum glyph height)
     */
    height?: number;

    /**
     * Font width
     * @default 'auto'
     */
    width?: number | 'auto';

    /**
     * Font ascent
     * @default height - descent
     */
    ascent?: number;

    /**
     * Font descent
     * @default 0
     */
    descent?: number;

    /**
     * Font metadata / copyright
     */
    metadata?: string;

    /**
     * SVG path rounding (0-99)
     * @default 1
     */
    round?: number;

    /**
     * First glyph unicode codepoint
     * @default 0xE000
     */
    begin?: number;

    /**
     * Font types to generate
     * @default ['woff2', 'woff', 'ttf']
     */
    types?: Array<'svg' | 'ttf' | 'woff' | 'woff2' | 'eot'>;

    /**
     * Web assets to generate
     * @default ['html', 'css']
     */
    assets?: Array<'html' | 'css' | 'scss' | 'sass' | 'json' | 'sprite'>;

    /**
     * Add hash to CSS & font for cache busting
     * @default false
     */
    hash?: boolean;

    /**
     * CSS tag
     */
    tag?: string;

    /**
     * Font directory URL in CSS file
     */
    url?: string;

    /**
     * CSS class prefix
     * @default 'i'
     */
    prefix?: string;

    /**
     * CSS selector
     */
    selector?: string;

    /**
     * Optimize SVG files with SVGO
     * @default true
     */
    optimize?: boolean;

    /**
     * Custom SVGO options
     */
    svgo?: SvgoOptions;

    /**
     * Debug logging function or boolean
     * @default () => {}
     */
    debug?: ((message: string) => void) | boolean;

    /**
     * Custom templates
     */
    templates?: {
      css?: string;
      font?: string;
      scss?: string;
      sass?: string;
      html?: string;
      json?: string;
      sprite?: string;
    };

    /**
     * Font configuration
     */
    font?: {
      names?: Partial<Record<'svg' | 'ttf' | 'woff' | 'woff2' | 'eot', string>>;
      exports?: Array<'svg' | 'ttf' | 'woff' | 'woff2' | 'eot'>;
    };

    /**
     * Asset configuration
     */
    asset?: {
      names?: Partial<Record<'css' | 'scss' | 'sass' | 'html' | 'json' | 'sprite', string>>;
      exports?: Array<'html' | 'css' | 'scss' | 'sass' | 'json' | 'sprite'>;
    };
  }

  export interface IconConfig {
    /**
     * Icon name
     */
    name: string;

    /**
     * Unicode character
     */
    unicode: string;

    /**
     * SVG path data (if not using path property)
     */
    d?: string;

    /**
     * Path to SVG file (if not using d property)
     */
    path?: string;

    /**
     * Icon width
     */
    width?: number;

    /**
     * Icon height
     */
    height?: number;

    /**
     * SVG viewBox
     */
    viewBox?: string;
  }

  export interface SvgoOptions {
    plugins?: Array<string | { name: string; params?: Record<string, any> }>;
  }

  export interface IconismResult {
    name: string;
    glyphs: Glyph[];
    svg: string;
    symbols: Symbol[];
  }

  export interface Glyph {
    name: string;
    unicode: string;
    d: string;
    width: number;
    height: number;
    path?: string;
  }

  export interface Symbol {
    id: string;
    d: string;
    viewBox: string;
  }

  /**
   * Generate icon fonts and web assets from SVG files
   */
  export default function iconism(options: IconismOptions): Promise<IconismResult>;
}
