/** Coerce unknown API/DB values to arrays — prevents spread/map on null or objects. */
export function ensureArray<T>(value: readonly T[] | T[] | null | undefined): T[];
export function ensureArray<T>(value: unknown): T[];
export function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  return [];
}
