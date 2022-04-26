import { getEscapedDefault } from './get-escaped-default';

type AddSlashesOptions = {
  /**
   * Get the escaped string replacement for a character. Return `null` not
   * leave the character unencoded.
   */
  readonly getEscaped?: (char: string) => `\\${string}` | null;
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
    } else {
      result += escape;
    }
  }

  return result;
};

export { type AddSlashesOptions, addSlashes };
