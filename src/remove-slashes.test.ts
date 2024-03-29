import { removeSlashes } from './remove-slashes.js';

test(`remove slashes`, () => {
  expect(removeSlashes(`a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`)).toBe(`a\b\f\n\rb\t\v\0'"\\`);
});

test('remove the slash for invalid unicode code points', () => {
  expect(removeSlashes('\\u{10ffff}\\u{110000}')).toBe('􏿿u{110000}');
});

describe('handle all escape sequence types', () => {
  const cases = [
    ['😊', '\\ud83d\\ude0a'],
    ['😊', '\\u{1f60a}'],
    ['†', '\\u{2020}'],
    ['†', '\\u2020'],
    ['©', '\\xa9'],
    ['a', '\\x61'],
    ['a', '\\141'],
    ['', '\\'],
  ] as const;

  cases.forEach(([to, from]) => {
    test(`convert "${JSON.stringify(from).slice(1, -1)}" to "${to}"`, () => {
      expect(removeSlashes(from)).toBe(to);
    });
  });
});

test('use getUnescaped override', () => {
  expect(removeSlashes('\\r\\n\\t', { getUnescaped: (sequence) => `${sequence}`.slice(1) })).toBe('rnt');
  expect(removeSlashes('\\r\\n\\t\\a', { getUnescaped: () => true })).toBe('\r\n\ta');
});
