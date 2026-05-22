import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon } from '../LucideIcon';
import { useAuthContext } from '../../context/AuthContext';
import { paths, loginPath, navigate } from '../../lib/router';

interface UserMenuProps {
  onOpenDashboard?: () => void;
  onOpenAuth?: () => void;
  className?: string;
  /** Icon-only avatar on mobile navbar */
  compact?: boolean;
}

function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    return (parts[0][0] + (parts[1]?.[0] || '')).toUpperCase().slice(0, 2);
  }
  return email.slice(0, 2).toUpperCase();
}

export function UserMenu({ onOpenDashboard, onOpenAuth, className = '', compact = false }: UserMenuProps) {
  const { user, profile, loading, profileSyncing, isAuthenticated, signOut } = useAuthContext();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const display = useMemo(() => {
    const email = profile?.email || user?.email || '';
    const name =
      profile?.displayName ||
      user?.user_metadata?.full_name ||
      user?.user_metadata?.name ||
      (email.includes('@') ? email.split('@')[0] : 'Member');
    const avatar =
      profile?.avatarUrl ||
      user?.user_metadata?.avatar_url ||
      user?.user_metadata?.picture ||
      null;
    return { email, name: String(name), avatar };
  }, [profile, user]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (loading) {
    return (
      <div className={`h-10 w-10 rounded-xl bg-sky-100/80 animate-pulse border border-sky-200/60 ${className}`} aria-hidden />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <button
        type="button"
        onClick={() => (onOpenAuth ? onOpenAuth() : navigate(loginPath()))}
        className={`btn-primary text-white text-xs font-medium px-4 py-2 min-h-[40px] rounded-xl inline-flex items-center gap-2 touch-manipulation ${className}`}
      >
        <LucideIcon name="LogIn" className="w-3.5 h-3.5" />
        {!compact && <span>Sign in</span>}
      </button>
    );
  }

  const initials = getInitials(display.name, display.email);

  const handleDashboard = () => {
    setOpen(false);
    if (onOpenDashboard) onOpenDashboard();
    else navigate(paths.dashboard());
  };

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl glass-panel hover-glow transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
      >
        {display.avatar ? (
          <img
            src={display.avatar}
            alt=""
            className="w-8 h-8 rounded-lg object-cover ring-2 ring-sky-200/80"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
            {initials}
          </div>
        )}
        {!compact && (
          <span className="text-xs font-medium text-slate-800 max-w-[100px] truncate hidden md:block">
            {display.name}
          </span>
        )}
        {profileSyncing ? (
          <LucideIcon name="Sparkles" className="w-3 h-3 text-sky-500 animate-spin hidden md:block" />
        ) : (
          <LucideIcon name="ChevronDown" className={`w-3.5 h-3.5 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-60 rounded-2xl glass-panel-strong py-2 shadow-xl z-[60]"
            role="menu"
          >
            <div className="px-4 py-3 border-b border-sky-100">
              <p className="text-sm font-semibold text-slate-900 truncate">{display.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{display.email}</p>
              {profile?.isAdmin && (
                <span className="inline-block mt-1.5 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-100 text-sky-700 border border-sky-200">
                  Admin
                </span>
              )}
            </div>

            <button
              type="button"
              role="menuitem"
              onClick={handleDashboard}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-sky-50 transition-colors text-left"
            >
              <LucideIcon name="LayoutDashboard" className="w-4 h-4 text-sky-600" />
              Dashboard
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate(paths.saved());
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-sky-50 transition-colors text-left"
            >
              <LucideIcon name="Bookmark" className="w-4 h-4 text-sky-600" />
              Saved tools
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                navigate(paths.profile());
              }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:text-slate-900 hover:bg-sky-50 transition-colors text-left"
            >
              <LucideIcon name="User" className="w-4 h-4 text-sky-600" />
              Profile
            </button>

            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors text-left"
            >
              <LucideIcon name="LogOut" className="w-4 h-4" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
