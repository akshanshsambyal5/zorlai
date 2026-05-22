import { useState, useRef, type MouseEvent, type KeyboardEvent } from 'react';
import { motion } from 'motion/react';
import { AITool } from '../types';
import { LucideIcon } from './LucideIcon';
import { openToolWebsite, getValidToolUrl } from '../lib/toolUrl';
import { ensureArray } from '../lib/safeArray';

interface GlassCardProps {
  tool: AITool;
  categoryLabel?: string;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage?: (tool: AITool) => void;
}

export function GlassCard({
  tool,
  categoryLabel,
  isBookmarked,
  onBookmarkToggle,
  onVote,
  onOpenDetails,
  onOpenToolPage,
}: GlassCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const externalUrl = getValidToolUrl(tool.url);
  const tags = ensureArray<string>(tool.tags);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCardClick = () => {
    if (onOpenToolPage) {
      onOpenToolPage(tool);
      return;
    }
    if (externalUrl) {
      openToolWebsite(tool.url);
    } else {
      onOpenDetails(tool);
    }
  };

  const pricingColors: Record<string, string> = {
    Free: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Freemium: 'bg-sky-50 text-sky-700 border-sky-200',
    Paid: 'bg-amber-50 text-amber-800 border-amber-200',
    'Open Source': 'bg-violet-50 text-violet-700 border-violet-200',
  };

  return (
    <motion.div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter') handleCardClick();
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="glass-card-premium relative group overflow-hidden rounded-2xl p-5 sm:p-6 cursor-pointer flex flex-col min-h-[320px] hover-glow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.4, ease: 'easeOut' } }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(480px circle at ${coords.x}px ${coords.y}px, rgba(56,189,248,0.18), transparent 42%)`,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 min-h-0">
        <div className="flex justify-between items-start gap-2 mb-4">
          <motion.div
            animate={isHovered ? { rotateY: 6, rotateX: -3 } : { rotateY: 0, rotateX: 0 }}
            transition={{ duration: 0.35 }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white border border-sky-100 shadow-sm shrink-0 overflow-hidden"
          >
            {!logoError && tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                className="w-9 h-9 object-contain"
                onError={() => setLogoError(true)}
              />
            ) : (
              <LucideIcon name={tool.icon} className="w-7 h-7 text-sky-600" />
            )}
          </motion.div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {tool.isTrending && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 border border-orange-200 text-[10px] font-semibold text-orange-700">
                <LucideIcon name="Flame" className="w-3 h-3" />
                Trending
              </span>
            )}
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border ${pricingColors[tool.pricing] || pricingColors.Freemium}`}>
              {tool.pricing}
            </span>
          </div>
        </div>

        {categoryLabel && (
          <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 mb-2 truncate">
            {categoryLabel}
          </span>
        )}

        <h3 className="type-h3 text-[1.2rem] mb-1.5 line-clamp-2 group-hover:text-sky-700 transition-colors duration-300">
          {tool.name}
        </h3>

        <p className="type-body font-medium mb-2 line-clamp-2">{tool.tagline}</p>

        <p className="type-body-muted line-clamp-3 flex-1">{tool.description}</p>

        <div className="mt-4 pt-4 border-t border-sky-100/80 flex flex-col gap-3">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-slate-600 bg-slate-50 border border-slate-200/80 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (externalUrl) openToolWebsite(tool.url);
                else onOpenDetails(tool);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl btn-primary text-white text-xs font-semibold"
            >
              <LucideIcon name="ExternalLink" className="w-3.5 h-3.5" />
              Open tool
            </button>

            <div className="flex gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(tool);
                }}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-sky-700 hover:border-sky-300 transition"
                title="Details"
              >
                <LucideIcon name="HelpCircle" className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => onBookmarkToggle(tool.id, e)}
                className={`p-2.5 rounded-xl border transition ${
                  isBookmarked
                    ? 'bg-sky-100 text-sky-700 border-sky-300'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
                }`}
                title={isBookmarked ? 'Saved' : 'Save'}
              >
                <LucideIcon name="Bookmark" className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={(e) => onVote(tool.id, e)}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:border-sky-300 hover:bg-sky-50"
              >
                <LucideIcon name="ArrowUp" className="w-3.5 h-3.5" />
                {tool.votes}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
