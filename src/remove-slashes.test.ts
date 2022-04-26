import { removeSlashes } from './remove-slashes';

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
  ];

  cases.forEach(([to, from]) => {
    test(`convert ${from} to ${to}`, () => {
      expect(removeSlashes(from)).toBe(to);
    });
  });
});

test('use getUnescaped override', () => {
  expect(removeSlashes('\\r\\n\\t', { getUnescaped: (sequence) => `${sequence}`.slice(1) })).toBe('rnt');
});
