import { SINGLE_CHAR_ESCAPES } from './escapes';
import { strip, stripSlashes } from './stripSlashes';

describe('should strip slashes N times.', () => {
  const cases = [
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\\\b\\\\f\\\\n\\\\rb\\\\t\\\\v\\\\0\\\\'\\\\"\\\\\\\\`,
    `a\\\\\\\\b\\\\\\\\f\\\\\\\\n\\\\\\\\rb\\\\\\\\t\\\\\\\\v\\\\\\\\0\\\\\\\\'\\\\\\\\"\\\\\\\\\\\\\\\\`
  ];

  cases.forEach((value, i) => {
    it(`should strip slashes ${i - 1} times.`, () => {
      expect(stripSlashes(value, i - 1)).toBe(`a\b\f\n\rb\t\v\0'"\\`);
    });
  });

  it(`should strip slashes 1 time by default.`, () => {
    expect(stripSlashes(`a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`)).toBe(`a\b\f\n\rb\t\v\0'"\\`);
  });
});

describe('it should unescape unicode and hex escape sequences.', () => {
  const cases = [
    ['😊', '\\ud83d\\ude0a'],
    ['😊', '\\u{1f60a}'],
    ['†', '\\u{2020}'],
    ['†', '\\u2020'],
    ['©', '\\xa9'],
    ['a', '\\x61']
  ];

  cases.forEach(([to, from]) => {
    it(`should convert ${from} to ${to}.`, () => {
      expect(stripSlashes(from)).toBe(to);
    });
  });

  it('should just remove the slash for invalid unicode code points.', () => {
    expect(stripSlashes('\\u{10ffff}\\u{110000}')).toBe('􏿿u{110000}');
  });
});

describe('should not escape if the escape code is disabled.', () => {
  const cases = [...SINGLE_CHAR_ESCAPES.entries(), ['x', '\xa9'], ['u', '\u2020'], ['uEs6', '\u{1f60a}']];
  const input = `\\b\\f\\n\\r\\t\\v\\0\\xa9\\u2020\\u{1f60a}`;

  cases.forEach(([option, char]) => {
    it(`should honor the ${option} option.`, () => {
      expect(stripSlashes(input, { [option]: false })).not.toContain(char);
      expect(stripSlashes(input, { defaultEscapeValue: false, [option]: true })).toContain(char);
    });
  });
});

describe('legacy strip() function', () => {
  it('should only escape newlines and nulls.', () => {
    expect(strip(`\\b\\f\\n\\r\\t\\v\\0\\xa9\\u2020\\u{1f60a}`)).toBe(`bf\nrtv\0xa9u2020u{1f60a}`);
  });
});
