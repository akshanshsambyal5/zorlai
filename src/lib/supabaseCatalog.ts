import { getSupabase, isSupabaseConfigured } from './supabase';
import { mapCategoryFromDb, mapToolFromDb } from './mappers';
import type { Database } from './database.types';
import { AITool, Category } from '../types';

type CategoryRow = Database['public']['Tables']['categories']['Row'];
type ToolRow = Database['public']['Tables']['tools']['Row'];
import { ensureArray } from './safeArray';
import { normalizeTool } from './normalizeTool';
import type { ToolsQuery } from './api';

export async function fetchToolsFromSupabase(query: ToolsQuery = {}): Promise<AITool[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabase();
  let dbQuery = supabase
    .from('tools')
    .select('*')
    .eq('status', 'published')
    .order('votes', { ascending: false });

  if (query.category) {
    dbQuery = dbQuery.eq('category_id', query.category);
  }

  if (query.pricing && query.pricing !== 'All') {
    dbQuery = dbQuery.eq('pricing', query.pricing);
  }

  if (query.trending) {
    dbQuery = dbQuery.or('is_trending.eq.true,votes.gt.300');
  }

  const { data, error } = await dbQuery;
  if (error) throw new Error(error.message);

  let tools = ensureArray<ToolRow>(data).map((row) => normalizeTool(mapToolFromDb(row)));

  if (query.search?.trim()) {
    const q = query.search.toLowerCase().trim();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return tools;
}

export async function fetchToolBySlugFromSupabase(slug: string): Promise<AITool | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .or(`slug.eq.${slug},id.eq.${slug}`)
    .eq('status', 'published')
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) return null;
  return normalizeTool(mapToolFromDb(data));
}

export async function fetchCategoriesFromSupabase(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];

  const supabase = getSupabase();

  const [{ data: categories, error: catError }, { data: tools, error: toolError }] =
    await Promise.all([
      supabase.from('categories').select('*').order('sort_order', { ascending: true }),
      supabase.from('tools').select('category_id').eq('status', 'published'),
    ]);

  if (catError) throw new Error(catError.message);
  if (toolError) throw new Error(toolError.message);

  const counts: Record<string, number> = {};
  for (const t of ensureArray<{ category_id: string }>(tools)) {
    counts[t.category_id] = (counts[t.category_id] || 0) + 1;
  }

  return ensureArray<CategoryRow>(categories).map((c) => mapCategoryFromDb(c, counts[c.id] || 0));
}
