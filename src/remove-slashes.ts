import { getUnescapedAny } from './get-unescaped-any';
import { type EscapeSequence } from './types/escape-sequence';

type RemoveSlashesOptions = {
  readonly getUnescaped?: (sequence: EscapeSequence, code: number | null) => boolean | string;
};

/**
 * Remove one layer of slashes, decoding any valid escape sequences into their
 * corresponding characters (eg. `\\n` will become a newline).
 *
 * Use the `getUnescaped` option to customize escape sequence decoding.
 */
const removeSlashes = (source: string, { getUnescaped = getUnescapedAny }: RemoveSlashesOptions = {}): string => {
  const rx = /(?:(\\(u([0-9a-f]{4})|u\{([0-9a-f]+)\}|x([0-9a-f]{2})|(\d{1,3})|([\s\S]|$)))|([\s\S]))/giu;

  let match: RegExpExecArray | null;
  let result = '';

  while (null != (match = rx.exec(source))) {
    const [, sequence, fallback, unicode, unicodePoint, hex, octal, char, literal] = match;

    if (literal) {
      result += literal;
      continue;
    }

    let code: number | null;

    if (char != null) {
      code = null;
    } else if (octal) {
      code = Number.parseInt(octal, 8);
    } else {
      code = Number.parseInt(unicodePoint || unicode || hex, 16);
    }

    try {
      const unescaped = getUnescaped(sequence as EscapeSequence, code);

      if (!unescaped) {
        result += fallback;
      } else if (unescaped === true) {
        result += getUnescapedAny(sequence as EscapeSequence, code) || fallback;
      } else {
        result += unescaped;
      }
    } catch (_error) {
      result += fallback;
    }
  }

  return result;
};

/**
 * @deprecated Use {@link removeSlashes} instead.
 */
const stripSlashes = removeSlashes;

export { removeSlashes, stripSlashes };
