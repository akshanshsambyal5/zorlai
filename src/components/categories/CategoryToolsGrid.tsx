import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AITool } from '../../types';
import { GlassCard } from '../GlassCard';
import { buildCategoryNameMap } from '../tools/ToolsGrid';
import { Category } from '../../types';
import { LucideIcon } from '../LucideIcon';

interface CategoryToolsGridProps {
  tools: AITool[];
  loading: boolean;
  error: string | null;
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage?: (tool: AITool) => void;
  categories?: Category[];
}

export function CategoryToolsGrid({
  tools,
  loading,
  error,
  bookmarkedIds,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
  categories = [],
}: CategoryToolsGridProps) {
  const categoryNames = buildCategoryNameMap(categories);
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl min-h-[300px] animate-pulse"
            style={{ animationDelay: `${i * 0.08}s` }}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto space-y-2">
        <p className="text-sm text-rose-600">{error}</p>
        <p className="text-xs text-slate-500">Ensure Supabase is seeded with categories and tools.</p>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto">
        <LucideIcon name="Compass" className="w-8 h-8 text-slate-600 mx-auto mb-3" />
        <p className="text-sm text-slate-500">No tools match your filters in this category.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
    >
      {tools.map((tool, i) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: Math.min(i * 0.04, 0.4), duration: 0.45 }}
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
