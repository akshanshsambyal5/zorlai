/** Production domains — must match Supabase redirect URL allowlist */
export const PRODUCTION_ORIGINS = ['https://zorlai.xyz', 'https://www.zorlai.xyz'] as const;

function isLocalhostUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return host === 'localhost' || host === '127.0.0.1' || host === '[::1]';
  } catch {
    return true;
  }
}

/**
 * Resolves the app origin for OAuth redirects.
 * In the browser, always uses the current origin so apex/www both work in production.
 * Ignores VITE_APP_URL when it points at localhost but the site is deployed.
 */
export function getAppOrigin(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  const envUrl = import.meta.env.VITE_APP_URL?.trim();
  if (envUrl && !isLocalhostUrl(envUrl)) {
    return envUrl.replace(/\/$/, '');
  }

  return PRODUCTION_ORIGINS[0];
}

/** Full URL Supabase should redirect to after OAuth (must be allowlisted in Supabase). */
export function getAuthRedirectUrl(path = '/'): string {
  const base = getAppOrigin();
  const route = path.startsWith('/') ? path : `/${path}`;
  return `${base.replace(/\/$/, '')}${route}`;
}
