export const SINGLE_CHAR_ESCAPES: ReadonlyMap<string, string> = new Map<string, string>([
  ['b', '\b'],
  ['f', '\f'],
  ['n', '\n'],
  ['r', '\r'],
  ['t', '\t'],
  ['v', '\v'],
  ['0', '\0']
]);

export const CHAR_TO_ESCAPE: ReadonlyMap<string, string> = [...SINGLE_CHAR_ESCAPES.keys()].reduce((map, code) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  map.set(SINGLE_CHAR_ESCAPES.get(code)!, `\\${code}`);
  return map;
}, new Map<string, string>());
