import { getEscapedDefault } from './get-escaped-default';

type AddSlashesOptions = {
  /**
   * Get the escaped string replacement for a character. Numbers
   * are converted to Unicode point escapes (eg. `\u{1F60A}`), strings are
   * used as direct replacements, and `null` will not replace the character.
   */
  readonly getEscaped?: (char: string) => number | `\\${string}` | null;
};

/**
 * Encode characters as escape sequences.
 *
 * By default, the following characters are encoded:
 *
 * - `\b` Backspace
 * - `\f` Linefeed
 * - `\n` Newline
 * - `\r` Carriage Return
 * - `\t` Tab
 * - `\v` Vertical Tab
 * - `\0` Null
 * - `'` Single quote
 * - `"` Double quote
 * - `\` Backslash
 *
 * Use the `getEscaped` option to encode additional characters or to override
 * the default escapes.
 */
const addSlashes = (str: string, { getEscaped = getEscapedDefault }: AddSlashesOptions = {}): string => {
  let result = '';

  for (const char of str) {
    if (char === '\\') {
      result += '\\\\';
      continue;
    }

    const escape = getEscaped(char);

    if (escape == null) {
      result += char;
    } else if (typeof escape !== 'number') {
      result += escape;
    } else {
      result += `\\u{${escape.toString(16)}}`;
    }
  }

  return result;
};

export { type AddSlashesOptions, addSlashes };
