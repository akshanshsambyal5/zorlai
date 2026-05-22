import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../ui/ScrollReveal';

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
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className={`pt-24 sm:pt-28 pb-16 sm:pb-20 ${className}`}
    >
      <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-12">
        {badge && (
          <span className="inline-block mb-4 type-eyebrow px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100/80">
            {badge}
          </span>
        )}
        <h1 className="type-h1 mb-4">{title}</h1>
        {subtitle && <p className="type-lead max-w-2xl mx-auto">{subtitle}</p>}
      </ScrollReveal>
      {children}
    </motion.div>
  );
}
