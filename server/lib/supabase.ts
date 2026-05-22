import { createClient, SupabaseClient } from '@supabase/supabase-js';

type DbClient = SupabaseClient<any>;

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
}

function getEnv() {
  return {
    url: normalizeSupabaseUrl(
      process.env.SUPABASE_URL ||
        process.env.VITE_SUPABASE_URL ||
        process.env.NEXT_PUBLIC_SUPABASE_URL ||
        ''
    ),
    anonKey:
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      '',
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  };
}

let adminClient: DbClient | null = null;
let anonClient: DbClient | null = null;

export function isSupabaseConfigured(): boolean {
  const { url, anonKey, serviceKey } = getEnv();
  return Boolean(url && (serviceKey || anonKey));
}

export function getSupabaseAdmin(): DbClient {
  if (!adminClient) {
    const { url, anonKey, serviceKey } = getEnv();
    const key = serviceKey || anonKey;
    if (!url || !key) {
      throw new Error('Supabase server credentials are not configured.');
    }
    adminClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return adminClient;
}

export function getSupabaseAnon(): DbClient {
  if (!anonClient) {
    const { url, anonKey } = getEnv();
    if (!url || !anonKey) {
      throw new Error('Supabase anon key is not configured.');
    }
    anonClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return anonClient;
}

export function getSupabaseForUser(accessToken?: string): DbClient {
  const { url, anonKey } = getEnv();
  if (accessToken) {
    return createClient(url, anonKey, {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return getSupabaseAnon();
}
