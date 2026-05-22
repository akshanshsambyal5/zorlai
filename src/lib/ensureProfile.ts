import type { User } from '@supabase/supabase-js';
import { getSupabase } from './supabase';

function resolveDisplayName(user: User): string {
  const meta = user.user_metadata || {};
  const name =
    meta.full_name ||
    meta.name ||
    meta.display_name ||
    meta.user_name;
  if (typeof name === 'string' && name.trim()) return name.trim();
  const email = user.email || '';
  return email.includes('@') ? email.split('@')[0] : 'Member';
}

function resolveEmail(user: User): string {
  return user.email || user.user_metadata?.email || '';
}

/** Ensures a row exists in public.profiles for the signed-in user (OAuth + email). */
export async function ensureUserProfile(user: User): Promise<void> {
  const supabase = getSupabase();
  const email = resolveEmail(user);
  if (!email) return;

  const displayName = resolveDisplayName(user);

  const { data: existing, error: selectError } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError && selectError.code !== 'PGRST116') {
    console.warn('[auth] profile lookup:', selectError.message);
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        email,
        display_name: displayName,
      } as never)
      .eq('id', user.id);

    if (updateError) {
      console.warn('[auth] profile update:', updateError.message);
    }
    return;
  }

  const { error: insertError } = await supabase.from('profiles').insert({
    id: user.id,
    email,
    display_name: displayName,
    is_admin: false,
  } as never);

  if (insertError) {
    console.warn('[auth] profile insert:', insertError.message);
  }
}
