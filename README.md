# Slashes

Add or remove backslashes (escape or unescape).

[![npm version](https://badgen.net/npm/v/slashes?icon=npm&label=version)](https://www.npmjs.com/package/slashes)
[![npm downloads](https://badgen.net/npm/dw/slashes?icon=npm&color=blue&label=downloads)](https://www.npmjs.com/package/slashes)
[![github stars](https://badgen.net/github/stars/Shakeskeyboarde/slashes?icon=github)](https://github.com/Shakeskeyboarde/slashes)
[![build status](https://badgen.net/travis/Shakeskeyboarde/slashes?icon=travis&label=build)](https://www.travis-ci.com/github/Shakeskeyboarde/slashes)
[![coverage status](https://badgen.net/coveralls/c/github/Shakeskeyboarde/slashes/main)](https://coveralls.io/github/Shakeskeyboarde/slashes)
[![bundle size](https://badgen.net/bundlephobia/minzip/slashes?label=size)](https://bundlephobia.com/result?p=slashes)

# Getting started

```ts
import { addSlashes, removeSlashes } from 'slashes';

addSlashes(`foo\nbar`); // "foo\\nbar"
removeSlashes(`foo\\nbar`); // "foo\nbar"
```

## Adding slashes

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

### Custom encoding

Escape encoding can be customized using the `getEscaped` option.

The following is the default, equivalent to not setting the `getEscaped` option.

```ts
import { getEscapedJsonUnsafe } from 'slashes';

addSlashes(`\n`, { getEscaped: getEscapedJsonUnsafe }); // "\\n"
```

Included `getEscaped` implementations:

- `getEscapedJsonUnsafe` - (Default) Encode characters which cannot be used between quotes in a JSON string.
- `getEscapedAny` - Encode _ANY_ character to a single letter (eg. `\n`) or an ES5 Unicode (eg. `\u0100`) escape sequence.

A custom `getEscaped` receives one character (may be Unicode > 2 bytes) at a time. It can return `true` to use the standard escape sequence, `false` to not escape the character, or a string to provide a custom escape sequence (must begin with a backslash and be at least 2 characters long).

```ts
getEscaped(character: string): boolean | `\\${string}` | ''
```

## Removing slashes

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

### Custom decoding

Although it should generally not be necessary because all escapes are automatically handled, escape decoding can be customized using the `getUnescaped` option.

The following is the default, equivalent to not setting the `getUnescaped` option.

```ts
import { getUnescapedAny } from 'slashes';

removeSlashes('\\n', { getUnescaped: getUnescapedAny }); // "\n"
```

Included `getUnescaped` implementations:

- `getUnescapedAny` - Decode _ANY_ Javascript supported escape sequence.

A custom `getUnescaped` implementation receives the escape sequence as the first argument, and the escape sequence code point number or `null` (for single letter escape sequences) as the second argument. It can return `true` to use standard decoding, `false` to treat the sequence as invalid (only removes the leading backslash), or a string to provide a custom decoded value for the escape sequence.

```ts
getUnescaped(sequence: `\\${string}`, code: number | null): boolean | string
```
