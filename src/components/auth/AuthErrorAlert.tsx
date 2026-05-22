import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from '../LucideIcon';

interface AuthErrorAlertProps {
  message: string | null;
}

export function AuthErrorAlert({ message }: AuthErrorAlertProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="overflow-hidden"
        >
          <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex gap-2.5 items-start">
            <LucideIcon name="AlertCircle" className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="text-xs text-rose-200 leading-relaxed">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
