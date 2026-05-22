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
      className="relative z-10 px-3 sm:px-4 md:px-6 -mt-1 mb-6 md:mb-10"
    >
      <div className="section-dark-accent max-w-6xl mx-auto rounded-2xl md:rounded-3xl px-3 py-3.5 sm:px-5 sm:py-5 overflow-hidden">
        <div className="absolute inset-0 dark-mesh-overlay pointer-events-none rounded-2xl md:rounded-3xl" aria-hidden />

        <div className="relative flex items-center justify-between gap-3 mb-3">
          <div className="min-w-0">
            <p className="type-eyebrow !text-sky-400 text-[10px] sm:text-[11px]">Categories</p>
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
              Browse by type
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate(paths.categories())}
            className="shrink-0 text-[11px] sm:text-xs font-medium text-sky-300 hover:text-white transition-colors px-2.5 py-1.5 rounded-lg glass-on-dark touch-manipulation"
          >
            All →
          </button>
        </div>

        {loading ? (
          <div className="flex gap-2.5 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="category-pill-card h-[72px] rounded-xl bg-white/5 animate-pulse shrink-0"
              />
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <p className="text-xs text-slate-400 py-2">Categories loading…</p>
        ) : (
          <div className="mobile-scroll-tabs flex gap-2.5 overflow-x-auto pb-0.5 snap-x snap-mandatory -mx-0.5 px-0.5">
            {sorted.map((cat, i) => {
              const visual = getCategoryVisual(cat.id);
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(paths.category(cat.id))}
                  className={`category-pill-card snap-start shrink-0 flex flex-col items-start justify-between p-3 rounded-xl glass-on-dark hover:border-sky-400/30 transition-all touch-manipulation text-left bg-gradient-to-br ${visual.gradient}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/10">
                      <LucideIcon name={cat.icon} className={`w-4 h-4 ${visual.accent}`} />
                    </span>
                    <span className="text-[13px] font-semibold text-white leading-tight line-clamp-2 flex-1">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 font-medium">
                    {cat.count} tools
                  </span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
