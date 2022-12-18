import { type EscapeSequence } from './types/escape-sequence.js';

const getUnescapedAny = (sequence: EscapeSequence, code: number | null): string | false => {
  if (code != null) {
    return String.fromCodePoint(code);
  }

  switch (sequence) {
    case '\\b':
      return '\b';
    case '\\f':
      return '\f';
    case '\\n':
      return '\n';
    case '\\r':
      return '\r';
    case '\\t':
      return '\t';
    case '\\v':
      return '\v';
    // Not necessary because "\\0" is interpreted as an octal escape, so the
    // `code` argument is set.
    // case '\\0':
    //   return '\0';
  }

  return false;
};

export { getUnescapedAny };
