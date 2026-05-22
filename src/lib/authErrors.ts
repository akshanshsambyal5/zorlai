import type { AuthError } from '@supabase/supabase-js';

const ERROR_MAP: Record<string, string> = {
  invalid_credentials: 'Incorrect email or password. Please try again.',
  invalid_grant: 'Incorrect email or password. Please try again.',
  user_already_registered: 'An account with this email already exists. Sign in instead.',
  email_exists: 'An account with this email already exists. Sign in instead.',
  signup_disabled: 'Sign up is currently disabled. Contact support.',
  email_not_confirmed: 'Please confirm your email before signing in. Check your inbox.',
  weak_password: 'Password must be at least 6 characters.',
  validation_failed: 'Please check your email and password format.',
  over_email_send_rate_limit: 'Too many emails sent. Wait a few minutes and try again.',
  over_request_rate_limit: 'Too many attempts. Please wait and try again.',
  user_not_found: 'No account found with this email.',
  flow_state_expired: 'This link has expired. Request a new password reset.',
  identity_already_exists: 'This account is already linked to another sign-in method.',
  access_denied: 'Sign-in was cancelled. Please try again.',
  server_error: 'Authentication service error. Please try again in a moment.',
  redirect_uri_mismatch: 'OAuth redirect is misconfigured. Contact support if this persists.',
  invalid_request: 'Invalid sign-in request. Please try again.',
  unauthorized_client: 'Google sign-in is not authorized for this app. Check OAuth client settings.',
};

export function getAuthErrorMessage(err: unknown): string {
  if (!err) return 'Something went wrong. Please try again.';

  if (typeof err === 'string') return err;

  const authErr = err as AuthError & { code?: string; status?: number };
  const code = authErr.code || authErr.message?.toLowerCase().replace(/\s+/g, '_');

  if (code && ERROR_MAP[code]) return ERROR_MAP[code];

  const msg = authErr.message || '';
  const lower = msg.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid email or password')) {
    return ERROR_MAP.invalid_credentials;
  }
  if (lower.includes('user already registered') || lower.includes('already been registered')) {
    return ERROR_MAP.user_already_registered;
  }
  if (lower.includes('password should be at least')) {
    return ERROR_MAP.weak_password;
  }
  if (lower.includes('unable to validate email')) {
    return 'Please enter a valid email address.';
  }
  if (lower.includes('network') || lower.includes('fetch')) {
    return 'Network error. Check your connection and try again.';
  }
  if (lower.includes('email rate limit')) {
    return ERROR_MAP.over_email_send_rate_limit;
  }
  if (lower.includes('redirect') && (lower.includes('not allowed') || lower.includes('mismatch'))) {
    return 'Sign-in redirect URL is not allowed. Ensure https://zorlai.xyz and https://www.zorlai.xyz are added in Supabase → Authentication → URL Configuration.';
  }
  if (lower.includes('access_denied') || lower.includes('access denied')) {
    return ERROR_MAP.access_denied;
  }
  if (lower.includes('oauth') || lower.includes('provider')) {
    return msg || 'Sign-in with Google failed. Please try again or use email.';
  }

  return msg || 'Authentication failed. Please try again.';
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
