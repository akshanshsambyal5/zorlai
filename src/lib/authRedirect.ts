export function getAuthRedirectUrl(path = '/'): string {
  const base = import.meta.env.VITE_APP_URL || window.location.origin;
  const normalized = base.replace(/\/$/, '');
  const route = path.startsWith('/') ? path : `/${path}`;
  return `${normalized}${route}`;
}
