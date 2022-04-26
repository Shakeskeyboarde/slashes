import { getEscapedMultibyteES5 } from './get-escaped-multibyte-es5';

test('ES5 unicode escape', () => {
  expect(getEscapedMultibyteES5('😊')).toBe('\\ud83d\\ude0a');
});

test('skip single byte characters', () => {
  expect(getEscapedMultibyteES5('a')).toBeNull();
});
