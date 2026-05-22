import { useCallback, useEffect, useState } from 'react';
import type { Provider, Session, User } from '@supabase/supabase-js';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { getAuthErrorMessage } from '../lib/authErrors';
import { getAuthRedirectUrl } from '../lib/authRedirect';
import { ensureUserProfile } from '../lib/ensureProfile';
import { resetPasswordPath } from '../lib/router';

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

function buildProfileFromUser(authUser: User, row?: { email?: string; display_name?: string | null; is_admin?: boolean }): UserProfile {
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
  const [profileSyncing, setProfileSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncProfile = useCallback(async (authUser: User) => {
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

      setProfile(buildProfileFromUser(authUser, data as { email?: string; display_name?: string | null; is_admin?: boolean } | null));
    } catch {
      setProfile(buildProfileFromUser(authUser));
    } finally {
      setProfileSyncing(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = getSupabase();

    const timeout = window.setTimeout(() => setLoading(false), 4000);

    const { data: listener } = supabase.auth.onAuthStateChange((event, newSession) => {
      void (async () => {
        setSession(newSession);
        const authUser = newSession?.user ?? null;
        setUser(authUser);

        if (authUser) {
          setProfile(buildProfileFromUser(authUser));

          if (
            event === 'INITIAL_SESSION' ||
            event === 'SIGNED_IN' ||
            event === 'TOKEN_REFRESHED' ||
            event === 'USER_UPDATED'
          ) {
            await syncProfile(authUser);
          }
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }

        if (event === 'INITIAL_SESSION') {
          window.clearTimeout(timeout);
          setLoading(false);
        }

        if (event === 'PASSWORD_RECOVERY' && typeof window !== 'undefined') {
          const path = window.location.pathname;
          if (path !== resetPasswordPath()) {
            window.history.replaceState(null, '', resetPasswordPath());
            window.dispatchEvent(new PopStateEvent('popstate'));
          }
        }
      })();
    });

    return () => {
      window.clearTimeout(timeout);
      listener.subscription.unsubscribe();
    };
  }, [syncProfile]);

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
    if (data.user) await syncProfile(data.user);
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
    if (data.user) await syncProfile(data.user);
    return data;
  };

  const signInWithOAuth = async (provider: Provider) => {
    setError(null);
    const supabase = getSupabase();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getAuthRedirectUrl('/'),
        queryParams: provider === 'google' ? { access_type: 'offline', prompt: 'consent' } : undefined,
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
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  return {
    session,
    user,
    profile,
    loading,
    profileSyncing,
    error,
    isAuthenticated: Boolean(session?.user ?? user),
    isAdmin: profile?.isAdmin ?? false,
    signUp,
    signIn,
    signInWithOAuth,
    signInWithGoogle: () => signInWithOAuth('google'),
    signInWithFacebook: () => signInWithOAuth('facebook'),
    resetPassword,
    updatePassword,
    signOut,
    clearError: () => setError(null),
  };
}
