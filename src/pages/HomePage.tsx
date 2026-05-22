import { useState } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../types';
import { HeroSection } from '../components/HeroSection';
import { ToolsGrid, buildCategoryNameMap } from '../components/tools/ToolsGrid';
import { LucideIcon } from '../components/LucideIcon';
import type { MouseEvent, FormEvent } from 'react';
import { paths, navigate } from '../lib/router';
import { filterTools } from '../lib/toolFilters';

interface HomePageProps {
  tools: AITool[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage: (tool: AITool) => void;
  newsletterEmail: string;
  setNewsletterEmail: (v: string) => void;
  newsletterSubscribed: boolean;
  newsletterError: string | null;
  onNewsletterSubmit: (e: FormEvent) => void;
}

export function HomePage({
  tools,
  categories,
  loading,
  error,
  bookmarkedIds,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSubscribed,
  newsletterError,
  onNewsletterSubmit,
}: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('All');

  const filtered = filterTools(tools, 'all', {
    search: searchQuery || undefined,
    pricing: selectedPricing,
  });

  const categoryNames = buildCategoryNameMap(categories);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(paths.search(searchQuery.trim()));
    }
  };

  return (
    <div className="space-y-16">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPricing={selectedPricing}
        setSelectedPricing={setSelectedPricing}
        onQuickSearch={(tag) => navigate(paths.search(tag))}
        onSearchSubmit={handleSearchSubmit}
        filteredCount={filtered.length}
      />

      <section className="space-y-6 px-4 sm:px-0 max-w-6xl mx-auto">
        <div className="glass-panel rounded-2xl p-4 flex justify-between items-center">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-slate-900 font-semibold">{filtered.length}</span> tools found
          </span>
          <button
            type="button"
            onClick={() => navigate(paths.explore())}
            className="text-xs text-sky-600 hover:text-sky-800 font-medium"
          >
            Explore all →
          </button>
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
      </section>

      <div className="relative overflow-hidden rounded-3xl glass-panel-strong p-8 md:p-12 max-w-4xl mx-auto text-center mx-4 sm:mx-auto">
        {newsletterSubscribed ? (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 py-4">
            <LucideIcon name="Sparkle" className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="font-display text-xl font-bold text-slate-900">You&apos;re subscribed</h4>
            <p className="text-sm text-slate-600">Weekly AI tool picks in your inbox.</p>
          </motion.div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            <h3 className="font-display text-2xl font-bold text-slate-900">Stay in the loop</h3>
            {newsletterError && <p className="text-xs text-rose-600">{newsletterError}</p>}
            <form onSubmit={onNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 glass-panel p-1.5 rounded-2xl">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 input-glass rounded-xl px-4 py-2.5 text-sm"
              />
              <button type="submit" className="btn-primary text-white text-sm font-medium py-2.5 px-6 rounded-xl">
                Subscribe
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
