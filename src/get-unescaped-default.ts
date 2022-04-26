const getUnescapedDefault = (sequence: number | `\\${string}`): string | null => {
  if (typeof sequence !== 'string') {
    return String.fromCodePoint(sequence);
  }

  switch (sequence) {
    case '\\b':
      return '\b';
    case '\\f':
      return '\f';
    case '\\n':
      return '\n';
    case '\\r':
      return '\r';
    case '\\t':
      return '\t';
    case '\\v':
      return '\v';
    case '\\0':
      return '\0';
  }

  return null;
};

export { getUnescapedDefault };
