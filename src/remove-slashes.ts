import { getUnescapedAny } from './get-unescaped-any';
import { type EscapeSequence } from './types/escape-sequence';

type RemoveSlashesOptions = {
  readonly getUnescaped?: (sequence: EscapeSequence, code: number | null) => string | false;
};

/**
 * Remove one layer of slashes, decoding any valid escape sequences into their
 * corresponding characters (eg. `\\n` will become a newline).
 *
 * Use the `getUnescaped` option to customize escape sequence decoding.
 */
const removeSlashes = (source: string, { getUnescaped = getUnescapedAny }: RemoveSlashesOptions = {}): string => {
  const rx = /(?:\\(u([0-9a-f]{4})|u\{([0-9a-f]+)\}|x([0-9a-f]{2})|(\d{1,3})|([\s\S]|$))|[\s\S])/giu;

  let match: RegExpExecArray | null;
  let result = '';

  while (null != (match = rx.exec(source))) {
    const [sequence, escapedFallback, unicode, unicodePoint, hex, octal, char] = match;

    try {
      if (char != null) {
        result += getUnescaped(sequence as EscapeSequence, null) || escapedFallback;
      } else if (octal) {
        result += getUnescaped(sequence as EscapeSequence, Number.parseInt(octal, 8)) || escapedFallback;
      } else {
        const code = unicodePoint || unicode || hex;

        if (code) {
          result += getUnescaped(sequence as EscapeSequence, Number.parseInt(code, 16)) || escapedFallback;
        } else {
          result += sequence;
        }
      }
    } catch {
      result += escapedFallback;
    }
  }

  return result;
};

/**
 * @deprecated Use {@link removeSlashes} instead.
 */
const stripSlashes = removeSlashes;

export { removeSlashes, stripSlashes };
