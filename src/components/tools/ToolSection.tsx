import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../../types';
import { LucideIcon } from '../LucideIcon';
import { ToolsGrid, buildCategoryNameMap } from './ToolsGrid';
import { ScrollReveal } from '../ui/ScrollReveal';

interface ToolSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  tools: AITool[];
  categories: Category[];
  onViewAll: () => void;
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage: (tool: AITool) => void;
  icon?: ReactNode;
  delay?: number;
}

export function ToolSection({
  id,
  eyebrow,
  title,
  description,
  tools,
  categories,
  onViewAll,
  bookmarkedIds,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
  delay = 0,
}: ToolSectionProps) {
  const categoryNames = buildCategoryNameMap(categories);

  if (tools.length === 0) return null;

  return (
    <ScrollReveal delay={delay} className="relative">
      <section id={id} className="relative max-w-6xl mx-auto px-4 sm:px-6 section-surface rounded-3xl py-2 md:py-4">
        <div className="section-fade-top pointer-events-none absolute -top-12 left-0 right-0 h-12" aria-hidden />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div className="space-y-2 text-left">
            <p className="type-eyebrow">{eyebrow}</p>
            <h2 className="type-h2">{title}</h2>
            <p className="type-body-muted max-w-xl">{description}</p>
          </div>
          <motion.button
            type="button"
            onClick={onViewAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="btn-ghost-glass inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-full shrink-0 self-start sm:self-auto"
            aria-label={`View all ${title}`}
          >
            View all
            <LucideIcon name="ChevronRight" className="w-4 h-4 text-sky-600" />
          </motion.button>
        </div>

        <ToolsGrid
          tools={tools}
          loading={false}
          error={null}
          bookmarkedIds={bookmarkedIds}
          categoryNames={categoryNames}
          onBookmarkToggle={onBookmarkToggle}
          onVote={onVote}
          onOpenDetails={onOpenDetails}
          onOpenToolPage={onOpenToolPage}
          compact
        />

      </section>
    </ScrollReveal>
  );
}
