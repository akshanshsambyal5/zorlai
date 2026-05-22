import { getAuthErrorMessage } from './authErrors';
import { dashboardPath } from './router';

export const OAUTH_REDIRECT_KEY = 'zorlai_oauth_redirect';

const AUTH_QUERY_KEYS = ['code', 'error', 'error_description', 'error_code', 'access_token', 'refresh_token', 'type'];

export function storeOAuthRedirect(path: string): void {
  if (typeof window === 'undefined') return;
  if (path.startsWith('/') && !path.startsWith('//')) {
    sessionStorage.setItem(OAUTH_REDIRECT_KEY, path);
  }
}

export function getSafeRedirectFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  return null;
}

export function consumeOAuthRedirect(): string {
  if (typeof window === 'undefined') return dashboardPath();

  const stored = sessionStorage.getItem(OAUTH_REDIRECT_KEY);
  sessionStorage.removeItem(OAUTH_REDIRECT_KEY);
  if (stored && stored.startsWith('/') && !stored.startsWith('//')) {
    return stored;
  }

  return getSafeRedirectFromUrl() ?? dashboardPath();
}

function getHashParams(): URLSearchParams {
  const hash = window.location.hash.replace(/^#/, '');
  return new URLSearchParams(hash);
}

export function hasAuthCallbackInUrl(): boolean {
  const search = new URLSearchParams(window.location.search);
  const hash = getHashParams();
  return (
    search.has('code') ||
    hash.has('access_token') ||
    search.has('error') ||
    hash.has('error') ||
    search.has('error_description') ||
    hash.has('error_description')
  );
}

export function parseAuthCallbackError(): string | null {
  const search = new URLSearchParams(window.location.search);
  const hash = getHashParams();
  const error = search.get('error') || hash.get('error');
  const description = search.get('error_description') || hash.get('error_description');

  if (!error && !description) return null;

  const raw = description || error || 'Authentication failed';
  try {
    return decodeURIComponent(raw.replace(/\+/g, ' '));
  } catch {
    return raw;
  }
}

export function cleanAuthCallbackFromUrl(): void {
  const url = new URL(window.location.href);

  for (const key of AUTH_QUERY_KEYS) {
    url.searchParams.delete(key);
  }

  if (url.hash) {
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''));
    let changed = false;
    for (const key of AUTH_QUERY_KEYS) {
      if (hashParams.has(key)) {
        hashParams.delete(key);
        changed = true;
      }
    }
    if (changed) {
      const remaining = hashParams.toString();
      url.hash = remaining ? `#${remaining}` : '';
    }
  }

  const cleaned = url.pathname + url.search + url.hash;
  window.history.replaceState(null, '', cleaned || '/');
}

/** Called once on app boot to capture OAuth errors before auth state resolves */
export function getInitialAuthCallbackError(): string | null {
  const raw = parseAuthCallbackError();
  if (!raw) return null;
  return getAuthErrorMessage(raw);
}
