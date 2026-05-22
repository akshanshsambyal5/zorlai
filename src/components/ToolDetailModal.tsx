import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AITool } from '../types';
import { LucideIcon } from './LucideIcon';
import { getValidToolUrl } from '../lib/toolUrl';

interface ToolDetailModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: (id: string, e: React.MouseEvent) => void;
  onVote: (id: string, e: React.MouseEvent) => void;
}

export function ToolDetailModal({
  tool,
  isOpen,
  onClose,
  isBookmarked,
  onBookmarkToggle,
  onVote,
}: ToolDetailModalProps) {
  const [logoError, setLogoError] = useState(false);
  if (!tool) return null;

  const launchUrl = getValidToolUrl(tool.url);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          />

          {/* Dialog Body Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl glass-panel-strong z-10 p-6 md:p-8 flex flex-col max-h-[90vh]"
          >
            {/* Ambient neon backdrop glows */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-violet-600/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-cyan-600/10 blur-[50px] rounded-full pointer-events-none" />

            {/* Header / Dismiss buttons */}
            <div className="relative flex justify-between items-center mb-6 z-10 pb-4 border-b border-white/5">
              <span className="text-xs text-slate-500 font-mono">{tool.id}</span>
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/5 text-slate-400 hover:text-white rounded-xl transition-all duration-200 active:scale-90"
              >
                <LucideIcon name="X" className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Main Area */}
            <div className="overflow-y-auto pr-1 flex-1 z-10 custom-scrollbar space-y-6">
              {/* Identity Segment */}
              <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-violet-600/30 via-slate-950 to-indigo-600/30 border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.2)] overflow-hidden">
                  {!logoError && tool.logoUrl ? (
                    <img src={tool.logoUrl} alt="" className="w-10 h-10 object-contain" onError={() => setLogoError(true)} />
                  ) : (
                    <LucideIcon name={tool.icon} className="w-8 h-8 text-violet-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 items-center mb-1">
                    <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                      {tool.name}
                    </h2>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold self-center">
                      {tool.pricing}
                    </span>
                  </div>
                  <p className="text-sm text-cyan-400/90 font-mono">
                    {tool.tagline}
                  </p>
                </div>
              </div>

              {/* Stats Block Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 text-center">
                  <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-0.5">Rating</div>
                  <div className="text-sm font-sans font-bold text-amber-400 flex items-center justify-center gap-1">
                    <LucideIcon name="Star" className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{tool.rating}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 text-center">
                  <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-0.5">Reviews</div>
                  <div className="text-sm font-sans font-bold text-slate-200">{tool.reviewsCount} users</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 text-center">
                  <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-0.5">Upvotes</div>
                  <div className="text-sm font-sans font-bold text-violet-400 flex items-center justify-center gap-1">
                    <LucideIcon name="ArrowUp" className="w-3.5 h-3.5" />
                    <span>{tool.votes}</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-2xl border border-white/5 text-center">
                  <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider mb-0.5">Saved</div>
                  <div className="text-sm font-sans font-bold text-cyan-400">{tool.bookmarks} nodes</div>
                </div>
              </div>

              {/* Complete Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">Descriptive Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed font-sans bg-slate-950/40 p-4 rounded-2xl border border-white/5">
                  {tool.description}
                </p>
              </div>

              {/* Core Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400">Core Synthesizer Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tool.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-950/20 border border-white/5 text-xs text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      <div className="w-4 h-4 rounded bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                        <LucideIcon name="Sparkle" className="w-2.5 h-2.5 text-violet-400 animate-pulse" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subcategorization tags list */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-mono text-slate-500">Filters:</span>
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono text-violet-300 bg-violet-600/10 border border-violet-500/20 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action panel footer */}
            <div className="relative pt-6 border-t border-white/5 mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 z-10">
              <button
                onClick={(e) => onVote(tool.id, e)}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600/25 to-indigo-600/25 border border-violet-500/30 hover:border-violet-500/50 text-white font-mono text-xs py-3 px-4 rounded-2xl transition-all duration-300 active:scale-95 shadow-[0_5px_15px_rgba(139,92,246,0.15)] hover:shadow-[0_5px_25px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <LucideIcon name="ArrowUp" className="w-4 h-4 animate-bounce" />
                <span>UPVOTE ({tool.votes})</span>
              </button>

              <button
                onClick={(e) => onBookmarkToggle(tool.id, e)}
                className={`flex items-center justify-center gap-2 border text-xs font-mono py-3 px-4 rounded-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
                  isBookmarked
                    ? 'bg-cyan-600/20 text-cyan-300 border-cyan-500/40 shadow-[0_5px_15px_rgba(6,182,212,0.1)]'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <LucideIcon name="Bookmark" className={`w-4 h-4 ${isBookmarked ? 'fill-cyan-300' : ''}`} />
                <span>{isBookmarked ? 'BOOKMARKED' : 'SAVE TO LAB'}</span>
              </button>

              {launchUrl ? (
                <a
                  href={launchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 btn-primary text-white text-sm font-medium py-3 px-4 rounded-2xl transition-all hover:-translate-y-0.5 active:scale-95 text-center"
                >
                  <span>Visit official site</span>
                  <LucideIcon name="ExternalLink" className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="col-span-2 sm:col-span-1 text-xs text-slate-500 text-center py-3">
                  Official link unavailable
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
