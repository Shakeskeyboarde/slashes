import { MyClass } from '.';

it('should just work', () => {
  const myClass = new MyClass();

  expect(myClass.hello()).toBe('world!');
});
