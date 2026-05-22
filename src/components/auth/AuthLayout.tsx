import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from '../LucideIcon';
import { navigate } from '../../lib/router';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4 py-28 sm:py-32"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-[400px] h-[400px] bg-sky-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[5%] w-[350px] h-[350px] bg-blue-100/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors"
        >
          <LucideIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
          Back to ZorlAI
        </button>

        <div className="rounded-3xl glass-panel-strong p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 p-[1px] glow-blue">
              <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center">
                <span className="font-display font-bold text-sm text-slate-900">Z</span>
              </div>
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">{title}</h1>
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            </div>
          </div>

          {children}

          {footer && <div className="mt-6 pt-5 border-t border-sky-100 text-center text-sm text-slate-600">{footer}</div>}
        </div>
      </div>
    </motion.div>
  );
}
