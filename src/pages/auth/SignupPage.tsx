import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { OAuthButtons } from '../../components/auth/OAuthButtons';
import { AuthErrorAlert } from '../../components/auth/AuthErrorAlert';
import { LucideIcon } from '../../components/LucideIcon';
import { isValidEmail } from '../../lib/authErrors';
import { dashboardPath, loginPath, navigate } from '../../lib/router';
import { usePageMeta } from '../../hooks/usePageMeta';

export function SignupPage() {
  const { signUp, isAuthenticated, error, clearError } = useAuthContext();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  usePageMeta({
    title: 'Create Account — ZorlAI',
    description: 'Join ZorlAI to bookmark AI tools, vote, and build your personal directory.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/signup`,
  });

  useEffect(() => {
    if (isAuthenticated && !success) navigate(dashboardPath(), true);
  }, [isAuthenticated, success]);

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
      const result = await signUp(email.trim(), password, displayName.trim());
      if (result?.session) {
        navigate(dashboardPath(), true);
      } else {
        setSuccess(true);
      }
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  if (success) {
    return (
      <AuthLayout title="Check your email" subtitle="We sent a confirmation link to activate your account">
        <div className="text-center py-4 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <LucideIcon name="Mail" className="w-7 h-7 text-emerald-400" />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Confirm <span className="font-medium text-slate-900">{email}</span> then sign in to unlock bookmarks and your dashboard.
          </p>
          <button type="button" onClick={() => navigate(loginPath())} className="btn-primary text-white text-sm px-6 py-3 rounded-xl">
            Go to sign in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join the ZorlAI directory — free forever"
      footer={
        <p className="text-slate-500">
          Already have an account?{' '}
          <button type="button" onClick={() => navigate(loginPath())} className="text-violet-400 hover:text-violet-300 font-medium">
            Sign in
          </button>
        </p>
      }
    >
      <OAuthButtons disabled={loading} redirectAfter={dashboardPath()} />
      <AuthErrorAlert message={displayError} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Display name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Optional"
            className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
          />
        </div>

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
              className="w-full input-glass rounded-xl pl-11 pr-3.5 py-3 text-sm text-slate-200"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Password</label>
          <div className="relative">
            <LucideIcon name="Lock" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full input-glass rounded-xl pl-11 pr-3.5 py-3 text-sm text-slate-200"
            />
          </div>
          <p className="text-[10px] text-slate-600">Minimum 6 characters</p>
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
              Creating account...
            </>
          ) : (
            'Create account'
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
