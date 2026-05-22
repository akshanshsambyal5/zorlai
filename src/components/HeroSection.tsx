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
  const trendingTags = ['writing', 'image', 'coding', 'video'];

  const stats = [
    { label: 'AI Tools', value: `${Math.max(totalToolCount, 1)}+`, accent: 'from-sky-500 to-blue-600' },
    { label: 'Categories', value: String(categoryCount), accent: 'from-cyan-500 to-sky-500' },
    { label: 'Official Links', value: '100%', accent: 'from-blue-500 to-sky-400' },
  ];

  return (
    <section className="relative pt-[4.75rem] pb-5 sm:pt-24 sm:pb-8 md:pt-32 md:pb-14 lg:pt-36 lg:pb-20 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center w-full min-w-0">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 glass-panel rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="type-caption text-[11px] sm:text-xs">
              Live · <span className="text-slate-700 font-medium">{totalToolCount}</span> tools
            </span>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.06}>
          <h1 className="type-hero max-w-4xl mx-auto text-balance">
            Discover the world&apos;s best{' '}
            <span className="text-gradient-hero">free AI tools</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="type-lead max-w-xl mx-auto mb-5 sm:mb-8 mt-3 sm:mt-4 text-[15px] sm:text-base line-clamp-3 sm:line-clamp-none">
            Curated models, agents, and creative engines for builders.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.14} className="w-full max-w-2xl">
          <div className="glass-panel-strong rounded-2xl p-1.5 sm:p-2 flex flex-col sm:flex-row gap-2 glow-blue">
            <div className="flex-1 relative flex items-center min-h-[48px] sm:min-h-[52px]">
              <LucideIcon name="Search" className="absolute left-3.5 sm:left-4 w-4 h-4 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit?.()}
                placeholder="Search tools or categories..."
                className="w-full bg-transparent border-0 outline-none pl-10 sm:pl-11 pr-3 text-slate-800 text-[15px] font-normal placeholder:text-slate-400 tracking-tight"
              />
            </div>
            {onSearchSubmit && (
              <motion.button
                type="button"
                onClick={onSearchSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="btn-primary text-white text-sm font-medium px-5 py-3 min-h-[48px] rounded-xl shrink-0 w-full sm:w-auto touch-manipulation"
              >
                Search
              </motion.button>
            )}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.18} className="mt-3 hidden sm:block">
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

        <ScrollReveal delay={0.22} className="hidden md:block w-full max-w-2xl mt-12 lg:mt-16">
          <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-slate-200/80 w-full">
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
