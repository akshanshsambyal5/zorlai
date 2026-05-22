import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { MagneticButton } from './ui/MagneticButton';
import { ScrollReveal } from './ui/ScrollReveal';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPricing: string;
  setSelectedPricing: (pricing: string) => void;
  onQuickSearch: (tag: string) => void;
  onSearchSubmit?: () => void;
  filteredCount: number;
}

export function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedPricing,
  setSelectedPricing,
  onQuickSearch,
  onSearchSubmit,
  filteredCount,
}: HeroSectionProps) {
  const trendingTags = ['autonomous', '60FPS', 'diffusion', 'cloning', 'typescript', 'reasoning'];

  const stats = [
    { label: 'AI Tools', value: `${Math.max(filteredCount, 118)}+`, accent: 'from-sky-500 to-blue-600' },
    { label: 'Categories', value: '10', accent: 'from-cyan-500 to-sky-500' },
    { label: 'Official Links', value: '100%', accent: 'from-blue-500 to-sky-400' },
  ];

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[11px] font-mono tracking-wide text-slate-500">
              Live directory · <span className="text-slate-800 font-medium">{filteredCount}</span> tools indexed
            </span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1 className="font-display font-bold text-[2.5rem] sm:text-5xl md:text-[3.5rem] leading-[1.05] tracking-tight mb-6 max-w-4xl">
            Discover the world&apos;s best{' '}
            <span className="text-gradient-hero">free AI tools</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mb-12 leading-relaxed font-normal">
            Curated models, agents, and creative engines — hand-picked for builders.
            Search, save, and launch in one premium workspace.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="w-full max-w-2xl">
          <div className="glass-panel-strong rounded-2xl p-2 flex flex-col md:flex-row gap-2 glow-blue">
            <div className="flex-1 relative flex items-center min-h-[52px]">
              <LucideIcon name="Search" className="absolute left-4 w-4 h-4 text-slate-500" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                placeholder="Search tools, tags, or categories..."
                className="w-full bg-transparent border-0 outline-none pl-11 pr-4 text-slate-900 text-sm placeholder:text-slate-400"
              />
            </div>
            {onSearchSubmit && (
              <button
                type="button"
                onClick={onSearchSubmit}
                className="btn-primary text-white text-sm font-medium px-5 py-3 rounded-xl shrink-0"
              >
                Search
              </button>
            )}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/70 border border-sky-200/60">
              {['All', 'Free', 'Freemium', 'Paid'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedPricing(opt)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                    selectedPricing === opt
                      ? 'bg-sky-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.26} className="mt-5">
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTags.map((tag) => (
              <span key={tag}>
                <MagneticButton
                  variant="ghost"
                  strength={0.2}
                  onClick={() => onQuickSearch(tag)}
                  className="!px-3 !py-1.5 !text-xs !rounded-full text-slate-400"
                >
                  #{tag}
                </MagneticButton>
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.34} className="w-full max-w-2xl mt-20">
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-10 border-t border-white/[0.06]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="text-center"
              >
                <div
                  className={`text-2xl md:text-3xl font-display font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
