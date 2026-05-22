import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import toolsRouter from './server/routes/tools';
import categoriesRouter from './server/routes/categories';
import bookmarksRouter from './server/routes/bookmarks';
import submissionsRouter from './server/routes/submissions';
import adminRouter from './server/routes/admin';
import newsletterRouter from './server/routes/newsletter';
import geminiRouter from './server/routes/gemini';
import meRouter from './server/routes/me';
import { isSupabaseConfigured } from './server/lib/supabase';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    supabase: isSupabaseConfigured(),
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/tools', toolsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/gemini', geminiRouter);
app.use('/api/me', meRouter);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZorlAI Full Stack Server active on http://localhost:${PORT}`);
    if (!isSupabaseConfigured()) {
      console.warn('Warning: Supabase credentials missing. Set SUPABASE_URL and keys in .env.local');
    }
  });
}

startServer();
