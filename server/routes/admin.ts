import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';
import { mapSubmissionFromDb, mapToolFromDb } from '../lib/mappers';
import { optionalAuth, requireAuth, requireAdmin } from '../middleware/auth';
import { faviconFromUrl } from '../../src/data/catalogHelpers';

const router = Router();

router.use(optionalAuth, requireAuth, requireAdmin);

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

router.post('/submissions/:id/approve', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const id = req.params.id;

    const { data: submission, error: fetchError } = await supabase
      .from('tool_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !submission) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    if (submission.status !== 'pending') {
      return res.status(400).json({ error: 'Submission is not pending.' });
    }

    const toolId = slugify(submission.name) || `tool-${Date.now()}`;
    const parsedTags = submission.tags
      ? submission.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
      : ['AI'];

    const { data: tool, error: toolError } = await supabase
      .from('tools')
      .insert({
        id: toolId,
        slug: toolId,
        name: submission.name,
        tagline: submission.tagline,
        description: submission.description,
        icon: 'Sparkle',
        url: submission.url.startsWith('http') ? submission.url : `https://${submission.url}`,
        logo_url: faviconFromUrl(submission.url),
        category_id: submission.category_id,
        tags: parsedTags,
        votes: 1,
        bookmarks_count: 0,
        pricing: submission.pricing,
        rating: 4.5,
        reviews_count: 1,
        is_trending: true,
        is_featured: false,
        features: ['Community-approved directory entry', submission.tagline],
        status: 'published',
      })
      .select('*')
      .single();

    if (toolError) {
      return res.status(500).json({ error: toolError.message });
    }

    const { data: updated, error: updateError } = await supabase
      .from('tool_submissions')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    res.json({
      submission: mapSubmissionFromDb(updated),
      tool: mapToolFromDb(tool),
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to approve submission.' });
  }
});

router.post('/submissions/:id/reject', async (req, res) => {
  try {
    const supabase = getSupabaseAdmin();
    const id = req.params.id;

    const { data, error } = await supabase
      .from('tool_submissions')
      .update({ status: 'rejected', reviewed_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      return res.status(404).json({ error: error?.message || 'Submission not found.' });
    }

    res.json({ submission: mapSubmissionFromDb(data) });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to reject submission.' });
  }
});

export default router;
