import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapToolFromDb } from '../lib/mappers';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = Router();

router.use(optionalAuth);

router.get('/', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const userId = req.user!.id;

    const { data, error } = await supabase
      .from('bookmarks')
      .select('tool_id, tools(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    const bookmarks = (data || [])
      .map((row: any) => row.tools)
      .filter(Boolean)
      .map(mapToolFromDb);

    res.json({ bookmarks });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookmarks.' });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { toolId } = req.body;
    if (!toolId) return res.status(400).json({ error: 'toolId is required.' });

    const supabase = getSupabaseAdmin();
    const userId = req.user!.id;

    const { error } = await supabase.from('bookmarks').upsert(
      { user_id: userId, tool_id: toolId },
      { onConflict: 'user_id,tool_id', ignoreDuplicates: true }
    );

    if (error) return res.status(500).json({ error: error.message });

    const { data: toolRow } = await supabase.from('tools').select('bookmarks_count').eq('id', toolId).single();
    const tool = toolRow as { bookmarks_count?: number } | null;
    if (tool) {
      await supabase
        .from('tools')
        .update({ bookmarks_count: (tool.bookmarks_count || 0) + 1 })
        .eq('id', toolId);
    }

    res.status(201).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to add bookmark.' });
  }
});

router.delete('/:toolId', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const userId = req.user!.id;
    const toolId = req.params.toolId;

    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('user_id', userId)
      .eq('tool_id', toolId);

    if (error) return res.status(500).json({ error: error.message });

    const { data: toolRow } = await supabase.from('tools').select('bookmarks_count').eq('id', toolId).single();
    const tool = toolRow as { bookmarks_count?: number } | null;
    if (tool && (tool.bookmarks_count ?? 0) > 0) {
      await supabase
        .from('tools')
        .update({ bookmarks_count: (tool.bookmarks_count ?? 0) - 1 })
        .eq('id', toolId);
    }

    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to remove bookmark.' });
  }
});

export default router;
