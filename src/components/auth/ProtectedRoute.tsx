import { useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../context/AuthContext';
import { loginPath, navigate } from '../../lib/router';
import { LucideIcon } from '../LucideIcon';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ children, redirectTo = loginPath() }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
      navigate(`${redirectTo}?redirect=${returnUrl}`, true);
    }
  }, [loading, isAuthenticated, redirectTo]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 pt-40">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-2xl animate-pulse-glow" />
          <div className="relative w-14 h-14 rounded-2xl glass-panel-strong flex items-center justify-center">
            <LucideIcon name="Sparkles" className="w-6 h-6 text-violet-300 animate-spin-slow" />
          </div>
        </div>
        <p className="text-sm text-slate-400">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
