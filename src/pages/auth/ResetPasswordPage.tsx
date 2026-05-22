import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthErrorAlert } from '../../components/auth/AuthErrorAlert';
import { LucideIcon } from '../../components/LucideIcon';
import { loginPath, navigate } from '../../lib/router';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ResetPasswordPage() {
  const { updatePassword, error, clearError } = useAuthContext();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  usePageMeta({
    title: 'Set New Password — ZorlAI',
    description: 'Choose a new password for your ZorlAI account.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/reset-password`,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setLocalError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(password);
      setDone(true);
      setTimeout(() => navigate(loginPath(), true), 2000);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Could not update password');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title="Password updated" subtitle="Redirecting you to sign in...">
        <div className="text-center py-6">
          <LucideIcon name="Sparkle" className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <p className="text-sm text-slate-400">Your password has been changed successfully.</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="New password" subtitle="Enter your new credentials">
      <AuthErrorAlert message={localError || error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">New password</label>
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Confirm password</label>
          <input
            type="password"
            required
            minLength={6}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin" />
              Updating...
            </>
          ) : (
            'Update password'
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
