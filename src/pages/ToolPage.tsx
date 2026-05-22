import { useEffect, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { AITool, Category } from '../types';
import { fetchToolBySlug } from '../lib/api';
import { usePageMeta } from '../hooks/usePageMeta';
import { LucideIcon } from '../components/LucideIcon';
import { openToolWebsite, getValidToolUrl } from '../lib/toolUrl';
import { paths, navigate, categoriesIndexPath } from '../lib/router';

interface ToolPageProps {
  slug: string;
  categories: Category[];
  catalogTools: AITool[];
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
}

export function ToolPage({
  slug,
  categories,
  catalogTools,
  bookmarkedIds,
  onBookmarkToggle,
  onVote,
}: ToolPageProps) {
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const local = catalogTools.find((t) => t.id === slug || t.id.replace(/_/g, '-') === slug);
    if (local) {
      setTool(local);
      setLoading(false);
      return;
    }

    fetchToolBySlug(slug)
      .then((fetched) => {
        if (cancelled) return;
        if (fetched) setTool(fetched);
        else setError('Tool not found.');
        setLoading(false);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load tool');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, catalogTools]);

  const category = categories.find((c) => c.id === tool?.category);
  const externalUrl = tool ? getValidToolUrl(tool.url) : null;

  usePageMeta(
    tool
      ? {
          title: `${tool.name} — ZorlAI`,
          description: tool.tagline || tool.description,
          canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${paths.tool(slug)}`,
        }
      : null
  );

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex justify-center">
        <div className="glass-panel rounded-2xl w-full max-w-2xl min-h-[400px] animate-pulse mx-4" />
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="pt-32 pb-20 text-center px-4">
        <div className="glass-panel rounded-2xl max-w-md mx-auto p-10">
          <LucideIcon name="Compass" className="w-10 h-10 text-slate-400 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-slate-900 mb-2">Tool not found</h1>
          <p className="text-sm text-slate-600 mb-6">{error || 'This tool may have been removed.'}</p>
          <button type="button" onClick={() => navigate(paths.explore())} className="btn-primary text-white px-6 py-3 rounded-xl text-sm">
            Browse all tools
          </button>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(tool.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-28 pb-16 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(categoriesIndexPath())}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-6"
        >
          <LucideIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
          Back to directory
        </button>

        <div className="glass-panel-strong rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl bg-white border border-sky-100 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
              {!logoError && tool.logoUrl ? (
                <img src={tool.logoUrl} alt="" className="w-12 h-12 object-contain" onError={() => setLogoError(true)} />
              ) : (
                <LucideIcon name={tool.icon} className="w-10 h-10 text-sky-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              {category && (
                <button
                  type="button"
                  onClick={() => navigate(paths.category(tool.category))}
                  className="text-[10px] font-mono uppercase tracking-wider text-sky-600 hover:text-sky-800 mb-2"
                >
                  {category.name}
                </button>
              )}
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{tool.name}</h1>
              <p className="text-lg text-slate-700 font-medium mb-4">{tool.tagline}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200">{tool.pricing}</span>
                {tool.isTrending && (
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1">
                    <LucideIcon name="Flame" className="w-3 h-3" /> Trending
                  </span>
                )}
                <span className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700">{tool.votes} votes</span>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mt-6 text-base">{tool.description}</p>

          <div className="flex flex-wrap gap-2 mt-6">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-sky-100">
            {externalUrl && (
              <button
                type="button"
                onClick={() => openToolWebsite(tool.url)}
                className="btn-primary text-white px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <LucideIcon name="ExternalLink" className="w-4 h-4" />
                Visit official site
              </button>
            )}
            <button
              type="button"
              onClick={(e) => onBookmarkToggle(tool.id, e)}
              className={`px-5 py-3 rounded-xl text-sm font-medium border flex items-center gap-2 ${
                isBookmarked ? 'bg-sky-100 border-sky-300 text-sky-800' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <LucideIcon name="Bookmark" className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save tool'}
            </button>
            <button
              type="button"
              onClick={(e) => onVote(tool.id, e)}
              className="px-5 py-3 rounded-xl text-sm font-medium border border-slate-200 bg-white text-slate-700 flex items-center gap-2 hover:bg-sky-50"
            >
              <LucideIcon name="ArrowUp" className="w-4 h-4" />
              Upvote ({tool.votes})
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
