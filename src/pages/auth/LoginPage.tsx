import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { OAuthButtons } from '../../components/auth/OAuthButtons';
import { AuthErrorAlert } from '../../components/auth/AuthErrorAlert';
import { LucideIcon } from '../../components/LucideIcon';
import { isValidEmail } from '../../lib/authErrors';
import { dashboardPath, forgotPasswordPath, navigate, signupPath } from '../../lib/router';
import { usePageMeta } from '../../hooks/usePageMeta';

function getRedirectAfterLogin(): string {
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect && redirect.startsWith('/') && !redirect.startsWith('//')) {
    return redirect;
  }
  return dashboardPath();
}

export function LoginPage() {
  const { signIn, isAuthenticated, error, clearError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  usePageMeta({
    title: 'Sign In — ZorlAI',
    description: 'Sign in to ZorlAI to save bookmarks, vote on tools, and manage your AI directory.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/login`,
  });

  useEffect(() => {
    if (isAuthenticated) navigate(getRedirectAfterLogin(), true);
  }, [isAuthenticated]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!isValidEmail(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      await signIn(email.trim(), password);
      navigate(getRedirectAfterLogin(), true);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Access bookmarks, votes, and your dashboard"
      footer={
        <p className="text-slate-500">
          New here?{' '}
          <button type="button" onClick={() => navigate(signupPath())} className="text-violet-400 hover:text-violet-300 font-medium">
            Create account
          </button>
        </p>
      }
    >
      <OAuthButtons disabled={loading} />
      <AuthErrorAlert message={displayError} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Email</label>
          <div className="relative">
            <LucideIcon name="Mail" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full input-glass rounded-xl pl-11 pr-3.5 py-3 text-sm text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Password</label>
            <button
              type="button"
              onClick={() => navigate(forgotPasswordPath())}
              className="text-[10px] text-cyan-400/80 hover:text-cyan-300"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <LucideIcon name="Lock" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              required
              autoComplete="current-password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full input-glass rounded-xl pl-11 pr-3.5 py-3 text-sm text-slate-200"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.99 }}
          className="w-full btn-primary text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
