import { useState } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from '../LucideIcon';
import { useAuthContext } from '../../context/AuthContext';

interface OAuthButtonsProps {
  disabled?: boolean;
}

export function OAuthButtons({ disabled }: OAuthButtonsProps) {
  const { signInWithGoogle, signInWithFacebook, clearError } = useAuthContext();
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'facebook' | null>(null);

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setLoadingProvider(provider);
    clearError();
    try {
      if (provider === 'google') await signInWithGoogle();
      else await signInWithFacebook();
    } catch {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <motion.button
        type="button"
        disabled={disabled || loadingProvider !== null}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => handleOAuth('google')}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-white/20 text-sm font-medium text-white transition-all disabled:opacity-50"
      >
        {loadingProvider === 'google' ? (
          <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
        )}
        Continue with Google
      </motion.button>

      <motion.button
        type="button"
        disabled={disabled || loadingProvider !== null}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => handleOAuth('facebook')}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl glass-panel border border-white/10 hover:border-[#1877F2]/40 text-sm font-medium text-white transition-all disabled:opacity-50"
      >
        {loadingProvider === 'facebook' ? (
          <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" aria-hidden>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        )}
        Continue with Facebook
      </motion.button>

      <div className="relative flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">or email</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>
    </div>
  );
}
