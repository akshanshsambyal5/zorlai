import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blog';
import { LucideIcon } from './LucideIcon';

export function BlogTab() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          // Editorial List View
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Header Block */}
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Insights</h2>
              <p className="text-sm text-slate-400">Editorials on AI tools, agents, and the builder stack</p>
            </div>

            {/* Featured Hero Blog Post */}
            {BLOG_POSTS[0] && (
              <div
                onClick={() => setSelectedPost(BLOG_POSTS[0])}
                className="group relative overflow-hidden rounded-3xl glass-card-premium cursor-pointer flex flex-col lg:flex-row gap-6 transition-all duration-300"
              >
                {/* Image panel */}
                <div className="lg:w-1/2 h-[260px] lg:h-auto overflow-hidden relative">
                  <img
                    src={BLOG_POSTS[0].coverImage}
                    alt={BLOG_POSTS[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/80" />
                  <span className="absolute top-4 left-4 bg-violet-600 text-white border border-violet-400/25 px-3 py-1 text-[9px] font-mono uppercase tracking-widest rounded-lg">
                    Featured Editorial
                  </span>
                </div>

                {/* Info panel */}
                <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-500 uppercase">
                      <span>{BLOG_POSTS[0].category}</span>
                      <span>•</span>
                      <span>{BLOG_POSTS[0].publishedAt}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-sans font-extrabold text-white group-hover:text-violet-300 transition-colors leading-tight">
                      {BLOG_POSTS[0].title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                      {BLOG_POSTS[0].summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <img
                        src={BLOG_POSTS[0].author.avatar}
                        alt={BLOG_POSTS[0].author.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full border border-white/10"
                      />
                      <div>
                        <div className="text-xs text-slate-300 font-bold">{BLOG_POSTS[0].author.name}</div>
                        <div className="text-[9px] font-mono text-slate-500 uppercase">{BLOG_POSTS[0].author.role}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-1 transition-all duration-300 flex items-center gap-1">
                      READ NOW <LucideIcon name="ChevronRight" className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Grid for side blogs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {BLOG_POSTS.slice(1).map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className="group rounded-2xl border border-white/5 bg-slate-950/20 backdrop-blur-md p-5 flex flex-col justify-between gap-5 hover:border-violet-500/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] cursor-pointer cursor-pointers h-[380px]"
                >
                  <div className="space-y-4">
                    <div className="h-44 w-full rounded-xl overflow-hidden relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute bottom-3 left-3 bg-slate-900/90 text-slate-400 border border-white/10 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded">
                        {post.category}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[9px] font-mono text-slate-500">{post.publishedAt} • {post.readTime}</div>
                      <h4 className="text-base font-sans font-bold text-slate-100 group-hover:text-violet-400 transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full border border-white/5"
                      />
                      <span className="text-[10px] text-slate-400 font-medium truncate">{post.author.name}</span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest group-hover:translate-x-0.5 transition-transform">
                      Inspect
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Comprehensive Blog Reader View
          <motion.div
            key="reader"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.2 }}
            className="max-w-3xl mx-auto space-y-8 bg-slate-950/40 p-6 md:p-10 rounded-3xl border border-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          >
            {/* Nav Back Header */}
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-1.5 text-xs font-mono uppercase text-slate-400 hover:text-white transition cursor-pointer"
              >
                <LucideIcon name="ChevronRight" className="w-4 h-4 rotate-180" />
                <span>Return to Telemetry</span>
              </button>
              <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest">
                Node ID: {selectedPost.id}
              </span>
            </div>

            {/* Title / Authorship Block */}
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-400/20 px-3 py-1 rounded-full">
                {selectedPost.category}
              </span>
              <h1 className="text-2xl md:text-4xl font-sans font-black tracking-tight text-white leading-[1.15]">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2.5">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <div className="text-xs text-slate-200 font-bold">{selectedPost.author.name}</div>
                    <div className="text-[9px] font-mono text-slate-500 uppercase">{selectedPost.author.role}</div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-500 sm:border-l sm:border-white/5 sm:pl-4">
                  Published: {selectedPost.publishedAt} • {selectedPost.readTime}
                </div>
              </div>
            </div>

            {/* Large Banner Image */}
            <div className="h-[280px] md:h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
              <img
                src={selectedPost.coverImage}
                alt={selectedPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Editorial Content Text with pristine typography scale */}
            <div className="prose prose-invert text-sm md:text-base text-slate-300 leading-relaxed font-sans space-y-6">
              <p className="text-cyan-200 leading-relaxed font-medium text-base border-l-2 border-cyan-500 pl-4 bg-cyan-950/10 py-3 rounded-r-xl">
                {selectedPost.summary}
              </p>
              
              <div className="text-slate-300 text-sm leading-relaxed space-y-4">
                <p>{selectedPost.content}</p>
                <p>
                  Transitioning into fully autonomous agent frameworks requires a comprehensive understanding of dynamic sandbox evaluations. NexusCoder demonstrates how standard trace streams can be utilized to locate exceptions and write direct self-repairing modular segments. Developers are actively transforming from hands-on coders into high-fidelity system design architects.
                </p>
                <p>
                  As we integrate dense, high-frequency embedding networks, the accuracy parameters of real-time search retrievals will continue to ascend, reducing manual code checking loops and allowing systems to remain completely unified, resilient, and responsive to immediate production directives.
                </p>
              </div>
            </div>

            {/* Footer / Back panel */}
            <div className="pt-6 border-t border-white/5 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => alert('Diagnostic shared internally.')}
                  className="p-2 bg-slate-900 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <LucideIcon name="Send" className="w-3.5 h-3.5" />
                  <span className="font-mono text-[9px] uppercase">Telemetry link</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-gradient-to-tr from-violet-600/25 to-indigo-600/25 border border-violet-500/20 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition cursor-pointer"
              >
                Return to Directory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
