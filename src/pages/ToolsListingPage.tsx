import { useMemo, useState, type MouseEvent } from 'react';
import { AITool, Category } from '../types';
import { PageShell } from '../components/layout/PageShell';
import { ToolsGrid, buildCategoryNameMap } from '../components/tools/ToolsGrid';
import { filterTools, ToolsListMode } from '../lib/toolFilters';
import { usePageMeta } from '../hooks/usePageMeta';

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

  const filtered = useMemo(
    () =>
      filterTools(tools, mode, {
        search: mode === 'search' ? searchQuery : undefined,
        pricing: selectedPricing,
      }),
    [tools, mode, searchQuery, selectedPricing]
  );

  const categoryNames = buildCategoryNameMap(categories);

  usePageMeta({
    title: `${title} — ZorlAI`,
    description: subtitle,
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${canonicalPath}`,
  });

  return (
    <PageShell title={title} subtitle={subtitle} badge={badge}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="glass-panel rounded-2xl p-3 flex flex-wrap gap-2 justify-center">
          {['All', 'Free', 'Freemium', 'Paid'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedPricing(opt)}
              className={`px-4 py-2 text-xs font-medium rounded-xl transition ${
                selectedPricing === opt
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-sky-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-3">
          Showing <span className="font-semibold text-slate-800">{filtered.length}</span> tools
        </p>
      </div>

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
