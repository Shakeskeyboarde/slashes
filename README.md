# Slashes

Add or remove backslashes (escape or unescape).

[![npm version](https://badgen.net/npm/v/slashes?icon=npm&label=version)](https://www.npmjs.com/package/slashes)
[![npm downloads](https://badgen.net/npm/dw/slashes?icon=npm&color=blue&label=downloads)](https://www.npmjs.com/package/slashes)
[![github stars](https://badgen.net/github/stars/Shakeskeyboarde/slashes?icon=github)](https://github.com/Shakeskeyboarde/slashes)
[![build status](https://badgen.net/travis/Shakeskeyboarde/slashes?icon=travis&label=build)](https://www.travis-ci.com/github/Shakeskeyboarde/slashes)
[![coverage status](https://badgen.net/coveralls/c/github/Shakeskeyboarde/slashes/main)](https://coveralls.io/github/Shakeskeyboarde/slashes)
[![bundle size](https://badgen.net/bundlephobia/minzip/slashes?label=size)](https://bundlephobia.com/result?p=slashes)

# Getting Started

```ts
import { addSlashes, removeSlashes } from 'slashes';

addSlashes(`foo\nbar`); // "foo\\nbar"
removeSlashes(`foo\\nbar`); // "foo\nbar"
```

## Adding Slashes

By default, `addSlashes` will escape the following characters.

- Backspace (`\b`)
- Form Feed (`\f`)
- Newline (`\n`)
- Carriage Return (`\r`)
- Horizontal Tab (`\t`)
- Vertical Tab (`\v`)
- Null (`\0`)
- Double Quote (`"`)
- Backslash (`\`)

```ts
addSlashes(`\n`); // "\\n"
```

This default character set is intended to create a value which is safe to "inject" into a JSON string literal as follows.

```ts
const jsonString = `{ "value": "${encoded}" }`;
```

Additional escaping or overriding escapes can be configured using the `getEscaped` option.

The following example escapes the above characters with single letter escapes, and also encodes all multi-byte characters as ES5 Unicode escape sequences.

```ts
import { getEscapedDefault, getEscapedMultibyte } from 'slashes';

addSlashes(`\n😊`, {
  getEscaped: (char) => getEscapedDefault(char) ?? getEscapedMultibyte(char),
}); // "\\n\\ud83d\\ude0a"
```

An ES6 Unicode Code Point escape function is also included.

```ts
import { getEscapedDefault, getEscapedMultibyteES6 } from 'slashes';

addSlashes(`\n😊`, {
  getEscaped: (char) => getEscapedDefault(char) ?? getEscapedMultibyteES6(char),
}); // "\\n\\u{1f60a}"
```

## Removing Slashes

The `removeSlashes` function will _always_ remove one layer of slashes.

```ts
// Handles letter escapes
removeSlashes(`\\n`); // "\n"
// Handles ES6 Unicode Code Point escapes
removeSlashes('\\u{a}'); // "\n"
// Handles ES5 Unicode escapes
removeSlashes('\u000a'); // "\n"
// Handles hex escapes
removeSlashes('\x0a'); // "\n"
// Handles octal escapes
removeSlashes('\12'); // "\n"
// The slash is removed if the escape sequence is invalid
removeSlashes(`\\a`); // "a"
```

Although it should generally not be necessary because all escapes are automatically handled, escape decoding can be customized using the `getUnescaped` option.

```ts
import { getUnescapedDefault } from 'slashes';

removeSlashes('\\n', {
  getUnescaped: (sequence) => (sequence === '\\n' ? '\r\n' : null),
}); // "\r\n"
```
