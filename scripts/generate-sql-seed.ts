/** Generates supabase/migrations/003_seed_catalog.sql — run in Supabase SQL Editor */
import { writeFileSync } from 'fs';
import { join } from 'path';
import { CATEGORY_SEEDS, TOOL_SEEDS } from '../src/data/aiToolsCatalog';

function esc(s: string) {
  return s.replace(/'/g, "''");
}

function arr(a: string[]) {
  return `ARRAY[${a.map((x) => `'${esc(x)}'`).join(',')}]`;
}

let sql = `-- Auto-generated catalog seed (${TOOL_SEEDS.length} tools)\n`;
sql += `ALTER TABLE tools ADD COLUMN IF NOT EXISTS logo_url TEXT;\n\n`;
sql += `DELETE FROM bookmarks;\nDELETE FROM tool_votes;\nDELETE FROM tools;\nDELETE FROM categories;\n\n`;

for (const c of CATEGORY_SEEDS) {
  sql += `INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('${c.id}', '${esc(c.name)}', '${esc(c.icon)}', '${esc(c.description)}', ${c.sort_order}) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;\n`;
}

sql += '\n';

for (const t of TOOL_SEEDS) {
  const bookmarks = Math.max(0, Math.round(t.votes * (0.14 + (t.id.length % 9) * 0.035)));
  sql += `INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  '${esc(t.id)}', '${esc(t.slug)}', '${esc(t.name)}', '${esc(t.tagline)}', '${esc(t.description)}', '${esc(t.icon)}', '${esc(t.url)}', '${esc(t.logo_url)}', '${esc(t.category_id)}', ${arr(t.tags)}, ${t.votes}, ${bookmarks}, '${t.pricing}', ${t.rating}, ${t.reviews_count}, ${t.is_trending}, ${t.is_featured}, ${arr(t.features)}, 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';\n`;
}

const out = join(process.cwd(), 'supabase', 'migrations', '003_seed_catalog.sql');
writeFileSync(out, sql);
console.log(`Wrote ${out} (${TOOL_SEEDS.length} tools)`);
