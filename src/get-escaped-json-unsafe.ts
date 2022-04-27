/**
 * Get escapes for the default escape set, which is all characters that cannot
 * be used between double quotes in a JSON string.
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
const getEscapedJsonUnsafe = (char: string): boolean => {
  switch (char) {
    case '\b':
    case '\f':
    case '\n':
    case '\r':
    case '\t':
    case '\v':
    case '\0':
    case `"`:
    case '\\':
      return true;
  }

  return false;
};

export { getEscapedJsonUnsafe };
