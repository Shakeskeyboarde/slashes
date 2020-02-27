# Slashes

Add or strip backslashes.

If you were previously using v1, see the [migration](https://github.com/ChrisAckerman/slashes/blob/master/MIGRATION.md) document for guidance on switching to v2.

# Getting Started

```ts
import { addSlashes, stripSlashes } from 'slashes';
// Or using CommonJS require.
const { addSlashes, stripSlashes } = require('slashes');

addSlashes(`foo\nbar`) === `foo\\nbar`; // true
stripSlashes(`foo\\nbar`) === `foo\nbar`; // true
```

You can also experiment using a pre-configured REPL by running the `npm start` command.

# API

## Adding Slashes

### **Function** `addSlashes(str: string): string`

Returns a string with the following default characters escaped:

- backspace (`"\b"` -> `"\\b"`)
- form feed (`"\f"` -> `"\\f"`)
- newline (`"\n"` -> `"\\n"`)
- carriage return (`"\r"` -> `"\\r"`)
- horizontal tab (`"\t"` -> `"\\t"`)
- vertical tab (`"\v"` -> `"\\v"`)
- null (`"\0"` -> `"\\0"`)
- single quote (`"'"` -> `"\\'"`)
- double quote (`"\""` -> `"\\\""`)
- backslash (`"\\"` -> `"\\\\"`)

All `addSlashes` overloads use the above as the default character set to escape if no explicit character set is given.

```ts
addSlashes(`\b\f\n\r\t\v\0'"\\`) === `\\b\\f\\n\\r\\t\\v\\0\\'\\"\\\\`; // true
```

### **Function** `addSlashes(str: string, characters: string): string`

An `addSlashes` overload which returns a string with _only_ the characters in the `characters` string escaped. The explicit characters completely override the default character set. The default characters string is: `"\b\f\n\r\t\v\0'\"\\"`.

```ts
addSlashes(`foo\nbar`, `oa`) === `f\\o\\o\nb\\ar`; // true
```

Characters in the unicode supplementary range (code points > 65535) are _always_ converted to a unicode escape surrogate pairs. This is because Javascript strings are UTF-16, which actually sees these as two characters (`"😊".length === 2`). So, using 😊 in the `characters` string is actually setting two escapable characters which are _not valid individually._ If the "😊" character were not escaped to two unicode escape sequences, you would end up with a string containing invalid characters which would print like this: `"\\�\\�"`, instead of valid characters: `"\\ud83d\\ude0a"`.

```ts
addSlashes(`foo😊bar`, `😊`) === `foo\\ud83d\\ude0abar`; // true
```

### **Function** `addSlashes(str: string, count: number): string`

An `addSlashes` overload which returns a string with `count` layers of slashes added to the default escape character set. This is the same as recursively invoking this function `count` times.

```ts
addSlashes(`"foo\nbar"`, 2) === `\\\\\\"foo\\\\nbar\\\\\\"`; // true
addSlashes(addSlashes(`"foo\nbar"`)) === `\\\\\\"foo\\\\nbar\\\\\\"`; // true
addSlashes(`"foo\nbar"`, 2) === addSlashes(addSlashes(`"foo\nbar"`)); // true
```

### **Function** `addSlashes(str: string, count: number, characters: string): string`

An `addSlashes` overload which accepts both a `count` and `characters` parameter.

### **Function** `addSlashes(str: string, options: IAddSlashesOptions): string`

An `addSlashes` overload which accepts an options object.

- `options` Configurable options for adding slashes to a string. Can have the following fields:
  - `count` Number of times to add slashes to the string.
  - `characters` A string of characters that should be escaped with slashes.
  - `escapeNonAscii` When true, all non-ASCII characters (unicode code points > 127) will be converted to `\x` or `\u` escape sequences.

```ts
addSlashes(`†©`, { count: 2, characters: `†©\\`, escapeNonAscii: true }) === `\\\\u2020\\\\xa9`; // true
```

## Stripping Slashes

### **Function** `stripSlashes(str: string): string`

Returns a string with one layer of slashes removed. It will convert all ES6 escape sequences into their corresponding characters. Slashes which are not part of a recognized escape sequence are removed, and the following character is left in place.

```ts
stripSlashes(`\\b\\f\\n\\r\\t\\v\\0\\xa9\\u2020\\u{1f60a}\\a\\\\`) === `\b\f\n\r\t\v\0©†😊a\\`; // true
```

If a `\u{...}` escape sequence has a code point greater than 0x10ffff, the slash is removed and the `u{...}` suffix is left as a literal string.

```ts
stripSlashes(`\\u{110000}`) === `u{110000}`; // true
```

### **Function** `stripSlashes(str: string, count: number): string`

A `stripSlashes` overload which returns a string with `count` layers of slashes removed. This is the same as recursively invoking this function `count` times.

```ts
stripSlashes(`\\\\n\\\\a\\\\\\\\`, 2) === `\na\\`; // true
stripSlashes(stripSlashes(`\\\\n\\\\a\\\\\\\\`)) === `\na\\`; // true
stripSlashes(`\\\\n\\\\a\\\\\\\\`, 2) === stripSlashes(stripSlashes(`\\\\n\\\\a\\\\\\\\`)); // true
```

### **Function** `stripSlashes(str: string, options: IStripSlashesOptions): string`

A `stripSlashes` overload which accepts an options object.

- `options` Configurable options for stripping slashes from a string. Can have the following fields:
  - `count` Number of times to strip slashes from the string.
  - `defaultEscapeValue` The default value for all escape options (b, f, n, r, t, v, 0, x, u, and uEs6). When true, escape options must be explicitly disabled. When false, escape options must be explicitly enabled. Defaults to true.
  - `b` True to convert `"\\b"` escapes into backspace characters. Defaults to `defaultEscapeValue`.
  - `f` True to convert `"\\f"` escapes into form feed characters. Defaults to `defaultEscapeValue`.
  - `n` True to convert `"\\n"` escapes into newline (line feed) characters. Defaults to `defaultEscapeValue`.
  - `r` True to convert `"\\r"` escapes into carriage return characters. Defaults to `defaultEscapeValue`.
  - `t` True to convert `"\\t"` escapes into horizontal tab characters. Defaults to `defaultEscapeValue`.
  - `v` True to convert `"\\v"` escapes into vertical tab characters. Defaults to `defaultEscapeValue`.
  - `0` True to convert `"\\0"` escapes into null characters. Defaults to `defaultEscapeValue`.
  - `x` True to convert `"\\x##"` escapes (where `##` is a hex single byte unicode code point) into unicode characters. Defaults to `defaultEscapeValue`.
  - `u` True to convert `"\\u####"` escapes (where `####` is a hex two byte unicode code point) into unicode characters. Defaults to `defaultEscapeValue`.
  - `uEs6` True to convert `"\\u{#...}"` escapes (where `#...` is a hex unicode code point) into unicode characters. Defaults to `u`.

If an escape option is false, then the corresponding escape sequence will be treated like any other backslash before a non-escape character. The backslash will be removed, and all trailing characters left untouched.

```ts
stripSlashes(`\\\\tfoo\\\\nbar`, {
  // Strip slashes twice.
  count: 2,
  // All escape sequences are disabled by default.
  defaultEscapeValue: false,
  // Enable newlines escapes explicitly.
  n: true
}) === `tfoo\nbar`; // true
```
