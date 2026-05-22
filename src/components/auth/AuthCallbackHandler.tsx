import { useEffect, useRef } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import {
  cleanAuthCallbackFromUrl,
  consumeOAuthRedirect,
  hasAuthCallbackInUrl,
  parseAuthCallbackError,
} from '../../lib/authCallback';
import { navigate } from '../../lib/router';

/**
 * Handles OAuth return: surfaces URL errors, redirects after sign-in, strips auth params from the URL.
 */
export function AuthCallbackHandler() {
  const { isAuthenticated, loading, initialized, clearError } = useAuthContext();
  const handledRef = useRef(false);

  useEffect(() => {
    const urlError = parseAuthCallbackError();
    if (urlError) {
      clearError();
      // Error is set via useAuth on mount; re-parse for display in context
      handledRef.current = false;
      cleanAuthCallbackFromUrl();
    }
  }, [clearError]);

  useEffect(() => {
    if (!initialized || loading || handledRef.current) return;

    const urlError = parseAuthCallbackError();
    if (urlError && !isAuthenticated) {
      handledRef.current = true;
      cleanAuthCallbackFromUrl();
      return;
    }

    if (!isAuthenticated) return;

    const hadCallback = hasAuthCallbackInUrl();
    const hadStoredRedirect = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('zorlai_oauth_redirect');

    if (!hadCallback && !hadStoredRedirect) return;

    handledRef.current = true;
    const destination = consumeOAuthRedirect();
    cleanAuthCallbackFromUrl();

    const current = window.location.pathname + window.location.search;
    if (current !== destination) {
      navigate(destination, true);
    }
  }, [isAuthenticated, loading, initialized]);

  return null;
}
