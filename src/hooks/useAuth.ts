import { useCallback, useEffect, useRef, useState } from 'react';
import type { Provider, Session, User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { getAuthErrorMessage } from '../lib/authErrors';
import { getAuthRedirectUrl } from '../lib/authRedirect';
import {
  cleanAuthCallbackFromUrl,
  getInitialAuthCallbackError,
  hasAuthCallbackInUrl,
  parseAuthCallbackError,
  storeOAuthRedirect,
} from '../lib/authCallback';
import { ensureUserProfile } from '../lib/ensureProfile';
import { dashboardPath, resetPasswordPath } from '../lib/router';

export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
}

function resolveAvatar(user: User | null): string | null {
  if (!user) return null;
  const meta = user.user_metadata || {};
  return (
    meta.avatar_url ||
    meta.picture ||
    meta.photo_url ||
    null
  ) as string | null;
}

function buildProfileFromUser(
  authUser: User,
  row?: { email?: string; display_name?: string | null; is_admin?: boolean }
): UserProfile {
  const email = row?.email || authUser.email || authUser.user_metadata?.email || '';
  const meta = authUser.user_metadata || {};
  const displayName =
    row?.display_name ??
    meta.full_name ??
    meta.name ??
    meta.display_name ??
    (email.includes('@') ? email.split('@')[0] : null);

  return {
    id: authUser.id,
    email,
    displayName: typeof displayName === 'string' ? displayName : null,
    avatarUrl: resolveAvatar(authUser),
    isAdmin: row?.is_admin ?? false,
  };
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [profileSyncing, setProfileSyncing] = useState(false);
  const [error, setError] = useState<string | null>(() => getInitialAuthCallbackError());
  const syncInFlightRef = useRef<string | null>(null);

  const applySession = useCallback((newSession: Session | null) => {
    setSession(newSession);
    const authUser = newSession?.user ?? null;
    setUser(authUser);
    setProfile(authUser ? buildProfileFromUser(authUser) : null);
  }, []);

  const syncProfile = useCallback(async (authUser: User) => {
    if (syncInFlightRef.current === authUser.id) return;
    syncInFlightRef.current = authUser.id;
    setProfileSyncing(true);
    try {
      await ensureUserProfile(authUser);

      const supabase = getSupabase();
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, is_admin, email')
        .eq('id', authUser.id)
        .maybeSingle();

      if (profileError) {
        setProfile(buildProfileFromUser(authUser));
        return;
      }

      setProfile(
        buildProfileFromUser(
          authUser,
          data as { email?: string; display_name?: string | null; is_admin?: boolean } | null
        )
      );
    } catch {
      setProfile(buildProfileFromUser(authUser));
    } finally {
      setProfileSyncing(false);
      syncInFlightRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      setInitialized(true);
      return;
    }

    const supabase = getSupabase();
    let mounted = true;
    let oauthPollId: ReturnType<typeof setInterval> | null = null;

    const markReady = () => {
      if (!mounted) return;
      setLoading(false);
      setInitialized(true);
    };

    const scheduleProfileSync = (authUser: User) => {
      queueMicrotask(() => {
        if (mounted) void syncProfile(authUser);
      });
    };

    const handleSession = (newSession: Session | null, event?: string) => {
      applySession(newSession);

      const authUser = newSession?.user ?? null;
      if (
        authUser &&
        (event === 'SIGNED_IN' ||
          event === 'INITIAL_SESSION' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED')
      ) {
        scheduleProfileSync(authUser);
      }

      if (event === 'SIGNED_OUT') {
        setProfile(null);
        syncInFlightRef.current = null;
      }

      if (newSession?.user) {
        markReady();
      } else if (!hasAuthCallbackInUrl()) {
        markReady();
      }
    };

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      handleSession(newSession, event);

      if (event === 'SIGNED_IN' && typeof window !== 'undefined') {
        const urlError = parseAuthCallbackError();
        if (urlError) {
          setError(getAuthErrorMessage(urlError));
          cleanAuthCallbackFromUrl();
        }
      }

      if (event === 'PASSWORD_RECOVERY' && typeof window !== 'undefined') {
        const path = window.location.pathname;
        if (path !== resetPasswordPath()) {
          window.history.replaceState(null, '', resetPasswordPath());
          window.dispatchEvent(new PopStateEvent('popstate'));
        }
      }
    });

    void supabase.auth.getSession().then(({ data: { session: initialSession }, error: sessionError }) => {
      if (!mounted) return;
      if (sessionError) {
        console.warn('[auth] getSession:', sessionError.message);
      }
      if (initialSession) {
        handleSession(initialSession, 'INITIAL_SESSION');
      } else if (!hasAuthCallbackInUrl()) {
        markReady();
      }
    });

    if (hasAuthCallbackInUrl()) {
      let attempts = 0;
      oauthPollId = window.setInterval(() => {
        attempts += 1;
        void supabase.auth.getSession().then(({ data: { session: polled } }) => {
          if (!mounted) return;
          if (polled?.user) {
            handleSession(polled, 'SIGNED_IN');
            cleanAuthCallbackFromUrl();
            if (oauthPollId) window.clearInterval(oauthPollId);
          } else if (attempts >= 40) {
            markReady();
            if (oauthPollId) window.clearInterval(oauthPollId);
          }
        });
      }, 150);
    }

    const timeout = window.setTimeout(() => {
      if (mounted) markReady();
    }, 8000);

    const onStorage = (e: StorageEvent) => {
      if (e.key?.includes('zorlai-auth') || e.key?.includes('supabase')) {
        void supabase.auth.getSession().then(({ data: { session: s } }) => {
          if (mounted && s) handleSession(s, 'TOKEN_REFRESHED');
        });
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      mounted = false;
      window.clearTimeout(timeout);
      if (oauthPollId) window.clearInterval(oauthPollId);
      window.removeEventListener('storage', onStorage);
      listener.subscription.unsubscribe();
    };
  }, [applySession, syncProfile]);

  const signUp = async (email: string, password: string, displayName?: string) => {
    setError(null);
    const supabase = getSupabase();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName?.trim() || undefined },
        emailRedirectTo: getAuthRedirectUrl('/'),
      },
    });
    if (signUpError) {
      const message = getAuthErrorMessage(signUpError);
      setError(message);
      throw new Error(message);
    }
    if (data.session) {
      applySession(data.session);
      if (data.session.user) await syncProfile(data.session.user);
    } else if (data.user) {
      await syncProfile(data.user);
    }
    return data;
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    const supabase = getSupabase();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      const message = getAuthErrorMessage(signInError);
      setError(message);
      throw new Error(message);
    }
    if (data.session) {
      applySession(data.session);
    }
    if (data.user) await syncProfile(data.user);
    return data;
  };

  const signInWithOAuth = async (provider: Provider, redirectAfter?: string) => {
    setError(null);
    storeOAuthRedirect(redirectAfter ?? dashboardPath());

    const supabase = getSupabase();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthRedirectUrl('/'),
        queryParams: provider === 'google' ? { access_type: 'offline', prompt: 'select_account' } : undefined,
      },
    });
    if (oauthError) {
      const message = getAuthErrorMessage(oauthError);
      setError(message);
      throw new Error(message);
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    const supabase = getSupabase();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getAuthRedirectUrl(resetPasswordPath()),
    });
    if (resetError) {
      const message = getAuthErrorMessage(resetError);
      setError(message);
      throw new Error(message);
    }
  };

  const updatePassword = async (newPassword: string) => {
    setError(null);
    const supabase = getSupabase();
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) {
      const message = getAuthErrorMessage(updateError);
      setError(message);
      throw new Error(message);
    }
  };

  const signOut = async () => {
    setError(null);
    const supabase = getSupabase();
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      const message = getAuthErrorMessage(signOutError);
      setError(message);
      throw new Error(message);
    }
    applySession(null);
    setProfile(null);
    syncInFlightRef.current = null;
  };

  const authUser = session?.user ?? user;
  const isAuthenticated = Boolean(authUser?.id);

  return {
    session,
    user: authUser,
    profile,
    loading,
    initialized,
    profileSyncing,
    error,
    isAuthenticated,
    isAdmin: profile?.isAdmin ?? false,
    signUp,
    signIn,
    signInWithOAuth,
    signInWithGoogle: (redirectAfter?: string) => signInWithOAuth('google', redirectAfter),
    signInWithFacebook: (redirectAfter?: string) => signInWithOAuth('facebook', redirectAfter),
    resetPassword,
    updatePassword,
    signOut,
    clearError: () => setError(null),
  };
}
