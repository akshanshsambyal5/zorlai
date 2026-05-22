import { useMemo } from 'react';
import { motion } from 'motion/react';
import { Category, AITool } from '../types';
import { CategoryCard } from '../components/categories/CategoryCard';
import { LucideIcon } from '../components/LucideIcon';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { usePageMeta } from '../hooks/usePageMeta';
import { categoriesIndexPath } from '../lib/router';
import { ensureArray } from '../lib/safeArray';

interface CategoriesIndexPageProps {
  categories: Category[];
  tools: AITool[];
  loading: boolean;
  onNavigate: (path: string) => void;
}

export function CategoriesIndexPage({
  categories,
  tools,
  loading,
  onNavigate,
}: CategoriesIndexPageProps) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  usePageMeta({
    title: 'AI Tool Categories — ZorlAI Directory',
    description:
      'Browse 10 curated categories of free AI tools: image generation, video, coding, chatbots, productivity, voice, music, research, marketing, and design.',
    canonical: `${origin}${categoriesIndexPath()}`,
    ogImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
  });

  const stats = useMemo(() => {
    const counts: Record<string, number> = {};
    const trending: Record<string, number> = {};
    for (const t of ensureArray(tools)) {
      counts[t.category] = (counts[t.category] || 0) + 1;
      if (t.isTrending || t.votes > 300) {
        trending[t.category] = (trending[t.category] || 0) + 1;
      }
    }
    return { counts, trending };
  }, [tools]);

  const totalTools = ensureArray(tools).length;

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6">
      <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 mb-6"
        >
          <LucideIcon name="Layers" className="w-4 h-4 text-violet-400" />
          <span className="text-xs text-slate-400">
            {loading ? 'Loading categories...' : `${categories.length} categories · ${totalTools} tools`}
          </span>
        </motion.div>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Explore by <span className="text-gradient-hero">category</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Every tool is organized by capability — from image and video generation to coding agents and
          research assistants. Select a category to view curated tools with official links.
        </p>
      </ScrollReveal>

      {loading && categories.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-2xl min-h-[220px] animate-pulse" />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-2xl max-w-lg mx-auto">
          <p className="text-sm text-slate-500">No categories loaded. Run Supabase seed migrations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div key={cat.id}>
              <CategoryCard
                category={cat}
                toolCount={stats.counts[cat.id] ?? cat.count ?? 0}
                trendingCount={stats.trending[cat.id] ?? 0}
                onNavigate={onNavigate}
                delay={i * 0.05}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
