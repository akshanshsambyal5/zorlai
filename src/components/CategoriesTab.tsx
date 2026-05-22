import { Category, AITool } from '../types';
import { CategoryCard } from './categories/CategoryCard';
import { ScrollReveal } from './ui/ScrollReveal';
import { categoriesIndexPath, navigate } from '../lib/router';
import { MagneticButton } from './ui/MagneticButton';
import { ensureArray } from '../lib/safeArray';

interface CategoriesTabProps {
  categories: Category[];
  tools: AITool[];
  toolsCountByCategory: Record<string, number>;
}

export function CategoriesTab({ categories, tools, toolsCountByCategory }: CategoriesTabProps) {
  const trendingByCategory: Record<string, number> = {};
  for (const t of ensureArray(tools)) {
    if (t.isTrending || t.votes > 300) {
      trendingByCategory[t.category] = (trendingByCategory[t.category] || 0) + 1;
    }
  }

  return (
    <div className="py-8">
      <ScrollReveal className="text-center max-w-xl mx-auto mb-10">
        <h2 className="font-display text-3xl font-bold text-white tracking-tight mb-3">Browse by category</h2>
        <p className="text-slate-400 text-sm mb-6">Select a category to open its dedicated directory page</p>
        <MagneticButton variant="primary" onClick={() => navigate(categoriesIndexPath())}>
          View all categories
        </MagneticButton>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {categories.slice(0, 6).map((cat, i) => (
          <div key={cat.id}>
            <CategoryCard
              category={cat}
              toolCount={toolsCountByCategory[cat.id] ?? cat.count ?? 0}
              trendingCount={trendingByCategory[cat.id] ?? 0}
              onNavigate={navigate}
              delay={i * 0.05}
            />
          </div>
        ))}
      </div>

      {categories.length > 6 && (
        <div className="text-center mt-8">
          <MagneticButton variant="ghost" onClick={() => navigate(categoriesIndexPath())}>
            See all {categories.length} categories →
          </MagneticButton>
        </div>
      )}
    </div>
  );
}
