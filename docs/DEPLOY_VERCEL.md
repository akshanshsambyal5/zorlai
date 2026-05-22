# Deploy ZorlAI on Vercel (static frontend)

ZorlAI deploys as a **static Vite SPA**. There is no Express `/api` on Vercel.

## How tools load in production

| Priority | Source | When |
|----------|--------|------|
| 1 | Express `/api/*` | Local dev only (`npm run dev`) |
| 2 | **Supabase** (browser) | Vercel when `VITE_SUPABASE_*` env vars are set |
| 3 | **Bundled catalog** | Always — 118+ tools in `src/data/aiToolsCatalog.ts` |

If Supabase env vars are missing, the site still shows tools from the built-in catalog.

## Vercel settings

| Setting | Value |
|---------|--------|
| Build Command | `npm run build` |
| Output Directory | `dist` |

## Required environment variables (for live Supabase data)

| Variable | Required on Vercel |
|----------|-------------------|
| `VITE_SUPABASE_URL` | Recommended |
| `VITE_SUPABASE_ANON_KEY` | Recommended |
| `VITE_APP_URL` | Yes — your production URL |

Do **not** set `VITE_USE_EXPRESS_API` on Vercel.

Optional server-only keys (`SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`) are not used by the static build.

## Supabase setup

1. Run migrations `001`–`004` in the SQL editor.
2. Run seed `003_seed_catalog.sql` (or `npm run seed` locally).
3. **Authentication → URL configuration**: Site URL = `VITE_APP_URL`, redirect URLs = `https://your-domain.vercel.app/**`

## Verify after deploy

1. Open the site — home should show **Trending**, **New**, and **Most loved** sections with cards.
2. Open browser DevTools → Network: you should **not** see successful JSON from `/api/tools` (expected on static hosting).
3. If tools are missing, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel and redeploy.

## Local development

```bash
npm run dev          # Express API + Vite (uses /api)
npm run build        # Static dist for Vercel
```

## Folder rules

- `index.html` at project root only
- No `api/` serverless folder for static deploy
