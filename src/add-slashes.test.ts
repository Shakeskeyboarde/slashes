import { addSlashes } from './add-slashes';

test(`add slashes to default characters`, () => {
  expect(addSlashes(`a\b\f\n\rb\t\v\0'"\\`)).toBe(`a\\b\\f\\n\\rb\\t\\v\\0\\'\\"\\\\`);
});
