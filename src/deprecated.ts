const guard = new Set<string>();

export function deprecated(message: string) {
  if (!guard.has(message)) {
    guard.add(message);
    console.warn(message);
  }
}
