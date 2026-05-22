import type { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: ScrollRevealProps) {
  const y = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
