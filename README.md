# slashes

Add or strip backslashes.

Provides two methods, `add` and `strip` which are identical to PHP's `addslashes` and `stripslashes` functions
respectively.

The `add` method will prefix backslash (`\`), double quote (`"`), and single quote (`'`) characters with
backslashes. Null (`\0`) characters will be replaced with backslash zero `"\\0"`.

The `strip` method replaces all sequences of two characters that start with a backslash, with the second character in
the sequence. There are two caveats. A single non-escaped slash at the end of the string will be removed. Backslash
zero `"\\0"` will become a null (`\0`) character.

## Install

```sh
npm install slashes --save
```

## Usage

```
slashes.add(string, [number])
slashes.strip(string, [number])
```

If a non-string value is passed as the first parameter, it will be coerced to a string.

If a non-number is passed as the second parameter, it will be coerced to a number. Negative numbers are equivalent to
their positive counter parts. Zero is the same as one.

### Examples
```js
var slashes = require('slashes');

var test = "'test'\n\"ing\"\0";
var added = slashes.add(test);
var stripped = slashes.strip(added);

console.log("test:\n%s\n", test);
console.log("added:\n%s\n", added);
console.log("stripped:\n%s\n", stripped);
```

Output should be...
```
test:
'test'
"ing"

added:
\'test\'
\"ing\"\0

stripped:
'test'
"ing"

```

Both methods also take an optional second number parameter, 1 or greater. This is equivalent to calling the method
that many times.
```js
slashes.add(string, 2);
// ...is the same as...
slashes.add(slashes.add(string));

slashes.strip(string, 2);
// ...is the same as...
slashes.strip(slashes.strip(string));
```

Note that in JavaScript, "\0" and "\u0000" are identical. The `add` method will convert both to `"\\0"`.