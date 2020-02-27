import { getSingleCharEscapes } from './escapes';

export interface IStripSlashesOptions {
  /**
   * Number of times to strip slashes. Equivalent to invoking the function
   * `count` times. Defaults to 1.
   */
  readonly count?: number;
  /**
   * The default value for all escape options (b, f, n, r, t, v, 0, x, u, and
   * uEs6). When true, escape options must be explicitly disabled. When false,
   * escape options must be explicitly enabled. Defaults to true.
   */
  readonly defaultEscapeValue?: boolean;
  /**
   * Unescape `"\\b"` to a backspace character.
   */
  readonly b?: boolean;
  /**
   * Unescape `"\\f"` to a form feed character.
   */
  readonly f?: boolean;
  /**
   * Unescape `"\\n"` to a newline (line feed) character.
   */
  readonly n?: boolean;
  /**
   * Unescape `"\\r"` to a carriage return character.
   */
  readonly r?: boolean;
  /**
   * Unescape `"\\t"` to a tag character.
   */
  readonly t?: boolean;
  /**
   * Unescape `"\\v"` to a vertical tab character.
   */
  readonly v?: boolean;
  /**
   * Unescape `"\\0"` to a null character.
   */
  readonly '0'?: boolean;
  /**
   * Unescape hex escape sequences (e.g. `"\\xa9"`).
   */
  readonly x?: boolean;
  /**
   * Unescape basic unicode escape sequences (e.g. `"\\u2020"`).
   */
  readonly u?: boolean;
  /**
   * Unescape ES6 unicode code point escape sequences (e.g. `"\\u{1F60a}"`).
   */
  readonly uEs6?: boolean;
}

/**
 * Remove one layer of slashes. All escape sequences will be transformed into
 * the character indicated by the sequence (e.g. `"\\n"` will become a
 * newline).
 *
 * @param str String to remove slashes from.
 * @param options Options for which escape sequences to recognize. Defaults to
 * recognizing all single character, hex, and unicode escape sequences
 */
export function stripSlashes(str: string, options?: IStripSlashesOptions): string;
/**
 * Remove one layer of slashes. All escape sequences will be transformed into
 * the character indicated by the sequence (e.g. `"\\n"` will become a
 * newline).
 *
 * @param str String to remove slashes from.
 * @param count Number of times to strip slashes. Equivalent to invoking the
 * function `count` times. Defaults to 1.
 */
export function stripSlashes(str: string, count?: number): string;
export function stripSlashes(str: string, countOrOptions?: number | IStripSlashesOptions): string {
  let options: IStripSlashesOptions;

  if (typeof countOrOptions === 'number') {
    options = { count: countOrOptions };
  } else if (countOrOptions && typeof countOrOptions === 'object') {
    options = countOrOptions;
  } else {
    options = {};
  }

  const {
    count = 1,
    defaultEscapeValue = true,
    b = defaultEscapeValue,
    f = defaultEscapeValue,
    n = defaultEscapeValue,
    r = defaultEscapeValue,
    t = defaultEscapeValue,
    v = defaultEscapeValue,
    '0': nul = defaultEscapeValue,
    x = defaultEscapeValue,
    u = defaultEscapeValue,
    uEs6 = u
  } = options;

  const singleCharEscapes = getSingleCharEscapes();

  if (!b) singleCharEscapes.delete('b');
  if (!f) singleCharEscapes.delete('f');
  if (!n) singleCharEscapes.delete('n');
  if (!r) singleCharEscapes.delete('r');
  if (!t) singleCharEscapes.delete('t');
  if (!v) singleCharEscapes.delete('v');
  if (!nul) singleCharEscapes.delete('0');

  const patterns: string[] = [];

  if (x) patterns.push('x[a-fA-F0-9]{2}');
  if (u) patterns.push('u[a-fA-F0-9]{4}');
  if (uEs6) patterns.push('u{[a-fA-F0-9]+}');

  const rx = new RegExp(`\\\\(${[...patterns, '.', '$'].join('|')})`, 'g');

  for (let i = Math.max(1, count >> 0); i > 0; --i) {
    str = str.replace(rx, (...[, g1]) => {
      const suffix = g1 as string;

      if (suffix.length > 1) {
        if (suffix[0] === 'x') {
          return String.fromCharCode(Number.parseInt(suffix.slice(1), 16));
        } else if (suffix[0] === 'u') {
          if (suffix[1] === '{') {
            const codePointStr = suffix.slice(2, -1);
            const codePoint = Number.parseInt(codePointStr, 16);

            if (codePoint > 0x10ffff) {
              // Not valid unicode, so just remove the slash, leaving the
              // trailing characters in place.
              return suffix;
            } else if (codePoint >= 0x10000) {
              const u = codePoint - 0x10000;
              const s1 = 0xd800 + (u >> 10);
              const s2 = 0xdc00 + (u & 0x3ff);

              return `${String.fromCharCode(s1, s2)}`;
            }

            return String.fromCharCode(codePoint);
          }

          return String.fromCharCode(Number.parseInt(suffix.slice(1), 16));
        }
      }

      return singleCharEscapes.get(suffix) || suffix;
    });
  }

  return str;
}

/**
 * @deprecated Use `stripSlashes()` instead.
 *
 * Maintains legacy behavior of _only_ recognizing newline (`"\n"`) and null
 * escape sequences (`"\0"`). Other slashes will not consume any trailing
 * characters (e.g. `"\\r"` becomes `"r"`, _not a carriage return_).
 */
export const strip = (str: string, count?: number) =>
  stripSlashes(str, { count, defaultEscapeValue: false, n: true, '0': true });
