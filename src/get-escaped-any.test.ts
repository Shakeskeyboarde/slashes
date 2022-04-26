import { getEscapedAny } from './get-escaped-any';

test('encode supplementary characters', () => {
  expect(getEscapedAny('😊')).toBe('\\ud83d\\ude0a');
});

test('encode multilingual characters', () => {
  expect(getEscapedAny('Ā')).toBe('\\u0100');
});

test('encode simple characters', () => {
  expect(getEscapedAny('a')).toBe('\\u0061');
});

describe('encode to JSON-safe single letter escapes', () => {
  [...`\b\f\n\r\t"`].forEach((char) => {
    const expected = JSON.stringify(char).slice(1, -1);

    test(expected, () => {
      expect(getEscapedAny(char)).toMatch(expected);
    });
  });
});
