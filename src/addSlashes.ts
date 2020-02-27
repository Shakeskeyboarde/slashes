import { deprecated } from './deprecated';
import { CHAR_TO_ESCAPE } from './escapes';

export interface IAddSlashesOptions {
  /**
   * Number of times to add slashes. Equivalent to invoking the function
   * `count` times. Defaults to 1.
   */
  count?: number;

  /**
   * Characters to escape. Defaults to all single character escape sequence
   * characters (i.e. `\b`, `\f`, `\n`, `\r`, `\t`, `\v`, `\0`, `\'`, `\"`,
   * and `\\`).
   */
  characters?: string;

  /**
   * Use escape sequences (e.g. `"\xa9"` or `"\u2020"`) for non-ascii
   * characters (i.e. unicode code point 0x0080 and greater). Defaults to
   * false.
   *
   * _NOTE: Escaped code points over 2 bytes (Unicode supplementary planes),
   * are **always** encoded using two escape sequences as a surrogate pair
   * (e.g. `"\\ud83d\\ude0a"`), so that the output doesn't contain invalid
   * UTF-16 characters._
   */
  escapeNonAscii?: boolean;
}

/**
 * Escape all single character escapable sequences (i.e. `\b`, `\f`, `\n`,
 * `\r`, `\t`, `\v`, `\0`, `\'`, `\"`, and `\\`).
 *
 * @param str String in which to escape characters.
 * @param options Options for which characters to add slashes to, how many
 * slashes to add, and whether to use escape sequences for non-ascii
 * characters.
 */
export function addSlashes(str: string, options?: IAddSlashesOptions): string;
/**
 * Escape all single character escapable sequences (i.e. `\b`, `\f`, `\n`,
 * `\r`, `\t`, `\v`, `\0`, `\'`, `\"`, and `\\`).
 *
 * _NOTE: Escaped code points over 2 bytes (Unicode supplementary planes),
 * are **always** encoded using two escape sequences as a surrogate pair
 * (e.g. `"\\ud83d\\ude0a"`), so that the output doesn't contain invalid
 * UTF-16 characters._
 *
 * @param str String in which to escape characters.
 * @param characters Characters to escape. Defaults to all single character
 * escape sequence characters (i.e. `\b`, `\f`, `\n`, `\r`, `\t`, `\v`, `\0`,
 * `\'`, `\"`, and `\\`).
 */
export function addSlashes(str: string, characters?: string): string;
/**
 * Escape specific characters.
 *
 * _NOTE: Escaped code points over 2 bytes (Unicode supplementary planes),
 * are **always** encoded using two escape sequences as a surrogate pair
 * (e.g. `"\\ud83d\\ude0a"`), so that the output doesn't contain invalid
 * UTF-16 characters._
 *
 * @param str String to add slashes to.
 * @param count Number of times to add slashes. Equivalent to invoking the
 * function `count` times. Defaults to 1.
 * @param characters Characters to escape. Defaults to all single character
 * escape sequence characters (i.e. `\b`, `\f`, `\n`, `\r`, `\t`, `\v`, `\0`,
 * `\'`, `\"`, and `\\`).
 */
export function addSlashes(str: string, count?: number, characters?: string): string;
export function addSlashes(
  str: string,
  countOrCharactersOrOptions?: number | string | IAddSlashesOptions,
  characters = `\b\f\n\r\t\v\0'"\\`
): string {
  let count = 1;
  let escapeNonAscii = false;

  if (typeof countOrCharactersOrOptions === 'number') {
    count = countOrCharactersOrOptions;
  } else if (countOrCharactersOrOptions) {
    if (typeof countOrCharactersOrOptions === 'object') {
      ({ count = count, characters = characters, escapeNonAscii = escapeNonAscii } = countOrCharactersOrOptions);
    } else {
      characters = countOrCharactersOrOptions;
    }
  }

  const rx = new RegExp(`[${characters.replace(/[\]\\^]/g, '\\$&')}]`, 'g');

  for (let i = Math.max(1, count >> 0); i > 0; --i) {
    str = str.replace(rx, char => {
      const escape = CHAR_TO_ESCAPE.get(char);

      if (escape) {
        return escape;
      }

      const charCode = char.charCodeAt(0);

      if (charCode >= 0xd800 && charCode <= 0xf8ff) {
        const hex = charCode.toString(16);
        return `\\u${hex}`;
      } else if (escapeNonAscii && charCode > 0x7f) {
        let hex = charCode.toString(16);

        if (charCode <= 0xff) {
          return `\\x${hex}`;
        } else {
          while (hex.length < 4) hex = `0${hex}`;
          return `\\u${hex}`;
        }
      }

      return `\\${char}`;
    });
  }

  return str;
}

/**
 * @deprecated Use `addSlashes()` instead.
 *
 * Maintains the legacy behavior of only adding slashes to newlines (`"\n"`),
 * carriage returns (`"\r"`), nulls (`"\0"`), single quotes (`"'"`), double
 * quotes (`"\""`), and backslashes (`"\\"`).
 */
export const add = (str: string, count?: number): string => {
  deprecated('The add() function is deprecated and should be replaced with addSlashes().');
  return addSlashes(str, count, `\n\0'"\\`);
};
