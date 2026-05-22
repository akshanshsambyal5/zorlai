import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { useAuthContext } from '../context/AuthContext';
import { OAuthButtons } from './auth/OAuthButtons';
import { AuthErrorAlert } from './auth/AuthErrorAlert';
import { isValidEmail } from '../lib/authErrors';
import { getSafeRedirectFromUrl } from '../lib/authCallback';
import { dashboardPath, forgotPasswordPath, loginPath, navigate, signupPath } from '../lib/router';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const { signIn, signUp, isAuthenticated, initialized, error, clearError } = useAuthContext();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && initialized && isAuthenticated) {
      onClose();
    }
  }, [isOpen, initialized, isAuthenticated, onClose]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    clearError();

    if (!isValidEmail(email)) {
      setLocalError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signin') {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password, displayName.trim());
      }
      onClose();
      setEmail('');
      setPassword('');
      setDisplayName('');
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            className="relative w-full max-w-md rounded-3xl glass-panel-strong p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  {mode === 'signin' ? 'Welcome back' : 'Create account'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">Save tools, vote, and access your dashboard</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 bg-white/80 border border-slate-200 text-slate-500 hover:text-slate-900 rounded-xl transition"
              >
                <LucideIcon name="Close" className="w-4 h-4" />
              </button>
            </div>

            <OAuthButtons
              disabled={loading}
              redirectAfter={getSafeRedirectFromUrl() ?? dashboardPath()}
            />
            <AuthErrorAlert message={displayError} />

            <div className="flex gap-2 mb-4">
              {(['signin', 'signup'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setLocalError(null);
                    clearError();
                  }}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-mono uppercase tracking-widest border transition ${
                    mode === m
                      ? 'bg-sky-500/15 border-sky-400/40 text-sky-800'
                      : 'bg-white/60 border-slate-200 text-slate-500'
                  }`}
                >
                  {m === 'signin' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Optional"
                    className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-900"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-900"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-900"
                />
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      navigate(forgotPasswordPath());
                    }}
                    className="text-[10px] text-sky-600 hover:text-sky-700"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-white text-sm font-medium py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>{mode === 'signin' ? 'Signing in...' : 'Creating...'}</span>
                  </>
                ) : (
                  <span>{mode === 'signin' ? 'Sign in' : 'Create account'}</span>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-500 mt-4">
              Prefer full page?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(mode === 'signin' ? loginPath() : signupPath());
                }}
                className="text-sky-600 hover:text-sky-700"
              >
                Open {mode === 'signin' ? 'login' : 'signup'} page
              </button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
