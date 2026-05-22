import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface PageShellProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children: ReactNode;
  className?: string;
}

export function PageShell({ title, subtitle, badge, children, className = '' }: PageShellProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`pt-28 pb-16 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10">
        {badge && (
          <span className="inline-block mb-3 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-200">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
          {title}
        </h1>
        {subtitle && <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}
