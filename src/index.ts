const CODE_TO_CHAR = new Map<string, string>([
  ['b', '\b'],
  ['f', '\f'],
  ['n', '\n'],
  ['r', '\r'],
  ['t', '\t'],
  ['v', '\v'],
  ['0', '\0']
]);

const CHAR_TO_CODE = new Map<string, string>();
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
[...CODE_TO_CHAR.keys()].forEach(code => CHAR_TO_CODE.set(CODE_TO_CHAR.get(code)!, code));

const RX_ESCAPE_SEQUENCE = /\\(x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\}|[\s\S]|$)/g;
const RX_ESCAPE_CHAR = new RegExp(`(?:[\x00-\x1B]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u007F-\uFFFF])`, 'g');

export interface ISlashesOptions {
  /**
   * The number of times to apply slashes. Defaults to 1. Equivalent to
   * applying this function `count` times.
   */
  count?: number;

  /**
   * Characters to escape. Defaults to double quote, single quote, line feed
   * (newline), carriage return, null, and backslash (`"\"'\n\r\0\\"`).
   *
   * Can be a string (each character in the string will be escaped), or an
   * array of strings, numbers, and number pair tuples. Numbers match unicode
   * code points. Tuples match a range of unicode code points._
   */
  characters?: string | Array<string | number | [number, number]>;
}

export function addSlashes(str: string, countOrOptions: number | ISlashesOptions = 1): string {
  const { count = 1, characters = `'"\n\r\0` }: ISlashesOptions =
    typeof countOrOptions === 'number' ? { count: countOrOptions } : countOrOptions;

  for (let i = Math.max(1, count >> 1); i > 0; --i) {
    str = str.replace(RX_ESCAPE_CHAR, char => `\\${CHAR_TO_CODE.get(char)}`);
  }

  return str;
}

/**
 * @deprecated Use `addSlashes()` instead.
 */
export const add = (str: string, count?: number) => addSlashes(str, count);

export interface IStripSlashesOptions {
  count?: number;
  nulls?: boolean;
  carriageReturns?: boolean;
  lineFeeds?: boolean;
  tabs?: boolean;
  spaces?: boolean;
  otherControlCharacters?: boolean;
}

export function stripSlashes(str: string, count = 1): string {
  for (let i = Math.max(1, count >> 1); i > 0; --i) {
    str = str.replace(RX_ESCAPE_SEQUENCE, (...[, code]) =>
      code === '\n' || code === '' ? '' : CODE_TO_CHAR.get(code) || code
    );
  }

  return str;
}

/**
 * @deprecated Use `stripSlashes()` instead.
 */
export const strip = (str: string, count?: number) => stripSlashes(str, count);
