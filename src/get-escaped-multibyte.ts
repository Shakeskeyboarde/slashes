/**
 * Get escapes for all multi-byte unicode characters (above 0xFF) as ES6
 * Unicode Code Point escape sequences (`\u{1AB}`).
 */
const getEscapedMultibyte = (char: string): number | `\\${string}` | null => {
  const codePoint = char.codePointAt(0);

  if (codePoint == null || codePoint <= 0xff) {
    return null;
  }

  return codePoint;
};

export { getEscapedMultibyte };
