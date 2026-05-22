import { AITool } from '../types';

export type ToolsListMode = 'all' | 'trending' | 'new' | 'popular' | 'search';

export function filterTools(
  tools: AITool[],
  mode: ToolsListMode,
  options?: { search?: string; pricing?: string }
): AITool[] {
  let result = [...tools];

  if (options?.pricing && options.pricing !== 'All') {
    result = result.filter((t) => t.pricing === options.pricing);
  }

  if (mode === 'trending') {
    result = result.filter((t) => t.isTrending || t.votes > 300);
    result.sort((a, b) => b.votes - a.votes);
    return result;
  }

  if (mode === 'new') {
    result.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
    return result.slice(0, 60);
  }

  if (mode === 'popular') {
    result.sort((a, b) => b.votes - a.votes);
    return result;
  }

  if (mode === 'search' && options?.search?.trim()) {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
    );
    return result;
  }

  return result;
}
