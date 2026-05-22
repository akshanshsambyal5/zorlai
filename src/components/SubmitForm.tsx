import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ToolSubmission } from '../types';
import { LucideIcon } from './LucideIcon';
import { Category } from '../types';

interface SubmitFormProps {
  categories: Category[];
  onSubmit: (submission: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>) => Promise<void>;
}

export function SubmitForm({ categories, onSubmit }: SubmitFormProps) {
  const defaultCategory = categories[0]?.id ?? 'coding';
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    url: '',
    category: defaultCategory,
    pricing: 'Freemium' as 'Free' | 'Freemium' | 'Paid' | 'Open Source',
    tags: '',
    submittedBy: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (categories.length === 0) return;
    if (!categories.some((c) => c.id === formData.category)) {
      setFormData((f) => ({ ...f, category: categories[0].id }));
    }
  }, [categories, formData.category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.url || !formData.submittedBy) {
      alert('Must populate name, url, and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        name: formData.name,
        tagline: formData.tagline || 'Autonomous artificial intelligence node.',
        description:
          formData.description ||
          'Premium artificial workspace element compiled for high speed deployment orbits.',
        url: formData.url,
        category: formData.category,
        pricing: formData.pricing,
        tags: formData.tags || 'AI, autonomous',
        submittedBy: formData.submittedBy,
      });

      setSuccess(true);
      setFormData({
        name: '',
        tagline: '',
        description: '',
        url: '',
        category: 'coding',
        pricing: 'Freemium',
        tags: '',
        submittedBy: '',
      });
    } catch {
      alert('Transmission failed. Verify server connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 relative">
      <div className="text-center max-w-xl mx-auto mb-10">
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-2">Submit a tool</h2>
        <p className="text-sm text-slate-400">Share an AI tool with the community for review</p>
      </div>

      <motion.div
        className="relative glass-panel-strong rounded-3xl p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Spotlighting flows */}
        <div className="absolute top-[10%] right-[10%] w-[100px] h-[100px] bg-cyan-600/5 blur-[50px] rounded-full pointer-events-none" />

        {success ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10 space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <LucideIcon name="Sparkle" className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg font-sans font-bold text-white uppercase tracking-wider mb-1">
                Node Synced Successfully
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Your tool proposal has been streamed to our active Moderation terminal. Open the **User Settings / Dashboard workspace (gear icon)** at the top right to check live status or audit pending proposals instantly as Admin!
              </p>
            </div>
            <button
              onClick={() => setSuccess(false)}
              className="px-5 py-2.5 bg-gradient-to-tr from-violet-600/20 to-indigo-600/20 border border-violet-500/30 hover:border-violet-500/40 text-white rounded-xl text-xs font-mono uppercase tracking-widest cursor-pointer shadow-[0_4px_15px_rgba(139,92,246,0.15)]"
            >
              Propose Another Node
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tool Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Tool Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. NexusCoder"
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
                />
              </div>

              {/* Resource Launch Urn */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Launch URL <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="e.g. https://nexuscoder.io"
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
                />
              </div>
            </div>

            {/* Slogan details line */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Brief Tagline Slogan
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="e.g. Autonomous multi-file code generator terminal synthesizer."
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:border-cyan-500/30 outline-none transition"
              />
            </div>

            {/* Complete descriptive text */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Extended Description Overview
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detail core logic features, capabilities, and target developer orbits which this node serves..."
                className="w-full bg-slate-900/60 border border-white/5 rounded-xl px-3.5 py-3 text-xs text-slate-200 focus:border-cyan-500/30 outline-none transition resize-none custom-scrollbar"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Category Classification
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-cyan-500/30"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Pricing Tier
                </label>
                <select
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value as any })}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-xs text-slate-300 outline-none focus:border-cyan-500/30"
                >
                  <option value="Free">Free</option>
                  <option value="Freemium">Freemium</option>
                  <option value="Paid">Paid</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tag parameters input */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Tags (Separated by commas)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g. CLI, typescript, sandbox"
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
                />
              </div>

              {/* Submitter details email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Your Submitter Profile Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.submittedBy}
                  onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
                  placeholder="e.g. tenant@zorl.ai"
                  className="w-full input-glass rounded-xl px-3.5 py-3 text-sm text-slate-200"
                />
              </div>
            </div>

            {/* Action buttons triggers */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white text-sm font-medium py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <LucideIcon name="Sparkles" className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>SYNCHRONIZING SECURE TELEMETRY NODES...</span>
                  </>
                ) : (
                  <>
                    <LucideIcon name="Plus" className="w-4 h-4" />
                    <span>TRANSMIT PROPOSAL TO MODERATION WORKSPACE</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
