import { getEscapedJsonUnsafe } from './get-escaped-json-unsafe.js';

describe('true for JSON unsafe characters', () => {
  [...`\b\f\n\r\t\v\0"`].forEach((char) => {
    const escape = JSON.stringify(char).slice(1, -1);
    test(escape, () => {
      expect(getEscapedJsonUnsafe(char)).toBe(true);
    });
  });
});

describe('false for JSON safe characters', () => {
  [...'abc123😄'].forEach((char) => {
    test(char, () => {
      expect(getEscapedJsonUnsafe(char)).toBe(false);
    });
  });
});
