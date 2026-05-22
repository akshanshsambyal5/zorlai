import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../../types';
import { GlassCard } from '../GlassCard';
import { LucideIcon } from '../LucideIcon';

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
}

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
}: ToolsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="glass-panel rounded-2xl min-h-[320px] animate-pulse border border-sky-100"
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
        <p className="text-sm text-rose-600">{error}</p>
        <p className="text-xs text-slate-500">Ensure Supabase is seeded with categories and tools.</p>
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-16 glass-panel rounded-2xl max-w-xl mx-auto mx-4">
        <LucideIcon name="Compass" className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm text-slate-600">No tools found. Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 sm:px-0"
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

export function buildCategoryNameMap(categories: Category[]): Record<string, string> {
  return Object.fromEntries(categories.map((c) => [c.id, c.name]));
}
