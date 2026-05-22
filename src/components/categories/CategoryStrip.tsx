import { motion } from 'motion/react';
import { Category } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getCategoryVisual } from '../../lib/categoryVisuals';
import { paths, navigate } from '../../lib/router';

interface CategoryStripProps {
  categories: Category[];
  loading?: boolean;
}

const CATEGORY_ORDER = [
  'image-generation',
  'video-generation',
  'ai-writing',
  'coding',
  'chatbots',
  'productivity',
  'voice-ai',
  'music-ai',
  'research-ai',
  'marketing-ai',
  'design-ai',
];

export function CategoryStrip({ categories, loading }: CategoryStripProps) {
  const sorted = [...categories].sort(
    (a, b) =>
      (CATEGORY_ORDER.indexOf(a.id) === -1 ? 99 : CATEGORY_ORDER.indexOf(a.id)) -
      (CATEGORY_ORDER.indexOf(b.id) === -1 ? 99 : CATEGORY_ORDER.indexOf(b.id))
  );

  return (
    <section
      id="categories"
      aria-label="Browse categories"
      className="relative z-10 px-3 sm:px-4 md:px-6 mb-8 md:mb-14"
    >
      {/* Mobile + tablet: compact dark strip with horizontal scroll */}
      <div className="relative section-dark-accent max-w-6xl mx-auto rounded-2xl px-3 py-3.5 sm:px-5 sm:py-5 overflow-hidden md:hidden">
        <div className="absolute inset-0 dark-mesh-overlay pointer-events-none rounded-2xl" aria-hidden />
        <CategoryHeader onViewAll={() => navigate(paths.categories())} compact />
        {loading ? (
          <CategorySkeleton horizontal />
        ) : (
          <div className="mobile-scroll-tabs flex gap-2.5 overflow-x-auto pb-0.5 snap-x snap-mandatory">
            {sorted.map((cat, i) => (
              <CategoryPill key={cat.id} category={cat} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: prominent category showcase */}
      <div className="hidden md:block max-w-6xl mx-auto">
        <div className="relative rounded-3xl section-dark-accent p-6 lg:p-8 overflow-hidden">
          <div className="absolute inset-0 dark-mesh-overlay pointer-events-none rounded-3xl" aria-hidden />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-sky-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-indigo-900/20 blur-[60px] pointer-events-none" />

          <div className="relative">
            <CategoryHeader onViewAll={() => navigate(paths.categories())} />

            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="category-desktop-card h-[140px] animate-pulse bg-white/5 rounded-2xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
                {sorted.map((cat, i) => (
                  <CategoryDesktopCard key={cat.id} category={cat} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryHeader({ onViewAll, compact }: { onViewAll: () => void; compact?: boolean }) {
  return (
    <div className={`relative flex items-center justify-between gap-3 ${compact ? 'mb-3' : 'mb-0'}`}>
      <div className="min-w-0">
        <p className="type-eyebrow !text-sky-400">Categories</p>
        <h2
          className={`font-semibold text-white tracking-tight ${
            compact ? 'text-base sm:text-lg' : 'type-h2 !text-white mt-1'
          }`}
        >
          Browse by type
        </h2>
        {!compact && (
          <p className="text-sm text-slate-400 mt-1.5 max-w-lg">
            Jump into image, video, writing, coding, and more — each with curated official links.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onViewAll}
        className="shrink-0 text-xs font-medium text-sky-300 hover:text-white transition-colors px-3 py-2 rounded-xl glass-on-dark touch-manipulation hover:scale-[1.02]"
      >
        View all →
      </button>
    </div>
  );
}

function CategorySkeleton({ horizontal }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="flex gap-2.5 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="category-pill-card h-[72px] rounded-xl bg-white/5 animate-pulse shrink-0" />
        ))}
      </div>
    );
  }
  return null;
}

function CategoryPill({ category, index }: { category: Category; index: number }) {
  const visual = getCategoryVisual(category.id);
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(paths.category(category.id))}
      className={`category-pill-card snap-start shrink-0 flex flex-col items-start justify-between p-3 rounded-xl glass-on-dark transition-all touch-manipulation text-left bg-gradient-to-br ${visual.gradient}`}
    >
      <div className="flex items-center gap-2 w-full">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
          <LucideIcon name={category.icon} className={`w-4 h-4 ${visual.accent}`} />
        </span>
        <span className="text-[13px] font-semibold text-white leading-tight line-clamp-2 flex-1">
          {category.name}
        </span>
      </div>
      <span className="text-[10px] text-slate-400 mt-2 font-medium">{category.count} tools</span>
    </motion.button>
  );
}

function CategoryDesktopCard({ category, index }: { category: Category; index: number }) {
  const visual = getCategoryVisual(category.id);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(paths.category(category.id))}
      className="category-desktop-card group relative text-left overflow-hidden rounded-2xl min-h-[140px] touch-manipulation"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 transition-opacity duration-500 scale-105 group-hover:scale-110"
        style={{ backgroundImage: `url(${visual.image})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent" />

      <div className="relative z-10 p-4 flex flex-col h-full min-h-[140px] justify-between">
        <div className="flex items-start justify-between gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm group-hover:bg-white/15 transition-colors">
            <LucideIcon name={category.icon} className={`w-5 h-5 ${visual.accent}`} />
          </span>
          <LucideIcon
            name="ChevronRight"
            className="w-4 h-4 text-slate-500 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all"
          />
        </div>
        <div>
          <span className="text-[15px] font-semibold text-white block leading-snug group-hover:text-sky-100 transition-colors">
            {category.name}
          </span>
          <span className="text-xs text-slate-400 mt-1 block">{category.count} tools</span>
        </div>
      </div>
    </motion.button>
  );
}
