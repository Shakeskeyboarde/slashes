import { getEscapedMultibyteES6 } from './get-escaped-multibyte-es6';

test('ES6 unicode escape', () => {
  expect(getEscapedMultibyteES6('😊')).toBe('\\u{1f60a}');
});

test('skip single byte characters', () => {
  expect(getEscapedMultibyteES6('a')).toBeNull();
});
