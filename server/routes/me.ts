import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapToolFromDb } from '../lib/mappers';
import { optionalAuth, requireAuth } from '../middleware/auth';

const router = Router();

router.use(optionalAuth);

router.get('/liked-tools', requireAuth, async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const userId = req.user!.id;

    const { data, error } = await supabase
      .from('tool_votes')
      .select('tool_id, created_at, tools(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    const tools = (data || [])
      .map((row: { tools?: unknown }) => row.tools)
      .filter(Boolean)
      .map(mapToolFromDb);

    res.json({ tools });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch liked tools.';
    res.status(500).json({ error: message });
  }
});

export default router;
