import React, { createContext, useContext, useMemo } from 'react';
import { useAuth, UserProfile } from '../hooks/useAuth';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  profileSyncing: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, displayName?: string) => Promise<unknown>;
  signIn: (email: string, password: string) => Promise<unknown>;
  signInWithGoogle: (redirectAfter?: string) => Promise<void>;
  signInWithFacebook: (redirectAfter?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  const value = useMemo<AuthContextValue>(
    () => auth,
    [
      auth.session?.access_token,
      auth.user?.id,
      auth.profile?.id,
      auth.profile?.displayName,
      auth.profile?.avatarUrl,
      auth.profile?.isAdmin,
      auth.loading,
      auth.profileSyncing,
      auth.error,
      auth.isAuthenticated,
      auth.isAdmin,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
