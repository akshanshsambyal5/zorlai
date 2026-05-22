import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { useAuthContext } from '../../context/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthErrorAlert } from '../../components/auth/AuthErrorAlert';
import { LucideIcon } from '../../components/LucideIcon';
import { isValidEmail } from '../../lib/authErrors';
import { loginPath, navigate } from '../../lib/router';
import { usePageMeta } from '../../hooks/usePageMeta';

export function ForgotPasswordPage() {
  const { resetPassword, error, clearError } = useAuthContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  usePageMeta({
    title: 'Reset Password — ZorlAI',
    description: 'Reset your ZorlAI account password via secure email link.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/forgot-password`,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!isValidEmail(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email.trim());
      setSent(true);
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Could not send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Email sent" subtitle="Check your inbox for the reset link">
        <div className="text-center py-4 space-y-4">
          <LucideIcon name="Mail" className="w-10 h-10 text-cyan-400 mx-auto" />
          <p className="text-sm text-slate-600">
            If <span className="font-medium text-slate-900">{email}</span> is registered, you will receive a password reset link shortly.
          </p>
          <button type="button" onClick={() => navigate(loginPath())} className="btn-ghost-glass text-sm px-5 py-2.5 rounded-xl">
            Back to sign in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password"
      subtitle="We'll email you a secure reset link"
      footer={
        <button type="button" onClick={() => navigate(loginPath())} className="text-violet-400 hover:text-violet-300 font-medium">
          Back to sign in
        </button>
      }
    >
      <AuthErrorAlert message={localError || error} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Email</label>
          <div className="relative">
            <LucideIcon name="Mail" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full input-glass rounded-xl pl-11 pr-3.5 py-3 text-sm text-slate-200"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full btn-primary text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            'Send reset link'
          )}
        </motion.button>
      </form>
    </AuthLayout>
  );
}
