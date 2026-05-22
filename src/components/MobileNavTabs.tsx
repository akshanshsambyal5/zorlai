import { motion } from 'motion/react';
import { paths } from '../lib/router';

interface MobileNavTabsProps {
  activeTab: string;
  onNavigate: (path: string) => void;
}

const DISCOVER_TABS = [
  { id: 'trending', label: 'Trending', path: paths.trending() },
  { id: 'new', label: 'New', path: paths.newTools() },
  { id: 'popular', label: 'Popular', path: paths.popular() },
  { id: 'explore', label: 'Explore', path: paths.explore() },
] as const;

/** Quick category navigation for mobile — hidden on xl+ where desktop nav is shown */
export function MobileNavTabs({ activeTab, onNavigate }: MobileNavTabsProps) {
  return (
    <nav
      aria-label="Discover tools"
      className="xl:hidden fixed top-[4.5rem] left-0 right-0 z-40 px-4 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="mobile-scroll-tabs flex gap-2 overflow-x-auto py-2 -mx-1 px-1 snap-x snap-mandatory">
          {DISCOVER_TABS.map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === 'explore' && activeTab === 'search');
            return (
              <motion.button
                key={tab.id}
                type="button"
                onClick={() => onNavigate(tab.path)}
                whileTap={{ scale: 0.97 }}
                className={`snap-start shrink-0 min-h-[40px] px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition touch-manipulation ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/25'
                    : 'glass-panel text-slate-600 hover:text-slate-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
