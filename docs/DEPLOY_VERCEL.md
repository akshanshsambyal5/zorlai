# Deploy ZorlAI on Vercel (static frontend)

ZorlAI deploys to Vercel as a **static Vite SPA** (`dist/`). There is no `api/` serverless folder.

## Vercel settings

| Setting | Value |
|---------|--------|
| Framework Preset | Vite (or Other) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

`vercel.json` sets these and adds SPA rewrites so client-side routes work.

## Environment variables

Add in **Vercel → Settings → Environment Variables**:

| Variable | Required |
|----------|----------|
| `VITE_SUPABASE_URL` | Yes |
| `VITE_SUPABASE_ANON_KEY` | Yes |
| `VITE_APP_URL` | Yes — your production URL |

Optional (only if you add a separate API host later): `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`.

## Supabase auth

In Supabase **Authentication → URL configuration**:

- **Site URL**: your `VITE_APP_URL`
- **Redirect URLs**: `https://your-domain.vercel.app/**`

See [AUTH_SETUP.md](./AUTH_SETUP.md).

## Local full-stack (API + SPA)

Express API is for **local development**, not Vercel serverless:

```bash
npm run dev          # Vite + Express on :3000
npm run build:full   # dist/ + dist/server.cjs
npm start            # production server locally
```

## Folder rules

- `index.html` at **project root** only
- Do **not** add `api/index.ts` or `functions` in `vercel.json`
- Do not use `<link rel="canonical" href="/" />` in `index.html` (breaks Vite build)

## Troubleshooting

| Error | Fix |
|-------|-----|
| `functions doesn't match any Serverless Functions` | Remove `functions` and `api/` from project; use static `outputDirectory: dist` |
| `Could not resolve entry module index.html` | Keep `index.html` at repo root, not in `api/` |
| Routes 404 on refresh | Ensure SPA rewrite to `/index.html` in `vercel.json` |
| `/api/*` fails on Vercel | Expected for static deploy — use Supabase client or host API elsewhere |
