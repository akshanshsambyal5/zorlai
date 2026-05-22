import { useMemo, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../types';
import { PageShell } from '../components/layout/PageShell';
import { ToolsGrid, buildCategoryNameMap } from '../components/tools/ToolsGrid';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { useToolSections } from '../hooks/useToolSections';
import { ToolsListMode } from '../lib/toolFilters';
import { usePageMeta } from '../hooks/usePageMeta';
import { LucideIcon } from '../components/LucideIcon';

interface ToolsListingPageProps {
  mode: ToolsListMode;
  title: string;
  subtitle: string;
  badge?: string;
  searchQuery?: string;
  tools: AITool[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage: (tool: AITool) => void;
  canonicalPath: string;
}

const MODE_HINTS: Record<ToolsListMode, string> = {
  trending: 'Ranked by engagement velocity — votes, saves, and editorial momentum.',
  new: 'Sorted by date added — newest tools first.',
  popular: 'Ranked by community saves, ratings, and repeat interest.',
  all: 'Complete directory — search and filter below.',
  search: 'Matching tools from your query.',
};

export function ToolsListingPage({
  mode,
  title,
  subtitle,
  badge,
  searchQuery = '',
  tools,
  categories,
  loading,
  error,
  bookmarkedIds,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
  canonicalPath,
}: ToolsListingPageProps) {
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [exploreSearch, setExploreSearch] = useState(mode === 'search' ? searchQuery : '');
  const { getFiltered } = useToolSections(tools);

  const filtered = useMemo(
    () =>
      getFiltered(mode, {
        search: mode === 'search' ? searchQuery : mode === 'all' ? exploreSearch : undefined,
        pricing: selectedPricing,
      }),
    [getFiltered, mode, searchQuery, exploreSearch, selectedPricing]
  );

  const categoryNames = buildCategoryNameMap(categories);

  usePageMeta({
    title: `${title} — ZorlAI`,
    description: subtitle,
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${canonicalPath}`,
  });

  return (
    <PageShell title={title} subtitle={subtitle} badge={badge}>
      <ScrollReveal className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
        <p className="type-body-muted text-center max-w-xl mx-auto">{MODE_HINTS[mode]}</p>
      </ScrollReveal>

      <ScrollReveal delay={0.06} className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 space-y-4">
        {mode === 'all' && (
          <div className="glass-panel-strong rounded-2xl p-2 flex items-center gap-2 max-w-xl mx-auto">
            <LucideIcon name="Search" className="w-4 h-4 text-slate-400 ml-3 shrink-0" />
            <input
              type="search"
              value={exploreSearch}
              onChange={(e) => setExploreSearch(e.target.value)}
              placeholder="Filter catalog by name, tag, or category..."
              className="flex-1 bg-transparent border-0 outline-none py-3 text-sm text-slate-800 placeholder:text-slate-400"
            />
          </div>
        )}

        <div className="glass-panel rounded-2xl p-3 flex flex-wrap gap-2 justify-center">
          {['All', 'Free', 'Freemium', 'Paid'].map((opt) => (
            <motion.button
              key={opt}
              type="button"
              onClick={() => setSelectedPricing(opt)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`px-4 py-2 text-xs font-medium rounded-full transition ${
                selectedPricing === opt
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-sky-50/80'
              }`}
            >
              {opt}
            </motion.button>
          ))}
        </div>
        <p className="text-center type-caption">
          Showing <span className="font-medium text-slate-700">{filtered.length}</span> tools
        </p>
      </ScrollReveal>

      <div className="section-divider max-w-6xl mx-auto mb-10" aria-hidden />

      <ToolsGrid
        tools={filtered}
        loading={loading}
        error={error}
        bookmarkedIds={bookmarkedIds}
        categoryNames={categoryNames}
        onBookmarkToggle={onBookmarkToggle}
        onVote={onVote}
        onOpenDetails={onOpenDetails}
        onOpenToolPage={onOpenToolPage}
      />
    </PageShell>
  );
}
