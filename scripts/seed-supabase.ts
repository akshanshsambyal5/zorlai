/**
 * Seeds ZorlAI categories and tools into Supabase.
 * Run: npm run seed
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { CATEGORY_SEEDS, TOOL_SEEDS } from '../src/data/aiToolsCatalog';

dotenv.config({ path: '.env.local' });
dotenv.config();

const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  console.error('Alternatively run migration SQL: supabase/migrations/003_seed_catalog.sql in Supabase SQL Editor');
  console.error('Generate SQL with: npx tsx scripts/generate-sql-seed.ts');
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function main() {
  console.log(`Seeding ${CATEGORY_SEEDS.length} categories and ${TOOL_SEEDS.length} tools...`);

  // Clear dependent rows first
  await supabase.from('bookmarks').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('tool_votes').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  const { error: delTools } = await supabase.from('tools').delete().neq('id', '');
  if (delTools) console.warn('Delete tools:', delTools.message);
  const { error: delCats } = await supabase.from('categories').delete().neq('id', '');
  if (delCats) console.warn('Delete categories:', delCats.message);

  const { error: catError } = await supabase.from('categories').insert(CATEGORY_SEEDS);
  if (catError) {
    console.error('Categories insert failed:', catError.message);
    process.exit(1);
  }
  console.log('Categories inserted.');

  const batchSize = 25;
  for (let i = 0; i < TOOL_SEEDS.length; i += batchSize) {
    const batch = TOOL_SEEDS.slice(i, i + batchSize).map((t) => ({
      id: t.id,
      slug: t.slug,
      name: t.name,
      tagline: t.tagline,
      description: t.description,
      icon: t.icon,
      url: t.url,
      logo_url: t.logo_url,
      category_id: t.category_id,
      tags: t.tags,
      votes: t.votes,
      bookmarks_count: 0,
      pricing: t.pricing,
      rating: t.rating,
      reviews_count: t.reviews_count,
      is_trending: t.is_trending,
      is_featured: t.is_featured,
      features: t.features,
      status: 'published' as const,
    }));

    const { error } = await supabase.from('tools').insert(batch);
    if (error) {
      console.error(`Tools batch ${i / batchSize + 1} failed:`, error.message);
      process.exit(1);
    }
    console.log(`Tools batch ${i / batchSize + 1} inserted (${batch.length} rows).`);
  }

  console.log('Seed complete.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
