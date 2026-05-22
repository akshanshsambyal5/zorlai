import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../../types';
import { GlassCard } from '../GlassCard';
import { LucideIcon } from '../LucideIcon';
import { ensureArray } from '../../lib/safeArray';

interface ToolsGridProps {
  tools: AITool[];
  loading: boolean;
  error: string | null;
  bookmarkedIds: string[];
  categoryNames?: Record<string, string>;
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage?: (tool: AITool) => void;
  /** Home sections: horizontal snap row on small screens */
  compact?: boolean;
}

const motionEase = [0.22, 1, 0.36, 1] as const;

export function ToolsGrid({
  tools,
  loading,
  error,
  bookmarkedIds,
  categoryNames = {},
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
  compact = false,
}: ToolsGridProps) {
  const safeTools = ensureArray(tools);

  if (loading) {
    return (
      <div
        className={
          compact
            ? 'flex gap-4 overflow-hidden px-4 sm:px-0'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4'
        }
      >
        {Array.from({ length: compact ? 4 : 6 }).map((_, i) => (
          <div
            key={i}
            className={`glass-panel rounded-2xl min-h-[300px] animate-pulse border border-sky-100/80 shrink-0 ${
              compact ? 'w-[min(85vw,320px)]' : ''
            }`}
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto space-y-2 mx-4">
        <LucideIcon name="AlertCircle" className="w-8 h-8 text-rose-500 mx-auto" />
        <p className="type-body text-rose-600">{error}</p>
        <p className="type-caption">Ensure Supabase is seeded with categories and tools.</p>
      </div>
    );
  }

  if (safeTools.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto mx-4">
        <LucideIcon name="Compass" className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="type-body-muted">No tools found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  const gridClass = compact
    ? 'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory custom-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0';

  const itemClass = compact ? 'snap-center shrink-0 w-[min(88vw,340px)] sm:w-auto sm:shrink' : '';

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={gridClass}
    >
      {safeTools.map((tool, i) => (
        <motion.div
          key={tool.id}
          className={itemClass}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: Math.min(i * 0.05, 0.35), duration: 0.65, ease: motionEase }}
        >
          <GlassCard
            tool={tool}
            categoryLabel={categoryNames[tool.category]}
            isBookmarked={bookmarkedIds.includes(tool.id)}
            onBookmarkToggle={onBookmarkToggle}
            onVote={onVote}
            onOpenDetails={onOpenDetails}
            onOpenToolPage={onOpenToolPage}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function buildCategoryNameMap(categories: Category[]): Record<string, string> {
  return Object.fromEntries(categories.map((c) => [c.id, c.name]));
}
