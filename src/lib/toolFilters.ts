import { AITool } from '../types';
import { ensureArray } from './safeArray';
import { normalizeTool } from './normalizeTool';

function asToolList(tools: AITool[] | null | undefined): AITool[] {
  return ensureArray<AITool>(tools).map((t) => normalizeTool(t));
}

export type ToolsListMode = 'all' | 'trending' | 'new' | 'popular' | 'search';

export const SECTION_PREVIEW_LIMIT = 6;
export const LIST_PAGE_DEFAULT_LIMIT = 120;

/** Engagement velocity: votes + saves + editorial trending flag */
export function trendingScore(tool: AITool): number {
  return (
    tool.votes * 1.2 +
    tool.bookmarks * 2.5 +
    (tool.isTrending ? 280 : 0) +
    (tool.isFeatured ? 120 : 0) +
    tool.rating * 18 +
    tool.reviewsCount * 0.8
  );
}

/** Community love: saves and ratings weighted higher than raw votes */
export function popularScore(tool: AITool): number {
  return tool.bookmarks * 4 + tool.votes * 0.9 + tool.rating * 22 + tool.reviewsCount * 1.2;
}

function applyPricingFilter(tools: AITool[], pricing?: string): AITool[] {
  const list = asToolList(tools);
  if (!pricing || pricing === 'All') return list;
  return list.filter((t) => t.pricing === pricing);
}

function applySearchFilter(tools: AITool[], search?: string): AITool[] {
  if (!search?.trim()) return tools;
  const q = search.toLowerCase().trim();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}

function excludeIds(tools: AITool[], ids: Set<string>): AITool[] {
  if (ids.size === 0) return tools;
  return tools.filter((t) => !ids.has(t.id));
}

export function getTrendingTools(tools: AITool[], limit = LIST_PAGE_DEFAULT_LIMIT): AITool[] {
  return [...asToolList(tools)]
    .sort((a, b) => trendingScore(b) - trendingScore(a))
    .slice(0, limit);
}

export function getNewTools(tools: AITool[], limit = LIST_PAGE_DEFAULT_LIMIT): AITool[] {
  return [...asToolList(tools)]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit);
}

export function getPopularTools(tools: AITool[], limit = LIST_PAGE_DEFAULT_LIMIT): AITool[] {
  return [...asToolList(tools)]
    .sort((a, b) => popularScore(b) - popularScore(a))
    .slice(0, limit);
}

export function getExploreTools(tools: AITool[]): AITool[] {
  return [...asToolList(tools)].sort((a, b) => a.name.localeCompare(b.name));
}

export interface HomeToolSections {
  trending: AITool[];
  new: AITool[];
  popular: AITool[];
}

/** Home page previews — no duplicate cards across sections */
export function getHomeToolSections(tools: AITool[] | null | undefined, limit = SECTION_PREVIEW_LIMIT): HomeToolSections {
  const pool = asToolList(tools);
  const used = new Set<string>();

  const trending = getTrendingTools(pool, limit * 3)
    .filter((t) => {
      if (used.has(t.id)) return false;
      used.add(t.id);
      return true;
    })
    .slice(0, limit);

  const newPool = excludeIds(getNewTools(pool, limit * 4), used);
  const newest = newPool.slice(0, limit);
  newest.forEach((t) => used.add(t.id));

  const popularPool = excludeIds(getPopularTools(pool, limit * 4), used);
  const popular = popularPool.slice(0, limit);
  popular.forEach((t) => used.add(t.id));

  return { trending, new: newest, popular };
}

export function filterTools(
  tools: AITool[] | null | undefined,
  mode: ToolsListMode,
  options?: { search?: string; pricing?: string; limit?: number }
): AITool[] {
  let result = applyPricingFilter(asToolList(tools), options?.pricing);

  switch (mode) {
    case 'trending':
      result = getTrendingTools(result, options?.limit ?? LIST_PAGE_DEFAULT_LIMIT);
      break;
    case 'new':
      result = getNewTools(result, options?.limit ?? LIST_PAGE_DEFAULT_LIMIT);
      break;
    case 'popular':
      result = getPopularTools(result, options?.limit ?? LIST_PAGE_DEFAULT_LIMIT);
      break;
    case 'search':
      result = applySearchFilter(result, options?.search);
      result = [...result].sort((a, b) => popularScore(b) - popularScore(a));
      break;
    case 'all':
    default:
      result = applySearchFilter(getExploreTools(result), options?.search);
      break;
  }

  return result;
}
