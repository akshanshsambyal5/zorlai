/** Presentation-only visuals keyed by category id from Supabase (not category data). */
export interface CategoryVisual {
  gradient: string;
  glow: string;
  image: string;
  accent: string;
}

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  'image-generation': {
    gradient: 'from-violet-600/40 via-fuchsia-600/25 to-indigo-900/10',
    glow: 'rgba(139,92,246,0.35)',
    accent: 'text-violet-300',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  },
  'video-generation': {
    gradient: 'from-cyan-600/35 via-blue-600/20 to-slate-900/10',
    glow: 'rgba(34,211,238,0.3)',
    accent: 'text-cyan-300',
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
  },
  'ai-writing': {
    gradient: 'from-amber-600/30 via-orange-600/18 to-slate-900/10',
    glow: 'rgba(251,191,36,0.28)',
    accent: 'text-amber-300',
    image:
      'https://images.unsplash.com/photo-1455390583460-4066fb1c7a6b?auto=format&fit=crop&w=1200&q=80',
  },
  coding: {
    gradient: 'from-emerald-600/30 via-teal-600/20 to-slate-900/10',
    glow: 'rgba(16,185,129,0.28)',
    accent: 'text-emerald-300',
    image:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  chatbots: {
    gradient: 'from-indigo-600/35 via-violet-600/25 to-slate-900/10',
    glow: 'rgba(99,102,241,0.32)',
    accent: 'text-indigo-300',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  },
  productivity: {
    gradient: 'from-amber-600/25 via-orange-600/15 to-slate-900/10',
    glow: 'rgba(245,158,11,0.25)',
    accent: 'text-amber-300',
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80',
  },
  'voice-ai': {
    gradient: 'from-rose-600/30 via-pink-600/20 to-slate-900/10',
    glow: 'rgba(244,63,94,0.28)',
    accent: 'text-rose-300',
    image:
      'https://images.unsplash.com/photo-1478737270239-2f1b87cf8b7c?auto=format&fit=crop&w=1200&q=80',
  },
  'music-ai': {
    gradient: 'from-purple-600/35 via-violet-600/20 to-slate-900/10',
    glow: 'rgba(168,85,247,0.3)',
    accent: 'text-purple-300',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
  },
  'research-ai': {
    gradient: 'from-sky-600/30 via-cyan-600/20 to-slate-900/10',
    glow: 'rgba(14,165,233,0.28)',
    accent: 'text-sky-300',
    image:
      'https://images.unsplash.com/photo-1532619675605-1ede6c7edf48?auto=format&fit=crop&w=1200&q=80',
  },
  'marketing-ai': {
    gradient: 'from-orange-600/28 via-red-600/18 to-slate-900/10',
    glow: 'rgba(249,115,22,0.28)',
    accent: 'text-orange-300',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  'design-ai': {
    gradient: 'from-fuchsia-600/30 via-violet-600/22 to-slate-900/10',
    glow: 'rgba(217,70,239,0.28)',
    accent: 'text-fuchsia-300',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
  },
};

export function getCategoryVisual(categoryId: string): CategoryVisual {
  return (
    CATEGORY_VISUALS[categoryId] ?? {
      gradient: 'from-violet-600/30 via-indigo-600/20 to-slate-900/10',
      glow: 'rgba(139,92,246,0.25)',
      accent: 'text-violet-300',
      image:
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80',
    }
  );
}
