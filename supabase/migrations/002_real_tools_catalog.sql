-- ZorlAI: Real tools catalog overhaul
-- Adds logo_url, replaces categories. Run seed script for 118 tools: npm run seed

ALTER TABLE tools ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- Optional: run seed via CLI after this migration
COMMENT ON COLUMN tools.logo_url IS 'Favicon or brand image URL for tool card';
