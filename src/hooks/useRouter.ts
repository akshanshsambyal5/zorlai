import { useCallback, useEffect, useState } from 'react';
import { AppRoute, parseRoute, navigate as nav } from '../lib/router';

function readRoute(): AppRoute {
  return parseRoute(window.location.pathname, window.location.search);
}

export function useRouter() {
  const [route, setRoute] = useState<AppRoute>(readRoute);

  useEffect(() => {
    const sync = () => setRoute(readRoute());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  const navigate = useCallback((path: string, replace = false) => {
    nav(path, replace);
    const url = new URL(path, window.location.origin);
    setRoute(parseRoute(url.pathname, url.search));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { route, navigate, setRoute };
}
