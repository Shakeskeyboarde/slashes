export function getSingleCharEscapes(): Map<string, string> {
  return [
    ['b', '\b'],
    ['f', '\f'],
    ['n', '\n'],
    ['r', '\r'],
    ['t', '\t'],
    ['v', '\v'],
    ['0', '\0']
  ].reduce((map, [key, value]) => {
    map.set(key, value);
    return map;
  }, new Map());
}

export const SINGLE_CHAR_ESCAPES: ReadonlyMap<string, string> = getSingleCharEscapes();

export const CHAR_TO_ESCAPE: ReadonlyMap<string, string> = [...SINGLE_CHAR_ESCAPES.keys()].reduce((map, code) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  map.set(SINGLE_CHAR_ESCAPES.get(code)!, `\\${code}`);
  return map;
}, new Map<string, string>());
