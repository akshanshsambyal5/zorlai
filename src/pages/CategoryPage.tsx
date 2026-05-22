import { useMemo, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Category, AITool } from '../types';
import { useTools } from '../hooks/useTools';
import { usePageMeta } from '../hooks/usePageMeta';
import { getCategoryVisual } from '../lib/categoryVisuals';
import { CategoryToolsGrid } from '../components/categories/CategoryToolsGrid';
import { LucideIcon } from '../components/LucideIcon';
import { categoriesIndexPath, categoryPath } from '../lib/router';
import { ensureArray } from '../lib/safeArray';

interface CategoryPageProps {
  slug: string;
  categories: Category[];
  categoriesLoading: boolean;
  bookmarkedIds: string[];
  onNavigate: (path: string) => void;
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
}

export function CategoryPage({
  slug,
  categories,
  categoriesLoading,
  bookmarkedIds,
  onNavigate,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
}: CategoryPageProps) {
  const category = categories.find((c) => c.id === slug);
  const visual = getCategoryVisual(slug);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [showTrendingOnly, setShowTrendingOnly] = useState(false);

  const { tools, loading, error } = useTools({
    category: slug,
    search: searchQuery || undefined,
    pricing: selectedPricing,
  });

  const safeTools = ensureArray<AITool>(tools);

  const displayedTools = useMemo(() => {
    if (!showTrendingOnly) return safeTools;
    return safeTools.filter((t) => t.isTrending || t.votes > 300);
  }, [safeTools, showTrendingOnly]);

  const trendingCount = useMemo(
    () => safeTools.filter((t) => t.isTrending || t.votes > 300).length,
    [safeTools]
  );

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const pageTitle = category ? `${category.name} AI Tools` : 'Category';
  const pageDesc =
    category?.description ||
    `Discover the best ${pageTitle} on ZorlAI — official links, ratings, and bookmarks.`;

  usePageMeta({
    title: `${pageTitle} — ZorlAI`,
    description: pageDesc,
    canonical: `${origin}${categoryPath(slug)}`,
    ogImage: visual.image,
  });

  if (!categoriesLoading && !category) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <div className="glass-panel rounded-2xl max-w-md mx-auto p-10 space-y-4">
          <LucideIcon name="Compass" className="w-10 h-10 text-slate-500 mx-auto" />
          <h1 className="font-display text-xl font-bold text-slate-900">Category not found</h1>
          <button
            type="button"
            onClick={() => onNavigate(categoriesIndexPath())}
            className="btn-primary text-white text-sm px-5 py-2.5 rounded-xl"
          >
            Back to categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pb-16"
    >
      {/* Hero */}
      <section className="relative pt-24 pb-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${visual.image})` }}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${visual.gradient}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-sky-50/40" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigate(categoriesIndexPath())}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
          >
            <LucideIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
            All categories
          </button>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-10">
            <div className="flex items-start gap-4 flex-1">
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200 shrink-0 shadow-sm">
                <LucideIcon
                  name={category?.icon ?? 'Sparkles'}
                  className={`w-8 h-8 ${visual.accent}`}
                />
              </div>
              <div>
                {categoriesLoading ? (
                  <div className="h-10 w-48 bg-white/10 rounded-lg animate-pulse mb-2" />
                ) : (
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-2">
                    {category?.name}
                  </h1>
                )}
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {category?.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-medium px-3 py-1 rounded-full glass-panel text-slate-700">
                    {displayedTools.length} tools shown
                  </span>
                  {trendingCount > 0 && (
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/25 flex items-center gap-1">
                      <LucideIcon name="Flame" className="w-3 h-3" />
                      {trendingCount} trending
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-2 mb-8">
        <div className="glass-panel-strong rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row gap-3">
          <div className="flex-1 relative flex items-center min-h-[48px]">
            <LucideIcon name="Search" className="absolute left-4 w-4 h-4 text-slate-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search in ${category?.name ?? 'category'}...`}
              className="w-full bg-transparent border-0 outline-none pl-11 pr-4 text-slate-100 text-sm placeholder:text-slate-500"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex p-1 rounded-xl bg-black/30 border border-white/5 gap-1">
              {['All', 'Free', 'Freemium', 'Paid'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedPricing(opt)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    selectedPricing === opt ? 'bg-sky-500 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowTrendingOnly((v) => !v)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                showTrendingOnly
                  ? 'bg-orange-500/15 text-orange-300 border-orange-500/30'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20'
              }`}
            >
              <LucideIcon name="Flame" className="w-3.5 h-3.5" />
              Trending only
            </button>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="px-4 sm:px-6">
        <CategoryToolsGrid
          tools={displayedTools}
          loading={loading}
          error={error}
          bookmarkedIds={bookmarkedIds}
          categories={categories}
          onBookmarkToggle={onBookmarkToggle}
          onVote={onVote}
          onOpenDetails={onOpenDetails}
          onOpenToolPage={(tool) => onNavigate(`/tool/${tool.id}`)}
        />
      </section>

      {/* Related categories */}
      {categories.length > 1 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16 pt-10 border-t border-white/[0.06]">
          <h2 className="font-display text-lg font-semibold text-slate-900 mb-4">Browse other categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories
              .filter((c) => c.id !== slug)
              .slice(0, 8)
              .map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onNavigate(categoryPath(c.id))}
                  className="btn-ghost-glass text-xs px-3 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  {c.name}
                </button>
              ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}
