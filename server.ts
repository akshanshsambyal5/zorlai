import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

import express from 'express';
import path from 'path';
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

/** Resolve dist/ (Vercel and `npm start` run with project root as cwd). */
function resolveDistPath(): string {
  return path.join(process.cwd(), 'dist');
}

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

let staticAttached = false;

async function attachProductionStatic() {
  if (staticAttached) return;
  const distPath = resolveDistPath();
  app.use(express.static(distPath, { index: false }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) next(err);
    });
  });
  staticAttached = true;
}

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    await attachProductionStatic();
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZorlAI Full Stack Server active on http://localhost:${PORT}`);
    if (!isSupabaseConfigured()) {
      console.warn('Warning: Supabase credentials missing. Set SUPABASE_URL and keys in .env.local');
    }
  });
}

export default app;

if (!process.env.VERCEL) {
  void startServer();
} else if (process.env.NODE_ENV === 'production') {
  void attachProductionStatic();
}
