import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapCategoryFromDb } from '../lib/mappers';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const supabase = getSupabaseAdmin();

    const [{ data: categories, error: catError }, { data: tools, error: toolError }] =
      await Promise.all([
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
        supabase.from('tools').select('category_id').eq('status', 'published'),
      ]);

    if (catError) return res.status(500).json({ error: catError.message });
    if (toolError) return res.status(500).json({ error: toolError.message });

    const counts: Record<string, number> = {};
    for (const t of tools || []) {
      counts[t.category_id] = (counts[t.category_id] || 0) + 1;
    }

    const mapped = (categories || []).map((c) => mapCategoryFromDb(c, counts[c.id] || 0));
    res.json({ categories: mapped });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch categories.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const slug = req.params.slug;

    const { data: category, error: catError } = await supabase
      .from('categories')
      .select('*')
      .eq('id', slug)
      .maybeSingle();

    if (catError) return res.status(500).json({ error: catError.message });
    if (!category) return res.status(404).json({ error: 'Category not found.' });

    const { count } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', slug)
      .eq('status', 'published');

    res.json({ category: mapCategoryFromDb(category, count ?? 0) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch category.' });
  }
});

export default router;
