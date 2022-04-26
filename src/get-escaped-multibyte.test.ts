import { getEscapedMultibyte } from './get-escaped-multibyte';

test('ES5 unicode escape', () => {
  expect(getEscapedMultibyte('😊')).toBe('\\ud83d\\ude0a');
});

test('skip single byte characters', () => {
  expect(getEscapedMultibyte('a')).toBeNull();
});
