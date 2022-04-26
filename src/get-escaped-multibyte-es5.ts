/**
 * Get escapes for all multi-byte unicode characters (above 0xFF) as ES5
 * unicode escape sequences (`\u01AB`).
 */
const getEscapedMultibyteES5 = (char: string): number | `\\${string}` | null => {
  if (char.charCodeAt(0) <= 0xff) {
    return null;
  }

  let escape = '';

  for (let index = char.length - 1; index >= 0; index--) {
    escape = `\\u${('000' + char.charCodeAt(index).toString(16)).slice(-4)}` + escape;
  }

  return escape as `\\${string}`;
};

export { getEscapedMultibyteES5 };
