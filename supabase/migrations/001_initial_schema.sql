-- ZorlAI Directory — initial schema
-- Run in Supabase SQL Editor or via CLI: supabase db push

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE pricing_tier AS ENUM ('Free', 'Freemium', 'Paid', 'Open Source');
CREATE TYPE submission_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE tool_status AS ENUM ('draft', 'published');

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  description TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tools
CREATE TABLE IF NOT EXISTS tools (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Sparkle',
  url TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  sub_category TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  votes INT NOT NULL DEFAULT 0,
  bookmarks_count INT NOT NULL DEFAULT 0,
  pricing pricing_tier NOT NULL DEFAULT 'Free',
  rating NUMERIC(2,1) NOT NULL DEFAULT 4.0,
  reviews_count INT NOT NULL DEFAULT 0,
  is_trending BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  features TEXT[] NOT NULL DEFAULT '{}',
  status tool_status NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_trending ON tools(is_trending) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_tools_search ON tools USING gin (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(tagline, '') || ' ' || coalesce(description, ''))
);

-- Bookmarks
CREATE TABLE IF NOT EXISTS bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, tool_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);

-- Tool votes (one per user per tool)
CREATE TABLE IF NOT EXISTS tool_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tool_id TEXT NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, tool_id)
);

-- Submissions
CREATE TABLE IF NOT EXISTS tool_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  pricing pricing_tier NOT NULL DEFAULT 'Freemium',
  tags TEXT NOT NULL DEFAULT '',
  submitted_by TEXT NOT NULL,
  status submission_status NOT NULL DEFAULT 'pending',
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submissions_status ON tool_submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_user ON tool_submissions(user_id);

-- Newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'is_admin')::boolean, FALSE)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tools_updated_at
  BEFORE UPDATE ON tools
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Categories: public read
CREATE POLICY "Categories are public"
  ON categories FOR SELECT USING (true);

-- Tools: public read published
CREATE POLICY "Published tools are public"
  ON tools FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all tools"
  ON tools FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Bookmarks
CREATE POLICY "Users view own bookmarks"
  ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own bookmarks"
  ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own bookmarks"
  ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Votes
CREATE POLICY "Users view own votes"
  ON tool_votes FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own votes"
  ON tool_votes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Submissions
CREATE POLICY "Anyone can submit tools"
  ON tool_submissions FOR INSERT WITH CHECK (true);

CREATE POLICY "Users view own submissions"
  ON tool_submissions FOR SELECT USING (
    auth.uid() = user_id
    OR submitted_by = (SELECT email FROM profiles WHERE id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

CREATE POLICY "Admins update submissions"
  ON tool_submissions FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = TRUE)
  );

-- Newsletter
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Seed categories
INSERT INTO categories (id, name, icon, description, sort_order) VALUES
  ('code-dev', 'Code & DevTools', 'Code2', 'Autonomous agents, codebase synthesis, and terminal assistants.', 1),
  ('image-design', 'Generative Design', 'Sparkles', 'High-fidelity image synthesizers, standard vector models, and infinite UX canvases.', 2),
  ('video-motion', 'Video & Motion', 'Video', 'Text-to-video cinemorphosis, multi-frame consistency generators, and neural avatars.', 3),
  ('voice-sound', 'Voice & Sound', 'Radio', 'Neural speech voice synthesis, high-definition orchestrations, and vocal clones.', 4),
  ('text-agents', 'Agents & Writing', 'Brain', 'Multimodal reasoning setups, self-correcting agents, and editorial copy engines.', 5),
  ('productivity-search', 'Cognitive Engine', 'Activity', 'Neural indexing search, workspace semantic layers, and automated schedule optimizers.', 6)
ON CONFLICT (id) DO NOTHING;

