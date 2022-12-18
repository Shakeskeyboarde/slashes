import { getEscapedAny } from './get-escaped-any.js';
import { getEscapedJsonUnsafe } from './get-escaped-json-unsafe.js';
import { type EscapeSequence } from './types/escape-sequence.js';

type AddSlashesOptions = {
  /**
   * Indicate which characters should be encoded and how.
   *
   * - Return `false` to leave the character unencoded.
   * - Return `true` to encode the character to its default escape sequence.
   * - Return a string to provide a custom escape sequence.
   */
  readonly getEscaped?: (char: string) => EscapeSequence | boolean;
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
const addSlashes = (str: string, options: AddSlashesOptions = {}): string => {
  const { getEscaped = getEscapedJsonUnsafe } = options;
  let result = '';

  for (const char of str) {
    const escaped = getEscaped(char);

    if (!escaped) {
      result += char;
    } else if (escaped === true || escaped.length < 2) {
      result += getEscapedAny(char) || char;
    } else {
      result += escaped;
    }
  }

  return result;
};

export { type AddSlashesOptions, addSlashes };
