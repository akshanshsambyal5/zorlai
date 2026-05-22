import { useMemo, useState, type MouseEvent, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../types';
import { HeroSection } from '../components/HeroSection';
import { CategoryStrip } from '../components/categories/CategoryStrip';
import { ToolSection } from '../components/tools/ToolSection';
import { LucideIcon } from '../components/LucideIcon';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { useToolSections } from '../hooks/useToolSections';
import { paths, navigate } from '../lib/router';

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
  const { homeSections } = useToolSections(tools);

  const totalCount = tools.length;

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(paths.search(searchQuery.trim()));
    } else {
      navigate(paths.explore());
    }
  };

  const sectionHandlers = useMemo(
    () => ({
      bookmarkedIds,
      onBookmarkToggle,
      onVote,
      onOpenDetails,
      onOpenToolPage,
      categories,
    }),
    [bookmarkedIds, categories, onBookmarkToggle, onVote, onOpenDetails, onOpenToolPage]
  );

  return (
    <div className="pb-24">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onQuickSearch={(tag) => navigate(paths.search(tag))}
        onSearchSubmit={handleSearchSubmit}
        totalToolCount={totalCount}
        categoryCount={categories.length}
      />

      <CategoryStrip categories={categories} loading={loading} />

      <div className="space-y-20 md:space-y-32">
        {loading ? (
          <div className="max-w-6xl mx-auto px-4 space-y-16">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-6">
                <div className="h-6 w-32 bg-slate-200/80 rounded-lg animate-pulse" />
                <div className="h-10 w-64 bg-slate-200/60 rounded-xl animate-pulse" />
                <div className="flex gap-5 overflow-hidden">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="glass-panel rounded-2xl min-h-[300px] w-[min(88vw,340px)] shrink-0 animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <ToolSection
              id="trending"
              eyebrow="Momentum"
              title="Trending now"
              description="Tools gaining the most engagement — votes, saves, and community buzz."
              tools={homeSections.trending}
              onViewAll={() => navigate(paths.trending())}
              delay={0.05}
              {...sectionHandlers}
            />

            <div className="section-divider max-w-6xl mx-auto" aria-hidden />

            <ToolSection
              id="new-tools"
              eyebrow="Fresh"
              title="New arrivals"
              description="Recently added to the directory — discover what just landed."
              tools={homeSections.new}
              onViewAll={() => navigate(paths.newTools())}
              delay={0.1}
              {...sectionHandlers}
            />

            <div className="section-divider max-w-6xl mx-auto" aria-hidden />

            <ToolSection
              id="popular"
              eyebrow="Community"
              title="Most loved"
              description="Highest saves and ratings from builders who bookmark and return."
              tools={homeSections.popular}
              onViewAll={() => navigate(paths.popular())}
              delay={0.15}
              {...sectionHandlers}
            />
          </>
        )}

        {!loading && (
          <>
            <ScrollReveal delay={0.2} className="max-w-6xl mx-auto px-4 sm:px-6">
              <section className="section-dark-accent rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
                <div className="absolute inset-0 dark-mesh-overlay pointer-events-none rounded-3xl" aria-hidden />
                <div className="relative text-left space-y-2">
                  <p className="type-eyebrow !text-sky-400">Full catalog</p>
                  <h2 className="type-h2 !text-white">Explore every tool</h2>
                  <p className="text-sm text-slate-300 max-w-md">
                    Search, filter by pricing, and browse the complete curated directory.
                  </p>
                </div>
                <motion.button
                  type="button"
                  onClick={() => navigate(paths.explore())}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative z-10 btn-primary text-white text-sm font-medium px-8 py-3.5 min-h-[44px] rounded-full w-full sm:w-auto touch-manipulation"
                >
                  Open explore
                </motion.button>
              </section>
            </ScrollReveal>

            {categories.length > 0 && (
              <ScrollReveal delay={0.25} className="hidden lg:block max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                  <div>
                    <p className="type-eyebrow">Deep dive</p>
                    <h2 className="type-h2">All categories</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(paths.categories())}
                    className="text-sm text-sky-600 hover:text-sky-800 font-medium transition-colors"
                  >
                    Category index →
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      type="button"
                      onClick={() => navigate(paths.category(cat.id))}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="glass-card-premium rounded-2xl p-4 text-left hover-glow min-h-[88px] touch-manipulation w-full"
                    >
                      <LucideIcon name={cat.icon} className="w-5 h-5 text-sky-600 mb-2" />
                      <span className="type-body font-medium text-slate-800 block truncate">{cat.name}</span>
                      <span className="type-caption">{cat.count} tools</span>
                    </motion.button>
                  ))}
                </div>
              </ScrollReveal>
            )}
          </>
        )}
      </div>

      <ScrollReveal delay={0.3} className="mt-24 px-4 sm:px-0">
        <div className="relative overflow-hidden rounded-3xl glass-panel-strong p-8 md:p-12 max-w-4xl mx-auto text-center">
          {newsletterSubscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-4 py-4"
            >
              <LucideIcon name="Sparkle" className="w-8 h-8 text-emerald-500 mx-auto" />
              <h4 className="type-h3">You&apos;re subscribed</h4>
              <p className="type-body-muted">Weekly AI tool picks in your inbox.</p>
            </motion.div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              <h3 className="type-h3">Stay in the loop</h3>
              {newsletterError && <p className="type-caption text-rose-600">{newsletterError}</p>}
              <form
                onSubmit={onNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2 glass-panel p-1.5 rounded-2xl"
              >
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
      </ScrollReveal>
    </div>
  );
}
