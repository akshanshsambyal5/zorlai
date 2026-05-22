import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { MagneticButton } from './ui/MagneticButton';
import { UserMenu } from './auth/UserMenu';
import { useAuthContext } from '../context/AuthContext';
import { paths, loginPath } from '../lib/router';

interface NavbarProps {
  activeTab: string;
  onOpenAIScout: () => void;
  onOpenDashboard: () => void;
  onOpenAuth: () => void;
  onNavigate: (path: string) => void;
}

export function Navbar({
  activeTab,
  onOpenAIScout,
  onOpenDashboard,
  onOpenAuth,
  onNavigate,
}: NavbarProps) {
  const { isAuthenticated, loading: authLoading, signOut } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24));

  const navItems = [
    { id: 'home', label: 'Home', path: paths.home() },
    { id: 'categories', label: 'Categories', path: paths.categories() },
    { id: 'trending', label: 'Trending', path: paths.trending() },
    { id: 'new', label: 'New', path: paths.newTools() },
    { id: 'popular', label: 'Popular', path: paths.popular() },
    { id: 'explore', label: 'Explore', path: paths.explore() },
    { id: 'submit', label: 'Submit', path: paths.submit() },
    { id: 'about', label: 'About', path: paths.about() },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setIsOpen(false);
  };

  const handleDashboard = () => {
    setIsOpen(false);
    if (isAuthenticated) onOpenDashboard();
    else onNavigate(`${loginPath()}?redirect=${encodeURIComponent(paths.dashboard())}`);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-3 sm:px-4 md:px-6 py-3 sm:py-4 safe-top"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          animate={{
            boxShadow: scrolled
              ? '0 8px 32px -8px rgba(14, 165, 233, 0.12), 0 0 40px -16px rgba(56, 189, 248, 0.1)'
              : '0 4px 20px -8px rgba(0, 0, 0, 0.04)',
          }}
          className={`relative rounded-2xl px-4 md:px-5 py-2.5 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'glass-panel-strong' : 'glass-panel'
          }`}
        >
          <div className="absolute top-0 left-8 right-8 neon-line opacity-80" />

          <button type="button" onClick={() => handleNav(paths.home())} className="flex items-center gap-2.5 group cursor-pointer shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-400 p-[1px] glow-blue">
              <div className="w-full h-full rounded-[11px] bg-white flex items-center justify-center">
                <span className="font-display font-bold text-sm text-slate-900">Z</span>
              </div>
            </div>
            <span className="font-display font-semibold text-[15px] tracking-tight text-slate-900 hidden sm:block">
              Zorl<span className="text-sky-600">AI</span>
            </span>
          </button>

          <div className="hidden xl:flex items-center gap-0.5 overflow-x-auto max-w-[50vw]">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.path)}
                  className="relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors whitespace-nowrap"
                >
                  <span className={`relative z-10 ${isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-sky-100/80 rounded-lg border border-sky-200/60"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <MagneticButton variant="cyan" strength={0.25} onClick={onOpenAIScout} className="!text-xs !py-2">
              <LucideIcon name="Sparkles" className="w-3.5 h-3.5" />
              <span className="hidden md:inline">AI Scout</span>
            </MagneticButton>
            {isAuthenticated && (
              <MagneticButton variant="ghost" strength={0.25} onClick={handleDashboard} className="!p-2.5" title="Dashboard">
                <LucideIcon name="LayoutDashboard" className="w-4 h-4" />
              </MagneticButton>
            )}
            <UserMenu onOpenDashboard={handleDashboard} />
            {!authLoading && !isAuthenticated && (
              <MagneticButton variant="primary" strength={0.25} onClick={onOpenAuth} className="!text-xs !py-2 lg:hidden">
                Sign in
              </MagneticButton>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden shrink-0">
            {!authLoading && isAuthenticated && <UserMenu onOpenDashboard={handleDashboard} />}
            <MagneticButton variant="cyan" strength={0.2} onClick={onOpenAIScout} className="!p-2">
              <LucideIcon name="Sparkles" className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" strength={0.2} onClick={() => setIsOpen(!isOpen)} className="!p-2.5">
              <LucideIcon name={isOpen ? 'Close' : 'Menu'} className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              className="mt-2 p-3 rounded-2xl glass-panel-strong flex flex-col gap-1 max-h-[70vh] overflow-y-auto custom-scrollbar"
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.path)}
                  className={`min-h-[44px] px-4 py-3 rounded-xl text-sm font-medium text-left touch-manipulation ${
                    activeTab === item.id ? 'bg-sky-100 text-slate-900' : 'text-slate-600 hover:bg-sky-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav(paths.contact())}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-left ${
                  activeTab === 'contact' ? 'bg-sky-100 text-slate-900' : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleNav(paths.blog())}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-left ${
                  activeTab === 'blog' ? 'bg-sky-100 text-slate-900' : 'text-slate-600 hover:bg-sky-50'
                }`}
              >
                Blog
              </button>
              <div className="pt-2 mt-1 border-t border-sky-100 flex flex-col gap-2">
                <MagneticButton variant="cyan" onClick={() => { onOpenAIScout(); setIsOpen(false); }} className="w-full">
                  AI Scout
                </MagneticButton>
                {authLoading ? (
                  <div className="h-10 rounded-xl bg-sky-100 animate-pulse" />
                ) : isAuthenticated ? (
                  <>
                    <MagneticButton variant="ghost" onClick={handleDashboard} className="w-full">
                      Dashboard
                    </MagneticButton>
                    <MagneticButton variant="ghost" onClick={() => { handleNav(paths.saved()); setIsOpen(false); }} className="w-full">
                      Saved tools
                    </MagneticButton>
                    <MagneticButton variant="ghost" onClick={() => { handleNav(paths.profile()); setIsOpen(false); }} className="w-full">
                      Profile
                    </MagneticButton>
                    <MagneticButton
                      variant="ghost"
                      onClick={async () => {
                        await signOut();
                        setIsOpen(false);
                        onNavigate(paths.home());
                      }}
                      className="w-full text-rose-600"
                    >
                      Sign out
                    </MagneticButton>
                  </>
                ) : (
                  <MagneticButton variant="primary" onClick={() => { onOpenAuth(); setIsOpen(false); }} className="w-full">
                    Sign in
                  </MagneticButton>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
