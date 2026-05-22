import React, { createContext, useContext } from 'react';
import { useAuth, UserProfile } from '../hooks/useAuth';
import type { Session, User } from '@supabase/supabase-js';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  initialized: boolean;
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

/** No memoization — auth state must propagate to navbar instantly after OAuth */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
