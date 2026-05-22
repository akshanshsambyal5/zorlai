import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapToolFromDb } from '../lib/mappers';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = Router();

router.use(optionalAuth);

router.get('/', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    let query = supabase
      .from('tools')
      .select('*')
      .eq('status', 'published')
      .order('votes', { ascending: false });

    const { search, category, pricing, trending } = req.query;

    if (category && typeof category === 'string') {
      query = query.eq('category_id', category);
    }

    if (pricing && typeof pricing === 'string' && pricing !== 'All') {
      query = query.eq('pricing', pricing);
    }

    if (trending === 'true') {
      query = query.or('is_trending.eq.true,votes.gt.300');
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    let tools = (data || []).map(mapToolFromDb);

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase().trim();
      tools = tools.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    res.json({ tools });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch tools.' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const slug = req.params.slug;

    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .eq('status', 'published')
      .maybeSingle();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Tool not found.' });
    }

    res.json({ tool: mapToolFromDb(data) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch tool.' });
  }
});

router.post('/:id/vote', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const toolId = req.params.id;
    const userId = req.user!.id;

    const { data: existing } = await supabase
      .from('tool_votes')
      .select('id')
      .eq('user_id', userId)
      .eq('tool_id', toolId)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ error: 'You have already voted for this tool.' });
    }

    const { error: voteError } = await supabase.from('tool_votes').insert({
      user_id: userId,
      tool_id: toolId,
    });

    if (voteError) {
      return res.status(500).json({ error: voteError.message });
    }

    const { data: toolRow } = await supabase.from('tools').select('votes').eq('id', toolId).single();
    const newVotes = ((toolRow as { votes?: number } | null)?.votes ?? 0) + 1;

    const { data: updated, error: updateError } = await supabase
      .from('tools')
      .update({ votes: newVotes })
      .eq('id', toolId)
      .select('*')
      .single();

    if (updateError || !updated) {
      return res.status(500).json({ error: updateError?.message || 'Vote update failed.' });
    }

    res.json({ tool: mapToolFromDb(updated) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to vote.' });
  }
});

export default router;
