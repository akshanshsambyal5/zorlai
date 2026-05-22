import { motion } from 'motion/react';
import { LucideIcon } from './LucideIcon';
import { MagneticButton } from './ui/MagneticButton';
import { ScrollReveal } from './ui/ScrollReveal';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickSearch: (tag: string) => void;
  onSearchSubmit?: () => void;
  totalToolCount: number;
  categoryCount?: number;
}

export function HeroSection({
  searchQuery,
  setSearchQuery,
  onQuickSearch,
  onSearchSubmit,
  totalToolCount,
  categoryCount = 10,
}: HeroSectionProps) {
  const trendingTags = ['writing', 'image', 'coding', 'research', 'video', 'agents'];

  const stats = [
    { label: 'AI Tools', value: `${Math.max(totalToolCount, 1)}+`, accent: 'from-sky-500 to-blue-600' },
    { label: 'Categories', value: String(categoryCount), accent: 'from-cyan-500 to-sky-500' },
    { label: 'Official Links', value: '100%', accent: 'from-blue-500 to-sky-400' },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-2 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="type-caption">
              Live directory · <span className="text-slate-700 font-medium">{totalToolCount}</span> tools indexed
            </span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1 className="type-hero max-w-4xl mx-auto">
            Discover the world&apos;s best{' '}
            <span className="text-gradient-hero">free AI tools</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <p className="type-lead max-w-2xl mx-auto mb-12">
            Curated models, agents, and creative engines — hand-picked for builders.
            Search, save, and launch in one calm workspace.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="w-full max-w-2xl">
          <div className="glass-panel-strong rounded-2xl p-2 flex flex-col md:flex-row gap-2 glow-blue">
            <div className="flex-1 relative flex items-center min-h-[52px]">
              <LucideIcon name="Search" className="absolute left-4 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                placeholder="Search tools, tags, or categories..."
                className="w-full bg-transparent border-0 outline-none pl-11 pr-4 text-slate-800 text-[15px] font-normal placeholder:text-slate-400 tracking-tight"
              />
            </div>
            {onSearchSubmit && (
              <motion.button
                type="button"
                onClick={onSearchSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="btn-primary text-white text-sm font-medium px-5 py-3 rounded-xl shrink-0"
              >
                Search
              </motion.button>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.26} className="mt-5">
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTags.map((tag) => (
              <span key={tag}>
                <MagneticButton
                  variant="ghost"
                  strength={0.15}
                  onClick={() => onQuickSearch(tag)}
                  className="!px-3 !py-1.5 !text-xs !rounded-full text-slate-500"
                >
                  #{tag}
                </MagneticButton>
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.34} className="w-full max-w-2xl mt-16">
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-10 border-t border-slate-200/80">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 * i, duration: 0.75, ease: 'easeOut' }}
                className="text-center"
              >
                <div
                  className={`text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}
                >
                  {stat.value}
                </div>
                <div className="type-caption mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
