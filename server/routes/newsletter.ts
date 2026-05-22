import { Router } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Valid email is required.' });
    }

    const normalized = email.trim().toLowerCase();
    const supabase = getSupabaseAdmin();

    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email: normalized }, { onConflict: 'email', ignoreDuplicates: true });

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to subscribe.' });
  }
});

export default router;
