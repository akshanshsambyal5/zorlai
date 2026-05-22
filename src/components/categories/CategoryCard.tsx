import { motion } from 'motion/react';
import { Category } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { getCategoryVisual } from '../../lib/categoryVisuals';
import { categoryPath } from '../../lib/router';

interface CategoryCardProps {
  category: Category;
  toolCount: number;
  trendingCount?: number;
  onNavigate: (path: string) => void;
  delay?: number;
}

export function CategoryCard({
  category,
  toolCount,
  trendingCount = 0,
  onNavigate,
  delay = 0,
}: CategoryCardProps) {
  const visual = getCategoryVisual(category.id);

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onNavigate(categoryPath(category.id))}
      className="group relative w-full text-left overflow-hidden rounded-2xl glass-card-premium min-h-[200px] sm:min-h-[220px] cursor-pointer"
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-45 transition-opacity duration-500 scale-105 group-hover:scale-110"
        style={{ backgroundImage: `url(${visual.image})` }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${visual.gradient}`} />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 80px ${visual.glow}` }}
      />

      <div className="relative z-10 p-6 flex flex-col justify-between h-full min-h-[200px] sm:min-h-[220px]">
        <div className="flex justify-between items-start gap-3">
          <div className="p-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/15 group-hover:border-white/25 transition-colors">
            <LucideIcon name={category.icon} className={`w-6 h-6 ${visual.accent}`} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-medium text-white/90 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
              {toolCount} tools
            </span>
            {trendingCount > 0 && (
              <span className="text-[10px] font-medium text-orange-300 bg-orange-500/15 px-2 py-0.5 rounded-full border border-orange-500/30 flex items-center gap-1">
                <LucideIcon name="Flame" className="w-3 h-3" />
                {trendingCount} trending
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 mt-auto pt-6">
          <h3 className="font-display text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-all">
            {category.name}
          </h3>
          <p className="text-sm text-slate-300/90 line-clamp-2 leading-relaxed">{category.description}</p>
          <span className="inline-flex items-center gap-1.5 text-xs text-cyan-300/90 font-medium pt-1 group-hover:gap-2 transition-all">
            Explore category
            <LucideIcon name="ChevronRight" className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.button>
  );
}
