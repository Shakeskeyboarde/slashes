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

By default, `addSlashes` will escape the following JSON-unsafe characters.

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
const encoded = addSlashes(`\n`); // "\\n"
```

This default character set is the characters which cannot be included in a JSON string literal.

```ts
const jsonString = `{ "value": "${encoded}" }`;
```

Escape encoding can be customized using the `getEscaped` option.

The following is the default, equivalent to not setting the `getEscaped` option.

```ts
import { getEscapedJsonUnsafe } from 'slashes';

addSlashes(`\n`, { getEscaped: getEscapedJsonUnsafe }); // "\\n"
```

Included `getEscaped` implementations:

- `getEscapedJsonUnsafe` - (Default) Encode characters which cannot be used between quotes in a JSON string.
- `getEscapedAny` - Encode _ANY_ character to a single letter (eg. `\n`) or an ES5 Unicode (eg. `\u0100`) escape sequence.

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

The following is the default, equivalent to not setting the `getUnescaped` option.

```ts
import { getUnescapedAny } from 'slashes';

removeSlashes('\\n', { getUnescaped: getUnescapedAny }); // "\n"
```

The `getUnescapedAny` implementation is the only one included.
