import { addSlashes } from './add-slashes';

test(`add slashes to default character set`, () => {
  expect(addSlashes(`a\b\f\n\rb\t\v\0'"\\`)).toBe(`a\\b\\f\\n\\rb\\t\\u000b\\u0000'\\"\\\\`);
});

test(`use getEscaped override`, () => {
  expect(addSlashes('abc', { getEscaped: (char) => `\\${char}` })).toBe('\\a\\b\\c');
  expect(addSlashes('a', { getEscaped: () => `\\` })).toBe('\\u0061');
});
