import { getEscapedMultibyte } from './get-escaped-multibyte';

test('ES6 unicode escape', () => {
  expect(getEscapedMultibyte('😊')).toBe('😊'.codePointAt(0));
});

test('skip single byte characters', () => {
  expect(getEscapedMultibyte('a')).toBeNull();
});
