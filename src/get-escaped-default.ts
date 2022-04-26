/**
 * Get escapes for the default escape set:
 *
 * - `\b` Backspace
 * - `\f` Linefeed
 * - `\n` Newline
 * - `\r` Carriage Return
 * - `\t` Tab
 * - `\v` Vertical Tab
 * - `\0` Null
 * - `"` Double quote
 *
 * NOTE: Backslashes are always escaped by the `addSlashes` function and do
 *       not need to be escaped by the `getEscaped` implementation.
 */
const getEscapedDefault = (char: string): `\\${string}` | null => {
  switch (char) {
    case '\b':
      return '\\b';
    case '\f':
      return '\\f';
    case '\n':
      return '\\n';
    case '\r':
      return '\\r';
    case '\t':
      return '\\t';
    case '\v':
      return '\\u000b';
    case '\0':
      return '\\u0000';
    case `"`:
      return `\\${char}`;
  }

  return null;
};

export { getEscapedDefault };
