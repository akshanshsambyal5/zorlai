import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AITool, ToolSubmission } from '../types';
import { LucideIcon } from './LucideIcon';
import { openToolWebsite } from '../lib/toolUrl';

interface DashboardProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: AITool[];
  likedTools?: AITool[];
  submissions: ToolSubmission[];
  isAdmin?: boolean;
  onRemoveBookmark: (id: string, e: React.MouseEvent) => void;
  onApproveSubmission: (id: string) => void;
  onRejectSubmission: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
}

export function Dashboard({
  isOpen,
  onClose,
  bookmarks,
  likedTools = [],
  submissions,
  isAdmin = false,
  onRemoveBookmark,
  onApproveSubmission,
  onRejectSubmission,
  onSelectTool,
}: DashboardProps) {
  const [isAdminMode, setIsAdminMode] = useState(isAdmin);
  const [activeTab, setActiveTab] = useState<'labs' | 'liked' | 'submissions'>('labs');

  useEffect(() => {
    if (isAdmin) setIsAdminMode(true);
  }, [isAdmin]);

  const pendingSubmissions = submissions.filter((s) => s.status === 'pending');
  const pastSubmissions = submissions.filter((s) => s.status !== 'pending');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-xl"
          />

          {/* Centering Dashboard Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl h-[80vh] overflow-hidden rounded-3xl glass-panel-strong z-10 p-6 md:p-8 flex flex-col"
          >
            {/* Top accent glow lines */}
            <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none" />

            {/* Dashboard Header */}
            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 pb-6 border-b border-white/5 bg-slate-950/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600/30 to-indigo-600/30 border border-violet-500/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <LucideIcon name="Settings" className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-white">Dashboard</h2>
                  <p className="text-xs text-slate-500">Bookmarks, submissions & admin</p>
                </div>
              </div>

              {/* Toggle to Admin Layout */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAdminMode(!isAdminMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-mono tracking-widest border transition-all duration-300 ${
                    isAdminMode
                      ? 'bg-rose-500/10 hover:bg-rose-500/15 border-rose-500/40 text-rose-400 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                      : 'bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <LucideIcon name="Shield" className={`w-3.5 h-3.5 ${isAdminMode ? 'animate-pulse' : ''}`} />
                  <span>{isAdminMode ? 'ADMIN ACTIVE' : 'OPEN ADMIN ACCESS'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-2 bg-slate-900 hover:bg-white/5 border border-white/5 text-slate-400 hover:text-white rounded-xl transition"
                >
                  <LucideIcon name="X" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Admin Controls Panel Overlay */}
            {isAdminMode ? (
              <div className="flex-1 overflow-y-auto py-6 space-y-6 z-10 custom-scrollbar">
                <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                  <div>
                    <h3 className="text-sm font-sans font-extrabold text-rose-400 uppercase tracking-wider mb-1">
                      ZorlAI Moderation Channel
                    </h3>
                    <p className="text-xs text-slate-400 leading-normal">
                      Admin rights activated. Audit user propositions here. Approving submissions immediately adds tools to the live catalog matrix.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-rose-500/10 text-rose-400 px-3 py-1 rounded-lg border border-rose-500/30">
                    Privileged Mode
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase text-slate-400 tracking-widest flex items-center gap-1.5 pb-2 border-b border-white/5">
                    <span>Pending Audits</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono">
                      {pendingSubmissions.length}
                    </span>
                  </h4>

                  {pendingSubmissions.length === 0 ? (
                    <div className="p-10 text-center border border-white/5 rounded-2xl bg-white/[0.01]">
                      <LucideIcon name="Inbox" className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                      <p className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                        Workspace synchronized. No pending proposals.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition hover:border-violet-500/20"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-sans font-bold text-slate-100">{sub.name}</h5>
                              <span className="text-[9px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                                {sub.pricing}
                              </span>
                            </div>
                            <p className="text-xs text-cyan-400/90 font-mono">{sub.tagline}</p>
                            <p className="text-xs text-slate-400 line-clamp-1">{sub.description}</p>
                            <div className="text-[10px] font-mono text-slate-500">
                              By: {sub.submittedBy} • {sub.url}
                            </div>
                          </div>

                          <div className="flex sm:flex-col gap-2 shrink-0">
                            <button
                              onClick={() => onApproveSubmission(sub.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono py-2 px-3 rounded-xl transition cursor-pointer"
                            >
                              <LucideIcon name="Plus" className="w-3.5 h-3.5" />
                              <span>APPROVE</span>
                            </button>
                            <button
                              onClick={() => onRejectSubmission(sub.id)}
                              className="flex-1 flex items-center justify-center gap-1.5 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-[10px] font-mono py-2 px-3 rounded-xl transition cursor-pointer"
                            >
                              <LucideIcon name="X" className="w-3.5 h-3.5" />
                              <span>REJECT</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Past Audits Section */}
                  <div className="pt-4">
                    <h4 className="text-xs font-mono uppercase text-slate-400 tracking-widest pb-2 border-b border-white/5 mb-3">
                      Moderation Log History
                    </h4>
                    {pastSubmissions.length === 0 ? (
                      <p className="text-xs font-mono text-slate-600">No historic moderation inputs recorded.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {pastSubmissions.map((sub) => (
                          <div
                            key={sub.id}
                            className="p-3 rounded-xl border border-white/5 bg-slate-900/30 flex items-center justify-between"
                          >
                            <span className="text-xs text-slate-300 font-medium truncate">{sub.name}</span>
                            <span
                              className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${
                                sub.status === 'approved'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              }`}
                            >
                              {sub.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Standard User Labs Panel
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Visual tabs switcher */}
                <div className="flex gap-2 py-4 border-b border-white/5 z-10">
                  <button
                    onClick={() => setActiveTab('labs')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
                      activeTab === 'labs'
                        ? 'bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 border-violet-500/30 text-white shadow-[0_4px_15px_rgba(139,92,246,0.15)]'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    BOOKMARKS ({bookmarks.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('liked')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
                      activeTab === 'liked'
                        ? 'bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 border-violet-500/30 text-white shadow-[0_4px_15px_rgba(139,92,246,0.15)]'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    LIKED ({likedTools.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
                      activeTab === 'submissions'
                        ? 'bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 border-violet-500/30 text-white shadow-[0_4px_15px_rgba(139,92,246,0.15)]'
                        : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    SUBMITTED PROPOSALS ({submissions.length})
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto py-5 custom-scrollbar z-10">
                  {activeTab === 'liked' ? (
                    likedTools.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center p-10 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                        <LucideIcon name="Heart" className="w-10 h-10 text-slate-600 mb-4" />
                        <h4 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-wider mb-1">
                          No Liked Tools Yet
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm leading-normal">
                          Upvote tools on the directory while signed in. Your liked tools appear here.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {likedTools.map((tool) => (
                          <div
                            key={tool.id}
                            onClick={() => {
                              if (!openToolWebsite(tool.url)) onSelectTool(tool);
                            }}
                            className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-orange-500/30 transition-all duration-300 cursor-pointer flex items-center gap-3 group"
                          >
                            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5 shrink-0">
                              <LucideIcon name={tool.icon} className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="overflow-hidden min-w-0">
                              <h6 className="text-sm font-semibold text-slate-100 truncate">{tool.name}</h6>
                              <p className="text-[10px] font-mono text-slate-500 truncate">
                                {tool.votes} votes • {tool.category}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  ) : activeTab === 'labs' ? (
                    bookmarks.length === 0 ? (
                      <div className="h-full flex flex-col justify-center items-center text-center p-10 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                        <LucideIcon name="Bookmark" className="w-10 h-10 text-slate-600 mb-4" />
                        <h4 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-wider mb-1">
                          No Saved Experiments
                        </h4>
                        <p className="text-xs text-slate-500 max-w-sm leading-normal">
                          Bookmark elite nodes on the home directory or categories feed. They will be logged inside your local lab session.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bookmarks.map((tool) => (
                          <div
                            key={tool.id}
                            onClick={() => {
                              if (!openToolWebsite(tool.url)) onSelectTool(tool);
                            }}
                            className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-violet-500/30 transition-all duration-300 cursor-pointer flex justify-between items-center group shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
                          >
                            <div className="flex items-center gap-3 pr-2 select-none overflow-hidden">
                              <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center border border-white/5 shrink-0 group-hover:border-violet-500/35 transition-colors">
                                <LucideIcon name={tool.icon} className="w-5 h-5 text-violet-400 group-hover:text-cyan-400" />
                              </div>
                              <div className="overflow-hidden">
                                <h6 className="text-sm font-sans font-semibold text-slate-100 group-hover:text-white truncate">
                                  {tool.name}
                                </h6>
                                <p className="text-[10px] font-mono text-slate-500 truncate uppercase">
                                  {tool.pricing} • {tool.category}
                                </p>
                              </div>
                            </div>

                            <button
                              onClick={(e) => onRemoveBookmark(tool.id, e)}
                              className="p-2 bg-slate-950 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg transition"
                              title="Delete bookmark"
                            >
                              <LucideIcon name="X" className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )
                  ) : submissions.length === 0 ? (
                    <div className="h-full flex flex-col justify-center items-center text-center p-10 border border-dashed border-white/5 rounded-2xl bg-white/[0.01]">
                      <LucideIcon name="Plus" className="w-10 h-10 text-slate-600 mb-4" />
                      <h4 className="text-sm font-sans font-bold text-slate-300 uppercase tracking-wider mb-1">
                        No Proposals Submitted
                      </h4>
                      <p className="text-xs text-slate-500 max-w-sm leading-normal">
                        Use the "Submit Tool" panel in the global navbar to propose a futuristic node to the moderator workspace.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-4 rounded-2xl border border-white/5 bg-slate-900/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-white/10 transition"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-sm font-sans font-extrabold text-slate-200">{sub.name}</h5>
                              <span
                                className={`text-[8px] uppercase tracking-wider font-mono bold border px-2 py-0.5 rounded-full ${
                                  sub.status === 'approved'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                    : sub.status === 'rejected'
                                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1">{sub.tagline}</p>
                            <p className="text-[10px] font-mono text-slate-500 mt-1">Submitted: {sub.submittedAt}</p>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-[10px] uppercase font-mono bg-slate-900 border border-white/5 px-2.5 py-1 rounded-lg text-slate-400">
                              {sub.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
