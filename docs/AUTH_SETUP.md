# ZorlAI — Supabase Auth Setup

Complete guide for email/password, Google OAuth, and Facebook OAuth.

## 1. Enable providers in Supabase

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **Providers**.

### Email / password

1. Enable **Email** provider.
2. (Recommended for production) Enable **Confirm email** if you want verified signups.
3. Set **Site URL** under **Authentication** → **URL Configuration**:
   - Local: `http://localhost:3000`
   - Production: `https://zorlai.xyz` (or `https://www.zorlai.xyz` if that is your primary domain)

### Redirect URLs

Under **Authentication** → **URL Configuration**, add these to **Redirect URLs**:

```
http://localhost:3000/**
https://zorlai.xyz/**
https://www.zorlai.xyz/**
```

The app uses `window.location.origin` at runtime for OAuth `redirectTo`, so both apex and `www` work when allowlisted.

OAuth and password reset links must match an allowed redirect URL.

## 2. Google OAuth

### Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services** → **Credentials**.
2. Create **OAuth 2.0 Client ID** (Web application).
3. **Authorized JavaScript origins:**
   - `http://localhost:3000`
   - `https://zorlai.xyz`
   - `https://www.zorlai.xyz`
4. **Authorized redirect URIs** (use your Supabase project ref):

```
https://<PROJECT_REF>.supabase.co/auth/v1/callback
```

### Supabase

1. **Authentication** → **Providers** → **Google** → Enable.
2. Paste **Client ID** and **Client Secret** from Google.
3. Save.

## 3. Facebook OAuth

### Meta for Developers

1. Go to [developers.facebook.com](https://developers.facebook.com/) → **My Apps** → Create app (Consumer).
2. Add product **Facebook Login**.
3. **Facebook Login** → **Settings** → **Valid OAuth Redirect URIs:**

```
https://<PROJECT_REF>.supabase.co/auth/v1/callback
```

4. Note **App ID** and **App Secret** from **Settings** → **Basic**.

### Supabase

1. **Authentication** → **Providers** → **Facebook** → Enable.
2. Paste **Facebook App ID** (Client ID) and **App Secret**.
3. Save.

## 4. Environment variables

Copy `.env.example` to `.env.local`:

```env
VITE_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

SUPABASE_URL=https://<PROJECT_REF>.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

VITE_APP_URL=http://localhost:3000
# Production (Vercel): https://zorlai.xyz — optional; browser uses window.location.origin in prod
```

`VITE_APP_URL` is a fallback for SSR/build; **in the browser, OAuth always uses the current origin** (`zorlai.xyz` or `www.zorlai.xyz`).

## 5. Database profile trigger

Run migrations in order:

- `001_initial_schema.sql` — `profiles` table + `on_auth_user_created` trigger
- `004_profile_insert_policy.sql` — **required for Google OAuth** so the client can create a profile if the trigger did not run

Without `004`, Google users may sign in but profile rows fail to save (navbar stays on “Sign in”).

## 6. Auth routes in the app

| URL | Page |
|-----|------|
| `/login` | Sign in (email + Google + Facebook) |
| `/signup` | Create account |
| `/forgot-password` | Request reset email |
| `/reset-password` | Set new password (from email link) |
| `/dashboard` | Protected — bookmarks, liked tools, submissions |

## 7. Protected API routes (server)

These require `Authorization: Bearer <access_token>`:

- `GET/POST/DELETE /api/bookmarks`
- `POST /api/tools/:id/vote`
- `GET /api/me/liked-tools`
- `GET /api/submissions` (user-scoped)
- `POST /api/admin/*` (admin profile)

## 8. Promote admin user

After first signup:

```sql
UPDATE profiles SET is_admin = true WHERE email = 'you@example.com';
```

## 9. Troubleshooting

| Issue | Fix |
|-------|-----|
| OAuth redirects to wrong URL | Add `https://zorlai.xyz/**` and `https://www.zorlai.xyz/**` in Supabase; do not set `VITE_APP_URL` to localhost on Vercel |
| Google works locally, not in prod | Rebuild after fixing env; Google redirect URI must be `https://<ref>.supabase.co/auth/v1/callback` only |
| `Invalid login credentials` | Wrong password or unconfirmed email |
| Reset link expired | Request a new link from `/forgot-password` |
| 401 on bookmarks/votes | Sign in; ensure anon key and URL are correct |
| Facebook login blocked | App must be Live or add test users in Meta dashboard |
