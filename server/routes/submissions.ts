import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapSubmissionFromDb } from '../lib/mappers';
import { optionalAuth } from '../middleware/auth';

const router = Router();

router.use(optionalAuth);

router.get('/', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    let query = supabase.from('tool_submissions').select('*').order('created_at', { ascending: false });

    if (req.user?.isAdmin) {
      // admins see all
    } else if (req.user) {
      query = query.or(`user_id.eq.${req.user.id},submitted_by.eq.${req.user.email}`);
    } else {
      return res.json({ submissions: [] });
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });

    res.json({ submissions: (data || []).map(mapSubmissionFromDb) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch submissions.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, tagline, description, url, category, pricing, tags, submittedBy } = req.body;

    if (!name || !url || !submittedBy) {
      return res.status(400).json({ error: 'name, url, and submittedBy are required.' });
    }

    const normalizedUrl = String(url).trim();
    if (normalizedUrl === '#' || !normalizedUrl.includes('.')) {
      return res.status(400).json({ error: 'A valid official website URL is required.' });
    }
    const safeUrl = normalizedUrl.startsWith('http') ? normalizedUrl : `https://${normalizedUrl}`;

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('tool_submissions')
      .insert({
        name,
        tagline: tagline || '',
        description: description || '',
        url: safeUrl,
        category_id: category || 'code-dev',
        pricing: pricing || 'Freemium',
        tags: tags || '',
        submitted_by: submittedBy,
        user_id: req.user?.id ?? null,
      })
      .select('*')
      .single();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ submission: mapSubmissionFromDb(data) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to submit tool.' });
  }
});

export default router;
