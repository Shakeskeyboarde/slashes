import { getUnescapedDefault } from './get-unescaped-default';

type RemoveSlashesOptions = {
  readonly getUnescaped?: (sequence: number | `\\${string}`) => string | null;
};

/**
 * Remove one layer of slashes, decoding any valid escape sequences into their
 * corresponding characters (eg. `\\n` will become a newline).
 *
 * Use the `getUnescaped` option to customize escape sequence decoding.
 */
const removeSlashes = (source: string, { getUnescaped = getUnescapedDefault }: RemoveSlashesOptions = {}): string => {
  const rx = /(?:\\(u([0-9a-f]{4})|u\{([0-9a-f]+)\}|x([0-9a-f]{2})|(\d{1,3})|([\s\S]|$))|[\s\S])/giu;
  let match: RegExpExecArray | null;
  let result = '';

  while (null != (match = rx.exec(source))) {
    const [literal, sequence, unicode, unicodePoint, hex, octal, char] = match;

    try {
      if (char != null) {
        result += getUnescaped(literal as `\\${string}`) ?? sequence;
      } else if (octal) {
        result += getUnescaped(Number.parseInt(octal, 8)) ?? sequence;
      } else {
        const code = unicodePoint || unicode || hex;

        if (code) {
          result += getUnescaped(Number.parseInt(code, 16)) ?? sequence;
        } else {
          result += literal;
        }
      }
    } catch {
      result += sequence;
    }
  }

  return result;
};

/**
 * @deprecated Use {@link removeSlashes} instead.
 */
const stripSlashes = removeSlashes;

export { removeSlashes, stripSlashes };
