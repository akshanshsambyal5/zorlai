import { CATEGORY_SEEDS, TOOL_SEEDS } from '../data/aiToolsCatalog';
import type { ToolSeed } from '../data/catalogHelpers';
import { AITool, Category } from '../types';
import { normalizeTool } from './normalizeTool';
export interface CatalogQuery {
  search?: string;
  category?: string | null;
  pricing?: string;
  trending?: boolean;
}

function seedToTool(seed: ToolSeed): AITool {
  return normalizeTool({
    id: seed.id,
    name: seed.name,
    tagline: seed.tagline,
    description: seed.description,
    icon: seed.icon,
    logoUrl: seed.logo_url,
    url: seed.url,
    category: seed.category_id,
    tags: seed.tags,
    votes: seed.votes,
    bookmarks: Math.round(seed.votes * 0.35),
    pricing: seed.pricing,
    rating: seed.rating,
    reviewsCount: seed.reviews_count,
    isTrending: seed.is_trending,
    isFeatured: seed.is_featured,
    addedAt: '2026-01-15T12:00:00Z',
    features: seed.features,
  });
}

const FALLBACK_TOOLS: AITool[] = TOOL_SEEDS.map(seedToTool);

function filterFallbackTools(tools: AITool[], query: CatalogQuery = {}): AITool[] {
  let result = [...tools];

  if (query.category) {
    result = result.filter((t) => t.category === query.category);
  }

  if (query.pricing && query.pricing !== 'All') {
    result = result.filter((t) => t.pricing === query.pricing);
  }

  if (query.trending) {
    result = result.filter((t) => t.isTrending || t.votes > 300);
  }

  if (query.search?.trim()) {
    const q = query.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
    );
  }

  return result.sort((a, b) => b.votes - a.votes);
}

export function getFallbackTools(query: CatalogQuery = {}): AITool[] {
  return filterFallbackTools(FALLBACK_TOOLS, query);
}

export function getFallbackToolBySlug(slug: string): AITool | null {
  const match = FALLBACK_TOOLS.find((t) => t.id === slug || t.id === slug.replace(/\/$/, ''));
  return match ?? null;
}

export function getFallbackCategories(): Category[] {
  const counts: Record<string, number> = {};
  for (const t of FALLBACK_TOOLS) {
    counts[t.category] = (counts[t.category] || 0) + 1;
  }

  return CATEGORY_SEEDS.map((c) => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    description: c.description,
    count: counts[c.id] || 0,
  })).sort((a, b) => a.name.localeCompare(b.name));
}

export const FALLBACK_TOOL_COUNT = FALLBACK_TOOLS.length;
