import {
  useRef,
  useState,
  type ReactNode,
  type MouseEventHandler,
  type MouseEvent,
} from 'react';
import { motion } from 'motion/react';

export interface MagneticButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'cyan';
  className?: string;
  strength?: number;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  title?: string;
}

export function MagneticButton({
  children,
  variant = 'ghost',
  className = '',
  strength = 0.35,
  type = 'button',
  onClick,
  disabled,
  title,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const variantClass =
    variant === 'primary'
      ? 'btn-primary text-white font-medium'
      : variant === 'cyan'
        ? 'bg-gradient-to-r from-sky-100 to-blue-100 border-sky-300/50 text-sky-800 hover:from-sky-200 hover:to-blue-100'
        : 'btn-ghost-glass text-slate-600 hover:text-slate-900';

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setOffset({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm transition-colors cursor-pointer ${variantClass} ${className}`}
    >
      {children}
    </motion.button>
  );
}
