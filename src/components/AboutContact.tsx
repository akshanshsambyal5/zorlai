import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';

interface AboutContactProps {
  initialView?: 'about' | 'contact';
}

export function AboutContact({ initialView = 'about' }: AboutContactProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>(initialView);
  const [contactData, setContactData] = useState({
    subject: '',
    category: 'downlink',
    message: '',
    nodeEmail: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const teamMembers = [
    { name: 'Dr. Vance Vance', role: 'Telemetry Principal', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80' },
    { name: 'Elena Kai', role: 'Acoustic Synthesize lead', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&h=80&q=80' },
    { name: 'Sophia Aris', role: 'Vector Search Specialist', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80' },
  ];

  const roadmaps = [
    { phase: 'P-01', title: 'Latent diffusion cascades on-chip integration', date: 'Q3 2026' },
    { phase: 'P-02', title: 'Fully offline sovereign multi-hop Proof Solvers', date: 'Q4 2026' },
    { phase: 'P-03', title: 'Unified sound/video temporal physics synchronization', date: 'Q1 2027' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    setTimeout(() => {
      setIsSending(false);
      setSuccess(true);
      setContactData({
        subject: '',
        category: 'downlink',
        message: '',
        nodeEmail: '',
      });
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative">
      <div className="flex justify-center mb-8 bg-slate-900/60 p-1 rounded-2xl border border-white/5 max-w-xs mx-auto">
        <button
          onClick={() => {
            setActiveTab('about');
            setSuccess(false);
          }}
          className={`flex-1 py-1.5 text-xs font-mono uppercase rounded-xl transition-all duration-300 ${
            activeTab === 'about'
              ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-white border border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.15)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ABOUT LABS
        </button>
        <button
          onClick={() => {
            setActiveTab('contact');
            setSuccess(false);
          }}
          className={`flex-1 py-1.5 text-xs font-mono uppercase rounded-xl transition-all duration-300 ${
            activeTab === 'contact'
              ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 text-white border border-violet-500/20 shadow-[0_0_10px_rgba(139,92,246,0.15)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          CONTACT CORE
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-slate-950/40 backdrop-blur-md rounded-3xl border border-white/5 p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {activeTab === 'about' ? (
          <div className="space-y-8 select-none">
            {/* Vision and telemetry parameters block */}
            <div className="space-y-3">
              <h3 className="text-xl font-sans font-black text-white tracking-widest uppercase">
                ZORL.AI Sovereign Node
              </h3>
              <p className="text-xs text-violet-400 font-mono uppercase tracking-widest animate-pulse">
                Establishing neural pathways since Q1 22
              </p>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                ZorlAI was engineered under a modular blueprint parameters framework, offering high-fidelity search retrievals and indexing structures to discover, audit, and launch supreme AI nodes. We filter out basic conversational loops to prioritize elite developmental copilots, generative kinematics matrices, and sovereign analytical proof solvers.
              </p>
            </div>

            {/* Bento Roadmap block */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 pb-2 border-b border-white/5">
                R&D Architecture Roadmap
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roadmaps.map((road) => (
                  <div key={road.phase} className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/15 border border-cyan-400/25 px-2 py-0.5 rounded">
                        {road.phase}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{road.date}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-sans font-medium leading-normal">
                      {road.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Telemetry Core Team */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 pb-2 border-b border-white/5">
                Active Telemetry Council
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-3 p-3 bg-white/[0.01] rounded-2xl border border-white/5">
                    <img src={member.avatar} alt={member.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-xl border border-white/10 shrink-0" />
                    <div className="overflow-hidden">
                      <div className="text-xs text-slate-200 font-bold truncate">{member.name}</div>
                      <div className="text-[9px] font-mono text-slate-500 truncate">{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-sans font-black text-white tracking-widest uppercase">
                Contact ZorlAI Core
              </h3>
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-widest">
                Uplink secure log parameters
              </p>
            </div>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 space-y-4"
              >
                <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <LucideIcon name="Send" className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base font-sans font-bold text-white uppercase">Downlink Synchronized</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mt-1">
                    Your secure log block has been loaded successfully. ZorlAI core administrators will establish communication parameters shortly.
                  </p>
                </div>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-gradient-to-tr from-violet-600/25 to-indigo-600/25 border border-violet-500/20 text-white rounded-xl text-xs font-mono uppercase"
                >
                  TRANSMIT ANOTHER LOG
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={contactData.subject}
                      onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                      placeholder="e.g. Downlink connection query"
                      className="w-full bg-slate-900 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-slate-200 outline-none focus:border-cyan-500/30 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Uplink Category
                    </label>
                    <select
                      value={contactData.category}
                      onChange={(e) => setContactData({ ...contactData, category: e.target.value })}
                      className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-cyan-500/30"
                    >
                      <option value="downlink">Technical Downlink Connection</option>
                      <option value="partnership">Sponsorship Partnership Proposition</option>
                      <option value="moderation">Moderation Registry Appeal</option>
                      <option value="security">Encryption / Security Report</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Message Body Block
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    placeholder="Provide diagnostic codes or connection details..."
                    className="w-full bg-slate-900 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-slate-200 outline-none focus:border-cyan-500/30 transition resize-none custom-scrollbar"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Your Tenant Communication Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={contactData.nodeEmail}
                    onChange={(e) => setContactData({ ...contactData, nodeEmail: e.target.value })}
                    placeholder="e.g. admin@zorl.ai"
                    className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:border-cyan-500/30 outline-none transition"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-mono text-xs py-3.5 rounded-xl border border-violet-400/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSending ? (
                      <>
                        <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
                        <span>ESTABLISHING SECURE CONNECTION TRACES...</span>
                      </>
                    ) : (
                      <>
                        <LucideIcon name="Send" className="w-4 h-4" />
                        <span>TRANSMIT LOG TO PRIMARY COUNCIL</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
