import { add, addSlashes } from './addSlashes';

describe('should add slashes N times.', () => {
  const cases = [
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`,
    `a\\\\b\\\\f\\\\n\\\\rb\\\\t\\\\v\\\\0\\\\\\'\\\\\\"\\\\\\\\`,
    `a\\\\\\\\b\\\\\\\\f\\\\\\\\n\\\\\\\\rb\\\\\\\\t\\\\\\\\v\\\\\\\\0\\\\\\\\\\\\\\'\\\\\\\\\\\\\\"\\\\\\\\\\\\\\\\`
  ];

  cases.forEach((value, i) => {
    it(`should add slashes ${i - 1} times.`, () => {
      expect(addSlashes(`a\b\f\n\rb\t\v\0'"\\`, i - 1)).toBe(value);
    });
  });

  it(`should add slashes 1 time by default.`, () => {
    expect(addSlashes(`a\b\f\n\rb\t\v\0'"\\`)).toBe(`a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`);
  });
});

describe('it should escape supplementary unicode characters, but not basic.', () => {
  const cases = [
    ['😊', '\\ud83d\\ude0a'],
    ['†', '\\†'],
    ['©', '\\©'],
    ['a', '\\a']
  ];

  cases.forEach(([from, to]) => {
    it(`should convert ${from} to ${to}.`, () => {
      expect(addSlashes(from, from)).toBe(to);
    });
  });
});

describe('it should escape non-ascii characters if the escapeNonAscii option is true.', () => {
  const cases = [
    ['😊', '\\ud83d\\ude0a'],
    ['†', '\\u2020'],
    ['ā', '\\u0101'],
    ['©', '\\xa9'],
    ['a', '\\a']
  ];

  cases.forEach(([from, to]) => {
    it(`should convert ${from} to ${to}.`, () => {
      expect(addSlashes(from, { characters: from, escapeNonAscii: true })).toBe(to);
    });
  });
});

describe('legacy add() function', () => {
  it('should only add slashes to newlines, nulls, single quotes, double quotes, and backslashes.', () => {
    expect(add(`\b\f\n\r\t\v\0'"\\\xa9\u2020\u{1f60a}`)).toBe(`\b\f\\n\r\t\v\\0\\'\\"\\\\\xa9\u2020\u{1f60a}`);
  });
});
