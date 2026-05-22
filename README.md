# ZorlAI — AI Tools Directory

Discover free AI tools online and visit their official websites. Full-stack directory powered by **React**, **Express**, and **Supabase**.

## Features

- **Authentication** — Email/password, Google & Facebook OAuth via Supabase Auth ([setup guide](docs/AUTH_SETUP.md))
- **Database** — PostgreSQL with RLS policies
- **Categories** — Dynamic category grid with live tool counts
- **Tools** — Published directory with search, pricing, and trending filters
- **Bookmarks** — Per-user saved tools (requires sign-in)
- **Submissions** — Community tool proposals with admin moderation
- **Admin dashboard** — Approve/reject submissions (admin profiles only)
- **Tool detail pages** — Shareable URLs via `?tool=slug`
- **AI Scout** — Gemini-powered recommendations from live catalog

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env.local` and fill in your keys
3. Run migrations in **SQL Editor** (in order):

   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_real_tools_catalog.sql`
   - `supabase/migrations/003_seed_catalog.sql` (118 real AI tools + 10 categories)

   Or regenerate seed SQL: `npm run seed:sql` then run `003_seed_catalog.sql`.

4. Add your **service role key** to `.env.local` (required for API routes)

5. Enable **Email**, **Google**, and **Facebook** providers — see [docs/AUTH_SETUP.md](docs/AUTH_SETUP.md)

6. Promote an admin user after first signup:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'your@email.com';
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL (no `/rest/v1` suffix) |
| `VITE_SUPABASE_ANON_KEY` | Public anon key (client) |
| `SUPABASE_URL` | Same URL (server) |
| `SUPABASE_ANON_KEY` | Anon key (server auth verification) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server admin operations) |
| `GEMINI_API_KEY` | Optional — AI Scout neural routing |
| `PORT` | Server port (default 3000) |
| `VITE_APP_URL` | Public app URL for OAuth/password reset redirects |
| `APP_URL` | Same as above (server reference) |

## API Routes

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/tools` | List tools (`?search`, `?category`, `?pricing`, `?trending`) |
| GET | `/api/tools/:slug` | Tool detail |
| POST | `/api/tools/:id/vote` | Upvote (auth required) |
| GET | `/api/categories` | Categories with counts |
| GET/POST | `/api/bookmarks` | User bookmarks (auth) |
| GET | `/api/me/liked-tools` | Tools the user voted for (auth) |
| DELETE | `/api/bookmarks/:toolId` | Remove bookmark |
| GET/POST | `/api/submissions` | Tool submissions |
| POST | `/api/admin/submissions/:id/approve` | Admin approve |
| POST | `/api/admin/submissions/:id/reject` | Admin reject |
| POST | `/api/newsletter` | Newsletter subscribe |
| POST | `/api/gemini/generate` | AI Scout query |

## Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  lib/          Supabase client, API helpers, mappers
  hooks/        useAuth, useTools, useCategories, useBookmarks, useSubmissions
  context/      AuthProvider
  components/   UI (design preserved)
server/
  routes/       Express API routes
  middleware/   JWT auth helpers
supabase/
  migrations/   Database schema + seed data
```
