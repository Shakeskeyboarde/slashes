# Slashes: Migration Guide

The `add()` and `strip()` functions from v1 still exist and should be completely backwards compatible. However, they are marked as deprecated, and you should migrate to the new `addSlashes()` and `stripSlashes()` functions.

## New Features

- Typescript definitions are included.
- Complete unit tests.
- Includes CommonJS require (`lib-commonjs`) and ES6 import (`lib`) versions.
  - See the package.json `main` and `module` values.
  - Node, Yarn, Webpack, etc. should use the correct version automatically.
- Escaped characters are configurable.
- More escape sequences are/can be decoded (all ES6 string escapes).
- Supports Unicode.

## Migrating from `add()` to `addSlashes()`

The `addSlashes()` function can be called with the exact same parameters as the legacy `add()` function. However, `addSlashes()` will escape more characters by default. The `add()` function only escaped newlines, nulls, quotes (double/single), and backslashes. The `addSlashes()` function also escapes backspaces, form feeds, carriage returns, tabs, and vertical tabs.

Some additional features of `addSlashes()` that `add()` did not have:

- Which characters are escaped is configurable.
- Can convert non-ASCII characters (char codes > 127) to escape sequences (e.g. `"\\xa9"`, `"\\u2020"`) when the `escapeNonAscii` option is set to true.

## Migrating from `strip()` to `stripSlashes()`

The `stripSlashes()` function can be called with the exact same parameters as the legacy `strip()` function. However, `stripSlashes()` will decode more escape sequences by default. The `strip()` function only decoded newlines and nulls. The `stripSlashes()` function also decodes backspaces, form feeds, carriage returns, tabs, vertical tabs, hex escapes, and unicode escapes (both `\u0000` and ES6 `\u{0}`).

Some additional features of `stripSlashes()` that `strip()` did not have:

- Which escape sequence types are decoded is configurable.