-- Seed tools
INSERT INTO tools (id, slug, name, tagline, description, icon, url, category_id, sub_category, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status, created_at) VALUES
  ('neuro-synth', 'neuro-synth', 'NeuroSynth AI', 'Hyper-resolution real-time neural texture and image synthesize engine.', 'Create gorgeous textures, game environments, and display layouts in high-fidelity 4K output utilizing latent diffusion cascades directly on the browser.', 'Palette', 'https://neurosynth.zorl.ai', 'image-design', 'Text to Texture', ARRAY['Diffusion','3D Asset','Game Dev','Imagen'], 428, 184, 'Freemium', 4.8, 32, TRUE, TRUE, ARRAY['In-browser latent diffusion cascades','Ultra-dense 16K vector outputs','Lighting and normal map autogeneration','Realtime procedural adjustment dials'], 'published', '2026-05-10T08:00:00Z'),
  ('nexus-coder', 'nexus-coder', 'NexusCoder', 'Fully autonomous multi-file terminal synthesizer and code refactoring agent.', 'NexusCoder connects with your repository terminal, reads build diagnostic traces, and synthesizes single-sentence commands directly into fully test-vetted patch sets.', 'Terminal', 'https://nexuscoder.io', 'code-dev', 'Autonomous Agents', ARRAY['Refactoring','TypeScript','CLI Agent','Self-Vetting'], 812, 395, 'Freemium', 4.9, 114, TRUE, TRUE, ARRAY['Interactive build log diagnostics integration','High-speed Rust/Go syntax verification checks','Staggered auto-rollback safety networks','Direct GitHub repository status synchronizer'], 'published', '2026-05-12T09:30:00Z'),
  ('motion-vibe', 'motion-vibe', 'MotionVibe v3', 'Physics-consistent cinemorphosis and multi-camera consistency generator.', 'Transform regular text paragraphs into majestic 60fps moving landscape captures with impeccable physical motion, fluid dynamics, and shadow-casting sunlight fidelity.', 'Flame', 'https://motionvibe.app', 'video-motion', 'Text to Video', ARRAY['60FPS Video','Physics Synthesizer','3D Kinematics','Cinematic'], 295, 142, 'Paid', 4.7, 19, FALSE, TRUE, ARRAY['Fully consistent multiple-perspective rendering','Active volumetric smoke and fluid dynamics solvers','Up to 30-second standard movie clips','Precision keyframe animation controls'], 'published', '2026-05-18T14:20:00Z'),
  ('echo-clone', 'echo-clone', 'EchoClone', 'Premium ultra-low latency voice synthesizers and acoustic environment replicators.', 'EchoClone maps vocal recordings in 3 seconds to generate hyper-realistic audio, accounting for room acoustics, distance dynamics, and emotional voice modulation.', 'Volume2', 'https://echoclone.audio', 'voice-sound', 'Voice Synthesis', ARRAY['Acoustic Modeling','Voice Cloning','Podcast AI','Realtime'], 318, 167, 'Freemium', 4.6, 22, TRUE, FALSE, ARRAY['Instant voice cloning with a 3-second segment sample','Dynamic physical room acoustic simulation filters','Support for 48 standard regional languages','Interactive emotional state controls (cheerful, grave, excited)'], 'published', '2026-05-14T11:15:00Z'),
  ('perplexity-scout', 'perplexity-scout', 'Perplexity Scout', 'Real-time structural knowledge search and query grounding navigator.', 'Scout parses complex semantic questions, performs multiple concurrent parallel searches across trusted papers, and streams annotated structural summaries.', 'Compass', 'https://perplexity.ai', 'productivity-search', 'Neural Search', ARRAY['Grounding','Web Search','Citations','Knowledge Graphs'], 654, 289, 'Free', 4.9, 88, TRUE, FALSE, ARRAY['Simultaneous parallel search streams','High-density citations and journal verification','Automatic flowcharts and mental maps generator','Deep follow-up query suggestions'], 'published', '2026-05-08T10:00:00Z'),
  ('omega-reason', 'omega-reason', 'OmegaReason', 'Multi-hop reasoning engine designed for deep code logic and mathematical proofs.', 'Solve complex engineering algorithms or calculate elaborate multi-variable mathematical proofs. Displays its thinking steps with transparent, tree-of-thought analysis.', 'BrainCircuit', 'https://omegareason.ai', 'text-agents', 'Logic & Reasoning', ARRAY['MCTS Coding','Tree of Thought','STEM Solver','Verification'], 520, 247, 'Paid', 4.9, 45, FALSE, FALSE, ARRAY['Explains reasoning steps using Tree of Thought layers','Direct mathematical proof compilation checks','Fully compliant sandbox with system variables and imports','Excellent performance on high-stress logical queries'], 'published', '2026-05-05T09:00:00Z'),
  ('fluid-designer', 'fluid-designer', 'Fluid Designer', 'Infinite design canvas that turns wireframes into pixel-perfect Figma prototypes.', 'Bridges raw architectural sketches and wireframes into custom react-ready styling layouts, auto-populating tailwind colors and consistent spacing metrics.', 'Layers', 'https://fluid.design', 'image-design', 'UI/UX Generation', ARRAY['Tailwind CSS','Figma Sync','Wireframe Compiler','Design System'], 390, 182, 'Freemium', 4.5, 30, FALSE, TRUE, ARRAY['Converts wireframe sketches to neat Tailwind structures','Automatic color consistency and component design system','Two-way interactive Figma workspace sync','Clean modular standard React code exports'], 'published', '2026-05-19T16:00:00Z'),
  ('symphony-synth', 'symphony-synth', 'Symphony Synth', 'Interactive multi-instrument audio orchestrations from simple textual descriptions.', 'Create gorgeous classical compositions, futuristic synthwave, or lo-fi melodies with complete separate control over percussion, lead synth, and atmospheric background pads.', 'Speech', 'https://symphony.zorl.ai', 'voice-sound', 'Music Creators', ARRAY['Instrument Control','Orchestration','Synthwave','Audio Blob'], 210, 98, 'Freemium', 4.4, 12, FALSE, FALSE, ARRAY['Multi-track separate instrument visualizer','Cinematic orchestral and synth preset libraries','Direct studio-standard MIDI file export controls','Fully licensed royalty-free production sharing'], 'published', '2026-05-20T12:00:00Z'),
  ('glitch-compiler', 'glitch-compiler', 'Glitch Compiler', 'Instant web app builder that compiles text templates into live browser frames.', 'Enter a conceptual app specification and see a live editable React preview run. Supports Tailwind CSS, modular structures, and standard micro-state routers.', 'Cpu', 'https://glitch.zorl.ai', 'code-dev', 'Instant Builders', ARRAY['React SPA','Sandbox','Hot Module Edit','App Generator'], 680, 320, 'Free', 4.8, 76, TRUE, TRUE, ARRAY['Compiles direct app scripts in under 4 seconds','Clean interactive sandbox view framing','Custom pre-installed package libraries support','Deploy single-click public preview URLs'], 'published', '2026-05-21T15:20:00Z'),
  ('chrono-task', 'chrono-task', 'ChronoTask AI', 'Autonomous workspace scheduling layers and cognitive routine optimizers.', 'Enters calendars, notes, emails, and syncs optimal micro-task focus workflows, matching individual energy rhythms, meeting blocks, and project milestones.', 'Calendar', 'https://chronotask.io', 'productivity-search', 'Focus & Productivity', ARRAY['Calendar Sync','Workspace Agent','Microtasks','Energy Rhythms'], 345, 148, 'Freemium', 4.5, 20, FALSE, FALSE, ARRAY['Active machine-learning energy state analyzer','Clever microtask scheduler and calendar blocks','Automatic mail response drafting helper','Integrated minimalist task board dashboard'], 'published', '2026-05-15T09:40:00Z')
ON CONFLICT (id) DO NOTHING;
