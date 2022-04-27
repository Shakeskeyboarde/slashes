import { type EscapeSequence } from './types/escape-sequence';

/**
 * Get escapes for any character, using JSON-safe single letter sequences, and
 * ES5 unicode escapes (eg. `\u0100`).
 */
const getEscapedAny = (char: string): EscapeSequence | false => {
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
    case `"`:
    case '\\':
      return `\\${char}`;
  }

  let unicode: EscapeSequence | '' = '';

  for (let index = char.length - 1; index >= 0; index--) {
    unicode = `\\u${('000' + char.charCodeAt(index).toString(16)).slice(-4)}${unicode}` as const;
  }

  return unicode || false;
};

export { getEscapedAny };
