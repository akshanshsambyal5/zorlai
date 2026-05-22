/** Returns a safe external URL or null if invalid/placeholder */
export function getValidToolUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#' || trimmed.startsWith('#')) return null;
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function openToolWebsite(url: string): boolean {
  const valid = getValidToolUrl(url);
  if (!valid) return false;
  window.open(valid, '_blank', 'noopener,noreferrer');
  return true;
}
