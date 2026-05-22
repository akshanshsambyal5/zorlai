-- Auto-generated catalog seed (153 tools)
ALTER TABLE tools ADD COLUMN IF NOT EXISTS logo_url TEXT;

DELETE FROM bookmarks;
DELETE FROM tool_votes;
DELETE FROM tools;
DELETE FROM categories;

INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('image-generation', 'Image Generation', 'Palette', 'AI image creators, editors, and upscalers.', 1) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('video-generation', 'Video Generation', 'Video', 'Text-to-video, avatars, and video editing AI.', 2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('ai-writing', 'AI Writing', 'PenLine', 'AI writing assistants, editors, and long-form copy tools.', 3) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('coding', 'Coding', 'Code2', 'AI coding assistants, agents, and app builders.', 4) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('chatbots', 'Chatbots', 'Brain', 'Conversational AI assistants and LLM chat apps.', 5) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('productivity', 'Productivity', 'Calendar', 'Notes, meetings, and workflow automation.', 6) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('voice-ai', 'Voice AI', 'Volume2', 'Voice cloning, TTS, transcription, and dubbing.', 7) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('music-ai', 'Music AI', 'Speech', 'AI music composition and audio generation.', 8) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('research-ai', 'Research AI', 'Compass', 'Literature search, citations, and academic tools.', 9) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('marketing-ai', 'Marketing AI', 'Activity', 'Copy, ads, SEO, and social content generation.', 10) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;
INSERT INTO categories (id, name, icon, description, sort_order) VALUES ('design-ai', 'Design AI', 'Layers', 'UI, branding, presentations, and design automation.', 11) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, icon = EXCLUDED.icon, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;

INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'midjourney', 'midjourney', 'Midjourney', 'High-quality AI art from text prompts.', 'Midjourney generates stunning images from natural language prompts with strong aesthetic control and community workflows.', 'Palette', 'https://www.midjourney.com', 'https://www.google.com/s2/favicons?domain=midjourney.com&sz=128', 'image-generation', ARRAY['Art','Diffusion'], 920, 161, 'Paid', 4.5, 10, true, true, ARRAY['High-quality AI art from text prompts.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'dalle', 'dalle', 'DALL·E', 'OpenAI image generation inside ChatGPT.', 'Create and edit images with DALL·E integrated in ChatGPT for quick concept art and marketing visuals.', 'Sparkles', 'https://chat.openai.com', 'https://www.google.com/s2/favicons?domain=chat.openai.com&sz=128', 'image-generation', ARRAY['OpenAI','Editing'], 880, 277, 'Freemium', 4.5, 10, false, false, ARRAY['OpenAI image generation inside ChatGPT.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'stable-diffusion', 'stable-diffusion', 'Stable Diffusion', 'Open ecosystem for generative image models.', 'Stability AI provides open and commercial diffusion models for local and cloud image generation.', 'Layers', 'https://stability.ai', 'https://www.google.com/s2/favicons?domain=stability.ai&sz=128', 'image-generation', ARRAY['Open Source','API'], 760, 293, 'Freemium', 4.5, 10, false, false, ARRAY['Open ecosystem for generative image models.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'leonardo-ai', 'leonardo-ai', 'Leonardo AI', 'Game assets and creative image workflows.', 'Leonardo AI offers fine-tuned models for characters, textures, and production-ready creative assets.', 'Sparkle', 'https://leonardo.ai', 'https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128', 'image-generation', ARRAY['Gaming','Assets'], 540, 113, 'Freemium', 4.5, 10, false, false, ARRAY['Game assets and creative image workflows.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'adobe-firefly', 'adobe-firefly', 'Adobe Firefly', 'Commercial-safe generative images in Creative Cloud.', 'Firefly integrates generative fill and text-to-image across Photoshop and Express with IP-safe training.', 'Sparkle', 'https://firefly.adobe.com', 'https://www.google.com/s2/favicons?domain=firefly.adobe.com&sz=128', 'image-generation', ARRAY['Adobe','Commercial'], 610, 171, 'Freemium', 4.5, 10, false, false, ARRAY['Commercial-safe generative images in Creative Cloud.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'ideogram', 'ideogram', 'Ideogram', 'AI images with reliable text rendering.', 'Ideogram excels at typography inside images for posters, logos, and social creatives.', 'Sparkle', 'https://ideogram.ai', 'https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128', 'image-generation', ARRAY['Typography','Design'], 490, 206, 'Freemium', 4.5, 10, true, false, ARRAY['AI images with reliable text rendering.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'flux', 'flux', 'FLUX', 'Frontier open-weight image models by Black Forest Labs.', 'FLUX delivers photorealistic generation with fast inference and developer-friendly APIs.', 'Sparkle', 'https://blackforestlabs.ai', 'https://www.google.com/s2/favicons?domain=blackforestlabs.ai&sz=128', 'image-generation', ARRAY['Photorealistic','API'], 430, 120, 'Freemium', 4.5, 10, false, false, ARRAY['Frontier open-weight image models by Black Forest Labs.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'playground-ai', 'playground-ai', 'Playground AI', 'Freeform canvas for image generation and editing.', 'Playground combines diffusion models with inpainting and style controls for creators.', 'Sparkle', 'https://playground.com', 'https://www.google.com/s2/favicons?domain=playground.com&sz=128', 'image-generation', ARRAY['Canvas','Inpaint'], 380, 106, 'Freemium', 4.5, 10, false, false, ARRAY['Freeform canvas for image generation and editing.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'canva-ai', 'canva-ai', 'Canva AI', 'Magic design tools inside Canva.', 'Generate images, layouts, and copy directly in Canva for marketing and social teams.', 'Sparkle', 'https://www.canva.com', 'https://www.google.com/s2/favicons?domain=canva.com&sz=128', 'image-generation', ARRAY['Marketing','Templates'], 720, 302, 'Freemium', 4.5, 10, false, false, ARRAY['Magic design tools inside Canva.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'clipdrop', 'clipdrop', 'Clipdrop', 'AI photo editing and cleanup by Stability.', 'Remove backgrounds, upscale, relight, and edit photos with one-click AI tools.', 'Sparkle', 'https://clipdrop.co', 'https://www.google.com/s2/favicons?domain=clipdrop.co&sz=128', 'image-generation', ARRAY['Editing','Upscale'], 350, 147, 'Freemium', 4.5, 10, false, false, ARRAY['AI photo editing and cleanup by Stability.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'nightcafe', 'nightcafe', 'NightCafe', 'Community-driven AI art generator.', 'NightCafe offers multiple algorithms and daily challenges for AI art enthusiasts.', 'Sparkle', 'https://creator.nightcafe.studio', 'https://www.google.com/s2/favicons?domain=creator.nightcafe.studio&sz=128', 'image-generation', ARRAY['Community','Art'], 290, 41, 'Freemium', 4.5, 10, false, false, ARRAY['Community-driven AI art generator.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'craiyon', 'craiyon', 'Craiyon', 'Free AI image generator from text.', 'Formerly DALL·E mini, Craiyon provides quick free image generation for experiments.', 'Sparkle', 'https://www.craiyon.com', 'https://www.google.com/s2/favicons?domain=craiyon.com&sz=128', 'image-generation', ARRAY['Free','Quick'], 410, 158, 'Free', 4.5, 10, false, false, ARRAY['Free AI image generator from text.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'runway', 'runway', 'Runway', 'Professional AI video and Gen-3 models.', 'Runway powers text-to-video, image-to-video, and advanced editing for filmmakers and creators.', 'Video', 'https://runwayml.com', 'https://www.google.com/s2/favicons?domain=runwayml.com&sz=128', 'video-generation', ARRAY['Gen-3','Film'], 850, 298, 'Freemium', 4.5, 10, true, true, ARRAY['Professional AI video and Gen-3 models.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'pika', 'pika', 'Pika', 'Creative text and image to video.', 'Pika generates short cinematic clips with camera motion and style presets.', 'Sparkle', 'https://pika.art', 'https://www.google.com/s2/favicons?domain=pika.art&sz=128', 'video-generation', ARRAY['Short-form','Social'], 620, 174, 'Freemium', 4.5, 10, false, false, ARRAY['Creative text and image to video.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'synthesia', 'synthesia', 'Synthesia', 'AI avatar videos for business.', 'Create presenter videos from text in 140+ languages with custom avatars.', 'Sparkle', 'https://www.synthesia.io', 'https://www.google.com/s2/favicons?domain=synthesia.io&sz=128', 'video-generation', ARRAY['Avatars','Enterprise'], 580, 81, 'Paid', 4.5, 10, false, false, ARRAY['AI avatar videos for business.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'heygen', 'heygen', 'HeyGen', 'AI video avatars and translation.', 'HeyGen produces marketing and training videos with realistic avatars and voice sync.', 'Sparkle', 'https://www.heygen.com', 'https://www.google.com/s2/favicons?domain=heygen.com&sz=128', 'video-generation', ARRAY['Avatars','Marketing'], 540, 189, 'Freemium', 4.5, 10, false, false, ARRAY['AI video avatars and translation.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'luma-dream-machine', 'luma-dream-machine', 'Luma Dream Machine', 'High-quality video from text and images.', 'Luma AI Dream Machine generates coherent motion and cinematic shots from prompts.', 'Sparkle', 'https://lumalabs.ai', 'https://www.google.com/s2/favicons?domain=lumalabs.ai&sz=128', 'video-generation', ARRAY['Cinematic','3D'], 490, 69, 'Freemium', 4.5, 10, true, false, ARRAY['High-quality video from text and images.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'kling-ai', 'kling-ai', 'Kling AI', 'Long-form AI video generation.', 'Kling creates detailed video clips with strong physics and character consistency.', 'Sparkle', 'https://klingai.com', 'https://www.google.com/s2/favicons?domain=klingai.com&sz=128', 'video-generation', ARRAY['Long-form','Motion'], 450, 189, 'Freemium', 4.5, 10, false, false, ARRAY['Long-form AI video generation.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'capcut', 'capcut', 'CapCut', 'AI editing and effects for short video.', 'CapCut includes auto-captions, AI effects, and templates for TikTok and Reels.', 'Sparkle', 'https://www.capcut.com', 'https://www.google.com/s2/favicons?domain=capcut.com&sz=128', 'video-generation', ARRAY['Editing','Social'], 780, 273, 'Free', 4.5, 10, false, false, ARRAY['AI editing and effects for short video.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'descript', 'descript', 'Descript', 'Edit video by editing text.', 'Descript combines transcription, overdub, and AI video editing in one timeline.', 'Sparkle', 'https://www.descript.com', 'https://www.google.com/s2/favicons?domain=descript.com&sz=128', 'video-generation', ARRAY['Podcast','Edit'], 520, 218, 'Freemium', 4.5, 10, false, false, ARRAY['Edit video by editing text.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'invideo-ai', 'invideo-ai', 'InVideo AI', 'Script to published video in minutes.', 'Turn a topic into a full video with stock, voiceover, and scene generation.', 'Sparkle', 'https://invideo.io', 'https://www.google.com/s2/favicons?domain=invideo.io&sz=128', 'video-generation', ARRAY['Marketing','Templates'], 440, 77, 'Freemium', 4.5, 10, false, false, ARRAY['Script to published video in minutes.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'fliki', 'fliki', 'Fliki', 'Text to video with AI voices.', 'Fliki converts blog posts and scripts into narrated videos with media libraries.', 'Sparkle', 'https://fliki.ai', 'https://www.google.com/s2/favicons?domain=fliki.ai&sz=128', 'video-generation', ARRAY['Voiceover','Blog'], 360, 113, 'Freemium', 4.5, 10, false, false, ARRAY['Text to video with AI voices.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'veed', 'veed', 'VEED.IO', 'Online video editor with AI tools.', 'VEED offers subtitles, background removal, and AI avatars for quick video production.', 'Sparkle', 'https://www.veed.io', 'https://www.google.com/s2/favicons?domain=veed.io&sz=128', 'video-generation', ARRAY['Subtitles','Editor'], 400, 112, 'Freemium', 4.5, 10, false, false, ARRAY['Online video editor with AI tools.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'opus-clip', 'opus-clip', 'Opus Clip', 'Turn long videos into viral shorts.', 'Opus uses AI to find highlights and reframe clips for social platforms.', 'Sparkle', 'https://www.opus.pro', 'https://www.google.com/s2/favicons?domain=opus.pro&sz=128', 'video-generation', ARRAY['Clips','Social'], 470, 66, 'Freemium', 4.5, 10, false, false, ARRAY['Turn long videos into viral shorts.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'github-copilot', 'github-copilot', 'GitHub Copilot', 'AI pair programmer in your IDE.', 'Copilot suggests code, tests, and explanations across VS Code, JetBrains, and more.', 'Terminal', 'https://github.com/features/copilot', 'https://www.google.com/s2/favicons?domain=github.com&sz=128', 'coding', ARRAY['IDE','Microsoft'], 950, 299, 'Paid', 4.5, 10, false, true, ARRAY['AI pair programmer in your IDE.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'cursor', 'cursor', 'Cursor', 'AI-first code editor.', 'Cursor is a VS Code fork with deep AI chat, codebase context, and agentic edits.', 'Sparkle', 'https://cursor.com', 'https://www.google.com/s2/favicons?domain=cursor.com&sz=128', 'coding', ARRAY['Editor','Agent'], 890, 312, 'Freemium', 4.5, 10, true, false, ARRAY['AI-first code editor.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'windsurf', 'windsurf', 'Windsurf', 'Agentic IDE by Codeium.', 'Windsurf flows between planning and multi-file edits with strong context awareness.', 'Sparkle', 'https://codeium.com/windsurf', 'https://www.google.com/s2/favicons?domain=codeium.com&sz=128', 'coding', ARRAY['Agent','IDE'], 620, 260, 'Freemium', 4.5, 10, false, false, ARRAY['Agentic IDE by Codeium.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'replit', 'replit', 'Replit', 'Build and deploy apps with AI.', 'Replit Agent generates full-stack apps, runs code in the cloud, and deploys instantly.', 'Sparkle', 'https://replit.com', 'https://www.google.com/s2/favicons?domain=replit.com&sz=128', 'coding', ARRAY['Deploy','Full-stack'], 580, 203, 'Freemium', 4.5, 10, false, false, ARRAY['Build and deploy apps with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'codeium', 'codeium', 'Codeium', 'Free AI autocomplete and chat.', 'Codeium provides fast completions and chat for 70+ languages with a generous free tier.', 'Sparkle', 'https://codeium.com', 'https://www.google.com/s2/favicons?domain=codeium.com&sz=128', 'coding', ARRAY['Free','Autocomplete'], 540, 208, 'Free', 4.5, 10, false, false, ARRAY['Free AI autocomplete and chat.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'tabnine', 'tabnine', 'Tabnine', 'Private AI code completion.', 'Tabnine offers on-prem and local models for enterprises needing code privacy.', 'Sparkle', 'https://www.tabnine.com', 'https://www.google.com/s2/favicons?domain=tabnine.com&sz=128', 'coding', ARRAY['Enterprise','Privacy'], 380, 146, 'Freemium', 4.5, 10, false, false, ARRAY['Private AI code completion.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'amazon-q-developer', 'amazon-q-developer', 'Amazon Q Developer', 'AWS AI assistant for building on cloud.', 'Q Developer helps with AWS services, infrastructure code, and application debugging.', 'Sparkle', 'https://aws.amazon.com/q/developer/', 'https://www.google.com/s2/favicons?domain=aws.amazon.com&sz=128', 'coding', ARRAY['AWS','Cloud'], 320, 45, 'Freemium', 4.5, 10, false, false, ARRAY['AWS AI assistant for building on cloud.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'sourcegraph-cody', 'sourcegraph-cody', 'Sourcegraph Cody', 'AI that knows your entire codebase.', 'Cody answers questions and writes patches using enterprise code search context.', 'Sparkle', 'https://sourcegraph.com/cody', 'https://www.google.com/s2/favicons?domain=sourcegraph.com&sz=128', 'coding', ARRAY['Enterprise','Search'], 350, 135, 'Freemium', 4.5, 10, false, false, ARRAY['AI that knows your entire codebase.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'continue', 'continue', 'Continue', 'Open-source AI code assistant.', 'Continue connects Ollama, OpenAI, and other models inside VS Code and JetBrains.', 'Sparkle', 'https://continue.dev', 'https://www.google.com/s2/favicons?domain=continue.dev&sz=128', 'coding', ARRAY['Open Source','Local'], 410, 172, 'Open Source', 4.5, 10, false, false, ARRAY['Open-source AI code assistant.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'bolt-new', 'bolt-new', 'bolt.new', 'Prompt to full-stack web app.', 'StackBlitz bolt.new generates and runs React apps in the browser from a single prompt.', 'Sparkle', 'https://bolt.new', 'https://www.google.com/s2/favicons?domain=bolt.new&sz=128', 'coding', ARRAY['Web','React'], 720, 302, 'Freemium', 4.5, 10, true, false, ARRAY['Prompt to full-stack web app.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'v0', 'v0', 'v0 by Vercel', 'Generative UI with shadcn and Tailwind.', 'v0 turns prompts into production-ready React components and pages.', 'Sparkle', 'https://v0.dev', 'https://www.google.com/s2/favicons?domain=v0.dev&sz=128', 'coding', ARRAY['UI','Vercel'], 680, 143, 'Freemium', 4.5, 10, false, false, ARRAY['Generative UI with shadcn and Tailwind.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'lovable', 'lovable', 'Lovable', 'AI app builder for startups.', 'Lovable ships full-stack apps with auth, database, and deploy from natural language.', 'Sparkle', 'https://lovable.dev', 'https://www.google.com/s2/favicons?domain=lovable.dev&sz=128', 'coding', ARRAY['Startup','Full-stack'], 560, 216, 'Freemium', 4.5, 10, false, false, ARRAY['AI app builder for startups.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'phind', 'phind', 'Phind', 'AI search for developers.', 'Phind combines web search with code-aware answers for debugging and learning.', 'Sparkle', 'https://www.phind.com', 'https://www.google.com/s2/favicons?domain=phind.com&sz=128', 'coding', ARRAY['Search','Debug'], 440, 139, 'Freemium', 4.5, 10, false, false, ARRAY['AI search for developers.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'mintlify', 'mintlify', 'Mintlify', 'AI documentation for codebases.', 'Mintlify auto-generates and maintains developer docs from your repository.', 'Sparkle', 'https://mintlify.com', 'https://www.google.com/s2/favicons?domain=mintlify.com&sz=128', 'coding', ARRAY['Docs','DevRel'], 290, 122, 'Freemium', 4.5, 10, false, false, ARRAY['AI documentation for codebases.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'chatgpt', 'chatgpt', 'ChatGPT', 'OpenAI conversational assistant.', 'ChatGPT offers GPT-4o reasoning, browsing, code, images, and custom GPTs for everyday tasks.', 'Brain', 'https://chat.openai.com', 'https://www.google.com/s2/favicons?domain=chat.openai.com&sz=128', 'chatbots', ARRAY['GPT-4','General'], 1200, 462, 'Freemium', 4.5, 10, true, true, ARRAY['OpenAI conversational assistant.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'claude', 'claude', 'Claude', 'Anthropic AI assistant for work.', 'Claude excels at long documents, analysis, coding, and safe enterprise deployments.', 'Sparkle', 'https://claude.ai', 'https://www.google.com/s2/favicons?domain=claude.ai&sz=128', 'chatbots', ARRAY['Anthropic','Enterprise'], 980, 343, 'Freemium', 4.5, 10, false, false, ARRAY['Anthropic AI assistant for work.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'gemini', 'gemini', 'Google Gemini', 'Google multimodal AI assistant.', 'Gemini integrates Search, Workspace, and deep reasoning across text, image, and video.', 'Sparkle', 'https://gemini.google.com', 'https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128', 'chatbots', ARRAY['Google','Multimodal'], 900, 315, 'Freemium', 4.5, 10, false, false, ARRAY['Google multimodal AI assistant.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'perplexity', 'perplexity', 'Perplexity', 'Answer engine with live citations.', 'Perplexity searches the web and cites sources for research-grade answers.', 'Sparkle', 'https://www.perplexity.ai', 'https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128', 'research-ai', ARRAY['Search','Citations'], 860, 151, 'Freemium', 4.5, 10, false, true, ARRAY['Answer engine with live citations.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'poe', 'poe', 'Poe', 'Access many AI models in one app.', 'Poe lets you chat with GPT, Claude, Gemini, and community bots in a single interface.', 'Sparkle', 'https://poe.com', 'https://www.google.com/s2/favicons?domain=poe.com&sz=128', 'chatbots', ARRAY['Multi-model','Bots'], 520, 127, 'Freemium', 4.5, 10, false, false, ARRAY['Access many AI models in one app.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'microsoft-copilot', 'microsoft-copilot', 'Microsoft Copilot', 'AI across Windows and Microsoft 365.', 'Copilot assists with Office, Edge, and Windows using GPT and enterprise data.', 'Sparkle', 'https://copilot.microsoft.com', 'https://www.google.com/s2/favicons?domain=copilot.microsoft.com&sz=128', 'chatbots', ARRAY['Microsoft','Office'], 640, 269, 'Freemium', 4.5, 10, false, false, ARRAY['AI across Windows and Microsoft 365.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'mistral-le-chat', 'mistral-le-chat', 'Le Chat', 'Mistral AI European assistant.', 'Le Chat runs Mistral large models with fast inference and open-weight options.', 'Sparkle', 'https://chat.mistral.ai', 'https://www.google.com/s2/favicons?domain=chat.mistral.ai&sz=128', 'chatbots', ARRAY['Mistral','EU'], 380, 133, 'Freemium', 4.5, 10, false, false, ARRAY['Mistral AI European assistant.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'character-ai', 'character-ai', 'Character.AI', 'Chat with custom AI personas.', 'Create and talk to characters for entertainment, roleplay, and creative writing.', 'Sparkle', 'https://character.ai', 'https://www.google.com/s2/favicons?domain=character.ai&sz=128', 'chatbots', ARRAY['Personas','Creative'], 710, 174, 'Freemium', 4.5, 10, false, false, ARRAY['Chat with custom AI personas.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'pi', 'pi', 'Pi', 'Personal intelligence by Inflection.', 'Pi offers empathetic, conversational assistance focused on everyday support.', 'Sparkle', 'https://pi.ai', 'https://www.google.com/s2/favicons?domain=pi.ai&sz=128', 'chatbots', ARRAY['Personal','Voice'], 340, 71, 'Free', 4.5, 10, false, false, ARRAY['Personal intelligence by Inflection.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'huggingchat', 'huggingchat', 'HuggingChat', 'Open models chat by Hugging Face.', 'Chat with open-source LLMs hosted on Hugging Face with community models.', 'Sparkle', 'https://huggingface.co/chat', 'https://www.google.com/s2/favicons?domain=huggingface.co&sz=128', 'chatbots', ARRAY['Open Source','OSS'], 360, 76, 'Free', 4.5, 10, false, false, ARRAY['Open models chat by Hugging Face.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'you-com', 'you-com', 'You.com', 'AI search and chat portal.', 'You.com combines AI answers with web results and specialized agents.', 'Sparkle', 'https://you.com', 'https://www.google.com/s2/favicons?domain=you.com&sz=128', 'chatbots', ARRAY['Search','Agents'], 310, 119, 'Freemium', 4.5, 10, false, false, ARRAY['AI search and chat portal.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'meta-ai', 'meta-ai', 'Meta AI', 'AI assistant across Instagram and WhatsApp.', 'Meta AI generates images and answers inside Meta apps and on the web.', 'Sparkle', 'https://www.meta.ai', 'https://www.google.com/s2/favicons?domain=meta.ai&sz=128', 'chatbots', ARRAY['Meta','Social'], 450, 173, 'Free', 4.5, 10, false, false, ARRAY['AI assistant across Instagram and WhatsApp.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'notion-ai', 'notion-ai', 'Notion AI', 'AI writing inside Notion workspaces.', 'Summarize, draft, and organize knowledge across docs and wikis with Notion AI.', 'Calendar', 'https://www.notion.so/product/ai', 'https://www.google.com/s2/favicons?domain=notion.so&sz=128', 'productivity', ARRAY['Notes','Wiki'], 720, 101, 'Freemium', 4.5, 10, false, false, ARRAY['AI writing inside Notion workspaces.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'otter-ai', 'otter-ai', 'Otter.ai', 'AI meeting notes and transcription.', 'Otter records, transcribes, and summarizes meetings with speaker identification.', 'Sparkle', 'https://otter.ai', 'https://www.google.com/s2/favicons?domain=otter.ai&sz=128', 'productivity', ARRAY['Meetings','Transcription'], 580, 244, 'Freemium', 4.5, 10, false, false, ARRAY['AI meeting notes and transcription.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'fireflies', 'fireflies', 'Fireflies.ai', 'Conversation intelligence for teams.', 'Fireflies captures meeting notes, action items, and CRM integrations automatically.', 'Sparkle', 'https://fireflies.ai', 'https://www.google.com/s2/favicons?domain=fireflies.ai&sz=128', 'productivity', ARRAY['CRM','Teams'], 490, 69, 'Freemium', 4.5, 10, false, false, ARRAY['Conversation intelligence for teams.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'motion', 'motion', 'Motion', 'AI calendar and task planner.', 'Motion auto-schedules tasks and meetings based on priorities and deadlines.', 'Sparkle', 'https://www.usemotion.com', 'https://www.google.com/s2/favicons?domain=usemotion.com&sz=128', 'productivity', ARRAY['Calendar','Tasks'], 420, 147, 'Paid', 4.5, 10, false, false, ARRAY['AI calendar and task planner.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'reclaim-ai', 'reclaim-ai', 'Reclaim.ai', 'Smart scheduling for busy teams.', 'Reclaim defends focus time and syncs habits across Google Calendar.', 'Sparkle', 'https://reclaim.ai', 'https://www.google.com/s2/favicons?domain=reclaim.ai&sz=128', 'productivity', ARRAY['Scheduling','Focus'], 360, 63, 'Freemium', 4.5, 10, false, false, ARRAY['Smart scheduling for busy teams.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'mem-ai', 'mem-ai', 'Mem', 'Self-organizing AI notes.', 'Mem captures ideas and surfaces relevant notes with AI tagging and search.', 'Sparkle', 'https://mem.ai', 'https://www.google.com/s2/favicons?domain=mem.ai&sz=128', 'productivity', ARRAY['Notes','Search'], 280, 98, 'Freemium', 4.5, 10, false, false, ARRAY['Self-organizing AI notes.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'taskade', 'taskade', 'Taskade', 'AI project management and agents.', 'Taskade builds workflows, mind maps, and autonomous agents for team productivity.', 'Sparkle', 'https://www.taskade.com', 'https://www.google.com/s2/favicons?domain=taskade.com&sz=128', 'productivity', ARRAY['Projects','Agents'], 340, 131, 'Freemium', 4.5, 10, false, false, ARRAY['AI project management and agents.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'grammarly', 'grammarly', 'Grammarly', 'AI writing assistant for clarity.', 'Grammarly checks grammar, tone, and clarity across email, docs, and browsers.', 'Sparkle', 'https://www.grammarly.com', 'https://www.google.com/s2/favicons?domain=grammarly.com&sz=128', 'productivity', ARRAY['Writing','Grammar'], 810, 113, 'Freemium', 4.5, 10, false, false, ARRAY['AI writing assistant for clarity.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'superhuman', 'superhuman', 'Superhuman', 'Fast email with AI triage.', 'Superhuman uses AI to summarize threads, draft replies, and prioritize inbox.', 'Sparkle', 'https://superhuman.com', 'https://www.google.com/s2/favicons?domain=superhuman.com&sz=128', 'productivity', ARRAY['Email','Speed'], 390, 68, 'Paid', 4.5, 10, false, false, ARRAY['Fast email with AI triage.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'trello-ai', 'trello-ai', 'Atlassian Intelligence', 'AI in Jira and Confluence.', 'Atlassian embeds AI for summarization, generation, and automation across work tools.', 'Sparkle', 'https://www.atlassian.com/software/artificial-intelligence', 'https://www.google.com/s2/favicons?domain=atlassian.com&sz=128', 'productivity', ARRAY['Jira','Enterprise'], 320, 45, 'Freemium', 4.5, 10, false, false, ARRAY['AI in Jira and Confluence.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'slack-ai', 'slack-ai', 'Slack AI', 'Summaries and search in Slack.', 'Slack AI recaps channels, answers questions, and drafts messages from workspace data.', 'Sparkle', 'https://slack.com/features/ai', 'https://www.google.com/s2/favicons?domain=slack.com&sz=128', 'productivity', ARRAY['Teams','Chat'], 450, 189, 'Paid', 4.5, 10, false, false, ARRAY['Summaries and search in Slack.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'zoom-ai', 'zoom-ai', 'Zoom AI Companion', 'Meeting summaries in Zoom.', 'Zoom AI Companion provides recaps, action items, and chat assistance after calls.', 'Sparkle', 'https://www.zoom.com/en/products/ai-companion/', 'https://www.google.com/s2/favicons?domain=zoom.com&sz=128', 'productivity', ARRAY['Meetings','Video'], 410, 158, 'Freemium', 4.5, 10, false, false, ARRAY['Meeting summaries in Zoom.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'elevenlabs', 'elevenlabs', 'ElevenLabs', 'Realistic AI voice and cloning.', 'ElevenLabs offers TTS, voice cloning, dubbing, and sound effects for creators.', 'Volume2', 'https://elevenlabs.io', 'https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128', 'voice-ai', ARRAY['TTS','Clone'], 820, 144, 'Freemium', 4.5, 10, false, true, ARRAY['Realistic AI voice and cloning.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'murf-ai', 'murf-ai', 'Murf AI', 'Studio-quality voiceovers.', 'Murf provides 120+ voices for videos, presentations, and e-learning.', 'Sparkle', 'https://murf.ai', 'https://www.google.com/s2/favicons?domain=murf.ai&sz=128', 'voice-ai', ARRAY['Voiceover','Video'], 480, 185, 'Freemium', 4.5, 10, false, false, ARRAY['Studio-quality voiceovers.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'speechify', 'speechify', 'Speechify', 'Text to speech for reading.', 'Speechify reads articles and PDFs aloud with natural celebrity-style voices.', 'Sparkle', 'https://speechify.com', 'https://www.google.com/s2/favicons?domain=speechify.com&sz=128', 'voice-ai', ARRAY['TTS','Accessibility'], 520, 73, 'Freemium', 4.5, 10, false, false, ARRAY['Text to speech for reading.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'play-ht', 'play-ht', 'Play.ht', 'AI voice generator for content.', 'Generate and clone voices for podcasts, videos, and IVR systems.', 'Sparkle', 'https://play.ht', 'https://www.google.com/s2/favicons?domain=play.ht&sz=128', 'voice-ai', ARRAY['Podcast','IVR'], 360, 139, 'Freemium', 4.5, 10, false, false, ARRAY['AI voice generator for content.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'resemble-ai', 'resemble-ai', 'Resemble AI', 'Custom brand voices at scale.', 'Resemble builds bespoke neural voices with emotion control and real-time API.', 'Sparkle', 'https://www.resemble.ai', 'https://www.google.com/s2/favicons?domain=resemble.ai&sz=128', 'voice-ai', ARRAY['API','Brand'], 290, 61, 'Paid', 4.5, 10, false, false, ARRAY['Custom brand voices at scale.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'wellsaid-labs', 'wellsaid-labs', 'WellSaid Labs', 'Enterprise AI narration.', 'WellSaid creates consistent corporate voice avatars for training and marketing.', 'Sparkle', 'https://wellsaidlabs.com', 'https://www.google.com/s2/favicons?domain=wellsaidlabs.com&sz=128', 'voice-ai', ARRAY['Enterprise','Narration'], 250, 70, 'Paid', 4.5, 10, false, false, ARRAY['Enterprise AI narration.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'listnr', 'listnr', 'Listnr', 'Podcast and voice AI platform.', 'Listnr generates podcasts from text with realistic multi-speaker audio.', 'Sparkle', 'https://www.listnr.tech', 'https://www.google.com/s2/favicons?domain=listnr.tech&sz=128', 'voice-ai', ARRAY['Podcast','Multi-speaker'], 220, 77, 'Freemium', 4.5, 10, false, false, ARRAY['Podcast and voice AI platform.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'assemblyai', 'assemblyai', 'AssemblyAI', 'Speech-to-text API for developers.', 'AssemblyAI transcribes audio with summarization, moderation, and entity detection.', 'Sparkle', 'https://www.assemblyai.com', 'https://www.google.com/s2/favicons?domain=assemblyai.com&sz=128', 'voice-ai', ARRAY['API','STT'], 340, 60, 'Freemium', 4.5, 10, false, false, ARRAY['Speech-to-text API for developers.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'deepgram', 'deepgram', 'Deepgram', 'Fast speech recognition API.', 'Deepgram offers real-time transcription and voice agents with low latency.', 'Sparkle', 'https://deepgram.com', 'https://www.google.com/s2/favicons?domain=deepgram.com&sz=128', 'voice-ai', ARRAY['API','Realtime'], 310, 130, 'Freemium', 4.5, 10, false, false, ARRAY['Fast speech recognition API.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'rev-ai', 'rev-ai', 'Rev AI', 'Accurate transcription services.', 'Rev provides human and AI transcription for media and legal workflows.', 'Sparkle', 'https://www.rev.com', 'https://www.google.com/s2/favicons?domain=rev.com&sz=128', 'voice-ai', ARRAY['Transcription','Legal'], 280, 98, 'Paid', 4.5, 10, false, false, ARRAY['Accurate transcription services.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'lovo-ai', 'lovo-ai', 'LOVO AI', 'Genny voiceover and video suite.', 'LOVO combines voice synthesis with video editing for marketing content.', 'Sparkle', 'https://lovo.ai', 'https://www.google.com/s2/favicons?domain=lovo.ai&sz=128', 'voice-ai', ARRAY['Video','Marketing'], 300, 116, 'Freemium', 4.5, 10, false, false, ARRAY['Genny voiceover and video suite.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'suno', 'suno', 'Suno', 'Generate full songs from text.', 'Suno creates vocals, lyrics, and instrumentals in many genres from a simple prompt.', 'Speech', 'https://suno.com', 'https://www.google.com/s2/favicons?domain=suno.com&sz=128', 'music-ai', ARRAY['Songs','Vocals'], 780, 218, 'Freemium', 4.5, 10, true, true, ARRAY['Generate full songs from text.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'udio', 'udio', 'Udio', 'AI music creation with high fidelity.', 'Udio produces studio-quality tracks with detailed style and structure control.', 'Sparkle', 'https://www.udio.com', 'https://www.google.com/s2/favicons?domain=udio.com&sz=128', 'music-ai', ARRAY['Music','Studio'], 620, 174, 'Freemium', 4.5, 10, false, false, ARRAY['AI music creation with high fidelity.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'aiva', 'aiva', 'AIVA', 'AI composer for soundtracks.', 'AIVA generates orchestral and emotional scores for film, games, and ads.', 'Sparkle', 'https://www.aiva.ai', 'https://www.google.com/s2/favicons?domain=aiva.ai&sz=128', 'music-ai', ARRAY['Orchestral','Film'], 340, 95, 'Freemium', 4.5, 10, false, false, ARRAY['AI composer for soundtracks.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'soundraw', 'soundraw', 'Soundraw', 'Royalty-free AI music generator.', 'Customize mood, genre, and length for background music without copyright issues.', 'Sparkle', 'https://soundraw.io', 'https://www.google.com/s2/favicons?domain=soundraw.io&sz=128', 'music-ai', ARRAY['Royalty-free','BGM'], 380, 160, 'Freemium', 4.5, 10, false, false, ARRAY['Royalty-free AI music generator.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'boomy', 'boomy', 'Boomy', 'Create and release songs instantly.', 'Boomy lets anyone make music and distribute to streaming platforms.', 'Sparkle', 'https://boomy.com', 'https://www.google.com/s2/favicons?domain=boomy.com&sz=128', 'music-ai', ARRAY['Distribution','Beginner'], 260, 82, 'Freemium', 4.5, 10, false, false, ARRAY['Create and release songs instantly.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'mubert', 'mubert', 'Mubert', 'Generative music streams and API.', 'Mubert generates endless royalty-free streams for apps, videos, and focus.', 'Sparkle', 'https://mubert.com', 'https://www.google.com/s2/favicons?domain=mubert.com&sz=128', 'music-ai', ARRAY['API','Stream'], 290, 102, 'Freemium', 4.5, 10, false, false, ARRAY['Generative music streams and API.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'beatoven', 'beatoven', 'Beatoven.ai', 'AI music for video creators.', 'Beatoven scores videos with mood-based composition and stem control.', 'Sparkle', 'https://www.beatoven.ai', 'https://www.google.com/s2/favicons?domain=beatoven.ai&sz=128', 'music-ai', ARRAY['Video','Mood'], 270, 113, 'Freemium', 4.5, 10, false, false, ARRAY['AI music for video creators.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'splash-pro', 'splash-pro', 'Splash Pro', 'AI music for brands and apps.', 'Splash Pro offers composition tools and APIs for interactive music experiences.', 'Sparkle', 'https://splashmusic.com', 'https://www.google.com/s2/favicons?domain=splashmusic.com&sz=128', 'music-ai', ARRAY['Brands','API'], 210, 37, 'Freemium', 4.5, 10, false, false, ARRAY['AI music for brands and apps.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'loudly', 'loudly', 'Loudly', 'AI music for social and ads.', 'Loudly generates tracks matched to video length and platform requirements.', 'Sparkle', 'https://www.loudly.com', 'https://www.google.com/s2/favicons?domain=loudly.com&sz=128', 'music-ai', ARRAY['Social','Ads'], 230, 81, 'Freemium', 4.5, 10, false, false, ARRAY['AI music for social and ads.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'stable-audio', 'stable-audio', 'Stable Audio', 'Generative audio by Stability AI.', 'Stable Audio creates music and sound effects with diffusion models.', 'Sparkle', 'https://stableaudio.com', 'https://www.google.com/s2/favicons?domain=stableaudio.com&sz=128', 'music-ai', ARRAY['SFX','Stability'], 320, 78, 'Freemium', 4.5, 10, false, false, ARRAY['Generative audio by Stability AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'elicit', 'elicit', 'Elicit', 'AI research assistant for papers.', 'Elicit finds papers, extracts claims, and compares methods for literature review.', 'Compass', 'https://elicit.com', 'https://www.google.com/s2/favicons?domain=elicit.com&sz=128', 'research-ai', ARRAY['Papers','Review'], 520, 182, 'Freemium', 4.5, 10, false, false, ARRAY['AI research assistant for papers.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'consensus', 'consensus', 'Consensus', 'Scientific answers from peer-reviewed sources.', 'Consensus searches millions of papers to answer yes/no research questions with citations.', 'Sparkle', 'https://consensus.app', 'https://www.google.com/s2/favicons?domain=consensus.app&sz=128', 'research-ai', ARRAY['Science','Citations'], 480, 67, 'Freemium', 4.5, 10, false, true, ARRAY['Scientific answers from peer-reviewed sources.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'semantic-scholar', 'semantic-scholar', 'Semantic Scholar', 'Free AI-powered academic search.', 'Semantic Scholar surfaces influential papers, citations, and TLDR summaries.', 'Sparkle', 'https://www.semanticscholar.org', 'https://www.google.com/s2/favicons?domain=semanticscholar.org&sz=128', 'research-ai', ARRAY['Academic','Free'], 610, 235, 'Free', 4.5, 10, false, false, ARRAY['Free AI-powered academic search.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'scite', 'scite', 'scite', 'Smart citations and credibility checks.', 'scite shows how papers are supported or contradicted by later research.', 'Sparkle', 'https://scite.ai', 'https://www.google.com/s2/favicons?domain=scite.ai&sz=128', 'research-ai', ARRAY['Citations','Trust'], 340, 107, 'Freemium', 4.5, 10, false, false, ARRAY['Smart citations and credibility checks.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'research-rabbit', 'research-rabbit', 'Research Rabbit', 'Visual literature discovery.', 'Research Rabbit maps paper networks and recommends relevant new research.', 'Sparkle', 'https://www.researchrabbit.ai', 'https://www.google.com/s2/favicons?domain=researchrabbit.ai&sz=128', 'research-ai', ARRAY['Discovery','Graph'], 380, 133, 'Free', 4.5, 10, false, false, ARRAY['Visual literature discovery.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'connected-papers', 'connected-papers', 'Connected Papers', 'Explore paper graphs visually.', 'Connected Papers generates similarity graphs to find seminal and derivative work.', 'Sparkle', 'https://www.connectedpapers.com', 'https://www.google.com/s2/favicons?domain=connectedpapers.com&sz=128', 'research-ai', ARRAY['Graph','Discovery'], 420, 162, 'Free', 4.5, 10, false, false, ARRAY['Explore paper graphs visually.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'scispace', 'scispace', 'SciSpace', 'Understand papers with AI copilot.', 'SciSpace explains tables, methods, and PDFs with citation-backed chat.', 'Sparkle', 'https://typeset.io', 'https://www.google.com/s2/favicons?domain=typeset.io&sz=128', 'research-ai', ARRAY['PDF','Copilot'], 450, 189, 'Freemium', 4.5, 10, false, false, ARRAY['Understand papers with AI copilot.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'arxiv', 'arxiv', 'arXiv', 'Open preprint repository for science.', 'arXiv hosts cutting-edge ML, physics, and CS preprints from researchers worldwide.', 'Sparkle', 'https://arxiv.org', 'https://www.google.com/s2/favicons?domain=arxiv.org&sz=128', 'research-ai', ARRAY['Preprints','Open'], 890, 280, 'Free', 4.5, 10, false, false, ARRAY['Open preprint repository for science.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'zotero', 'zotero', 'Zotero', 'Reference manager with AI plugins.', 'Zotero organizes citations and integrates with AI tools for academic writing.', 'Sparkle', 'https://www.zotero.org', 'https://www.google.com/s2/favicons?domain=zotero.org&sz=128', 'research-ai', ARRAY['Citations','Manager'], 520, 182, 'Free', 4.5, 10, false, false, ARRAY['Reference manager with AI plugins.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'iris-ai', 'iris-ai', 'Iris.ai', 'Enterprise research discovery.', 'Iris.ai helps R&D teams map literature and extract structured insights.', 'Sparkle', 'https://iris.ai', 'https://www.google.com/s2/favicons?domain=iris.ai&sz=128', 'research-ai', ARRAY['Enterprise','R&D'], 180, 69, 'Paid', 4.5, 10, false, false, ARRAY['Enterprise research discovery.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'paperpal', 'paperpal', 'Paperpal', 'AI academic writing assistant.', 'Paperpal improves grammar and structure for journal submissions.', 'Sparkle', 'https://paperpal.com', 'https://www.google.com/s2/favicons?domain=paperpal.com&sz=128', 'research-ai', ARRAY['Writing','Academic'], 310, 130, 'Freemium', 4.5, 10, false, false, ARRAY['AI academic writing assistant.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'jasper', 'jasper', 'Jasper', 'AI marketing copilot for teams.', 'Jasper generates brand-consistent copy, campaigns, and images for enterprises.', 'Activity', 'https://www.jasper.ai', 'https://www.google.com/s2/favicons?domain=jasper.ai&sz=128', 'marketing-ai', ARRAY['Copy','Brand'], 640, 224, 'Paid', 4.5, 10, false, true, ARRAY['AI marketing copilot for teams.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'copy-ai', 'copy-ai', 'Copy.ai', 'GTM AI for sales and marketing.', 'Copy.ai writes emails, ads, and workflows with templates for growth teams.', 'Sparkle', 'https://www.copy.ai', 'https://www.google.com/s2/favicons?domain=copy.ai&sz=128', 'marketing-ai', ARRAY['Sales','GTM'], 520, 200, 'Freemium', 4.5, 10, false, false, ARRAY['GTM AI for sales and marketing.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'writesonic', 'writesonic', 'Writesonic', 'SEO and content automation.', 'Writesonic creates articles, landing pages, and ads optimized for search.', 'Sparkle', 'https://writesonic.com', 'https://www.google.com/s2/favicons?domain=writesonic.com&sz=128', 'marketing-ai', ARRAY['SEO','Content'], 480, 84, 'Freemium', 4.5, 10, false, false, ARRAY['SEO and content automation.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'surfer-seo', 'surfer-seo', 'Surfer SEO', 'Data-driven content optimization.', 'Surfer analyzes SERPs and guides outlines, keywords, and on-page SEO with AI.', 'Sparkle', 'https://surferseo.com', 'https://www.google.com/s2/favicons?domain=surferseo.com&sz=128', 'marketing-ai', ARRAY['SEO','SERP'], 450, 79, 'Paid', 4.5, 10, false, false, ARRAY['Data-driven content optimization.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'adcreative', 'adcreative', 'AdCreative.ai', 'AI ad banners and creatives.', 'AdCreative generates conversion-focused ad images and copy for paid social.', 'Sparkle', 'https://www.adcreative.ai', 'https://www.google.com/s2/favicons?domain=adcreative.ai&sz=128', 'marketing-ai', ARRAY['Ads','Creative'], 410, 72, 'Freemium', 4.5, 10, false, false, ARRAY['AI ad banners and creatives.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'predis', 'predis', 'Predis.ai', 'Social media content at scale.', 'Predis creates posts, carousels, and schedules content for Instagram and LinkedIn.', 'Sparkle', 'https://predis.ai', 'https://www.google.com/s2/favicons?domain=predis.ai&sz=128', 'marketing-ai', ARRAY['Social','Schedule'], 360, 126, 'Freemium', 4.5, 10, false, false, ARRAY['Social media content at scale.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'omneky', 'omneky', 'Omneky', 'AI-powered omnichannel ads.', 'Omneky tests and generates ad variants across platforms with performance insights.', 'Sparkle', 'https://www.omneky.com', 'https://www.google.com/s2/favicons?domain=omneky.com&sz=128', 'marketing-ai', ARRAY['Ads','Performance'], 240, 84, 'Paid', 4.5, 10, false, false, ARRAY['AI-powered omnichannel ads.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'phrasee', 'phrasee', 'Phrasee', 'AI brand language for enterprise.', 'Phrasee optimizes marketing language for email, push, and ads at scale.', 'Sparkle', 'https://phrasee.co', 'https://www.google.com/s2/favicons?domain=phrasee.co&sz=128', 'marketing-ai', ARRAY['Enterprise','Language'], 220, 85, 'Paid', 4.5, 10, false, false, ARRAY['AI brand language for enterprise.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'hubspot-ai', 'hubspot-ai', 'HubSpot AI', 'CRM and marketing AI tools.', 'HubSpot embeds content, email, and sales AI across its customer platform.', 'Sparkle', 'https://www.hubspot.com/products/artificial-intelligence', 'https://www.google.com/s2/favicons?domain=hubspot.com&sz=128', 'marketing-ai', ARRAY['CRM','Email'], 540, 95, 'Freemium', 4.5, 10, false, false, ARRAY['CRM and marketing AI tools.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'mailchimp-ai', 'mailchimp-ai', 'Mailchimp AI', 'AI email and campaign tools.', 'Mailchimp generates subject lines, content, and send-time optimization.', 'Sparkle', 'https://mailchimp.com/features/ai/', 'https://www.google.com/s2/favicons?domain=mailchimp.com&sz=128', 'marketing-ai', ARRAY['Email','Campaigns'], 380, 93, 'Freemium', 4.5, 10, false, false, ARRAY['AI email and campaign tools.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'buffer-ai', 'buffer-ai', 'Buffer AI Assistant', 'Social posts and ideas with AI.', 'Buffer drafts captions, repurposes content, and suggests posting schedules.', 'Sparkle', 'https://buffer.com/ai-assistant', 'https://www.google.com/s2/favicons?domain=buffer.com&sz=128', 'marketing-ai', ARRAY['Social','Schedule'], 320, 45, 'Freemium', 4.5, 10, false, false, ARRAY['Social posts and ideas with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'anyword', 'anyword', 'Anyword', 'Performance marketing copy AI.', 'Anyword predicts copy performance scores before you run ads.', 'Sparkle', 'https://anyword.com', 'https://www.google.com/s2/favicons?domain=anyword.com&sz=128', 'marketing-ai', ARRAY['Performance','Copy'], 290, 112, 'Freemium', 4.5, 10, false, false, ARRAY['Performance marketing copy AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'figma-ai', 'figma-ai', 'Figma AI', 'AI features inside Figma design.', 'Figma adds generative fill, asset search, and wireframe-to-design workflows.', 'Layers', 'https://www.figma.com', 'https://www.google.com/s2/favicons?domain=figma.com&sz=128', 'design-ai', ARRAY['UI','Collaboration'], 760, 319, 'Freemium', 4.5, 10, false, true, ARRAY['AI features inside Figma design.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'uizard', 'uizard', 'Uizard', 'Wireframes to UI with AI.', 'Uizard scans sketches and generates editable mockups and prototypes.', 'Sparkle', 'https://uizard.io', 'https://www.google.com/s2/favicons?domain=uizard.io&sz=128', 'design-ai', ARRAY['Wireframe','Prototype'], 420, 147, 'Freemium', 4.5, 10, false, false, ARRAY['Wireframes to UI with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'galileo-ai', 'galileo-ai', 'Galileo AI', 'Generative UI from text prompts.', 'Galileo produces high-fidelity interface designs exportable to Figma.', 'Sparkle', 'https://www.usegalileo.ai', 'https://www.google.com/s2/favicons?domain=usegalileo.ai&sz=128', 'design-ai', ARRAY['UI','Figma'], 510, 89, 'Freemium', 4.5, 10, true, false, ARRAY['Generative UI from text prompts.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'framer-ai', 'framer-ai', 'Framer', 'AI website builder and hosting.', 'Framer generates responsive marketing sites with animations and CMS.', 'Sparkle', 'https://www.framer.com', 'https://www.google.com/s2/favicons?domain=framer.com&sz=128', 'design-ai', ARRAY['Web','No-code'], 580, 81, 'Freemium', 4.5, 10, false, false, ARRAY['AI website builder and hosting.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'looka', 'looka', 'Looka', 'AI logo and brand kit generator.', 'Looka creates logos, colors, and brand assets for startups.', 'Sparkle', 'https://looka.com', 'https://www.google.com/s2/favicons?domain=looka.com&sz=128', 'design-ai', ARRAY['Logo','Branding'], 440, 139, 'Paid', 4.5, 10, false, false, ARRAY['AI logo and brand kit generator.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'designs-ai', 'designs-ai', 'Designs.ai', 'Logos, videos, and mockups suite.', 'Designs.ai bundles copy, voice, video, and design tools for marketers.', 'Sparkle', 'https://designs.ai', 'https://www.google.com/s2/favicons?domain=designs.ai&sz=128', 'design-ai', ARRAY['Suite','Marketing'], 320, 56, 'Freemium', 4.5, 10, false, false, ARRAY['Logos, videos, and mockups suite.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'khroma', 'khroma', 'Khroma', 'AI color palette generator.', 'Khroma learns your taste and generates unlimited color combinations for UI.', 'Sparkle', 'https://www.khroma.co', 'https://www.google.com/s2/favicons?domain=khroma.co&sz=128', 'design-ai', ARRAY['Color','UI'], 280, 98, 'Free', 4.5, 10, false, false, ARRAY['AI color palette generator.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'magician-figma', 'magician-figma', 'Magician for Figma', 'AI design plugin by Diagram.', 'Magician generates icons, copy, and images inside Figma with one click.', 'Sparkle', 'https://magician.design', 'https://www.google.com/s2/favicons?domain=magician.design&sz=128', 'design-ai', ARRAY['Plugin','Figma'], 350, 110, 'Freemium', 4.5, 10, false, false, ARRAY['AI design plugin by Diagram.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'relume', 'relume', 'Relume', 'AI sitemap and wireframe for Webflow.', 'Relume builds site maps, wireframes, and style guides for agencies.', 'Sparkle', 'https://www.relume.io', 'https://www.google.com/s2/favicons?domain=relume.io&sz=128', 'design-ai', ARRAY['Webflow','Sitemap'], 390, 137, 'Freemium', 4.5, 10, false, false, ARRAY['AI sitemap and wireframe for Webflow.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'beautiful-ai', 'beautiful-ai', 'Beautiful.ai', 'AI presentation designer.', 'Beautiful.ai formats slides automatically with smart templates and charts.', 'Sparkle', 'https://www.beautiful.ai', 'https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128', 'design-ai', ARRAY['Slides','Deck'], 410, 100, 'Freemium', 4.5, 10, false, false, ARRAY['AI presentation designer.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'tome', 'tome', 'Tome', 'AI storytelling presentations.', 'Tome generates narrative decks with images and layouts from prompts.', 'Sparkle', 'https://tome.app', 'https://www.google.com/s2/favicons?domain=tome.app&sz=128', 'design-ai', ARRAY['Story','Deck'], 360, 101, 'Freemium', 4.5, 10, false, false, ARRAY['AI storytelling presentations.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'microsoft-designer', 'microsoft-designer', 'Microsoft Designer', 'AI graphic design with DALL·E.', 'Designer creates social posts, invitations, and visuals with Copilot integration.', 'Sparkle', 'https://designer.microsoft.com', 'https://www.google.com/s2/favicons?domain=designer.microsoft.com&sz=128', 'design-ai', ARRAY['Microsoft','Social'], 480, 67, 'Free', 4.5, 10, false, false, ARRAY['AI graphic design with DALL·E.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'rytr', 'rytr', 'Rytr', 'AI writing for blogs and emails.', 'Rytr generates short and long-form copy in 40+ use cases with tone control.', 'PenLine', 'https://rytr.me', 'https://www.google.com/s2/favicons?domain=rytr.me&sz=128', 'ai-writing', ARRAY['Blog','Email'], 540, 151, 'Freemium', 4.5, 10, false, false, ARRAY['AI writing for blogs and emails.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'wordtune', 'wordtune', 'Wordtune', 'Rewrite and refine your sentences.', 'Wordtune improves clarity, tone, and length of any text in browsers and docs.', 'Sparkle', 'https://www.wordtune.com', 'https://www.google.com/s2/favicons?domain=wordtune.com&sz=128', 'ai-writing', ARRAY['Rewrite','Editor'], 610, 256, 'Freemium', 4.5, 10, false, false, ARRAY['Rewrite and refine your sentences.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'quillbot', 'quillbot', 'QuillBot', 'Paraphrasing and grammar suite.', 'QuillBot paraphrases, summarizes, and checks grammar for students and professionals.', 'Sparkle', 'https://quillbot.com', 'https://www.google.com/s2/favicons?domain=quillbot.com&sz=128', 'ai-writing', ARRAY['Paraphrase','Grammar'], 720, 302, 'Freemium', 4.5, 10, true, false, ARRAY['Paraphrasing and grammar suite.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'prowritingaid', 'prowritingaid', 'ProWritingAid', 'In-depth writing analysis.', 'ProWritingAid offers style, grammar, and readability reports for authors.', 'Sparkle', 'https://prowritingaid.com', 'https://www.google.com/s2/favicons?domain=prowritingaid.com&sz=128', 'ai-writing', ARRAY['Grammar','Style'], 480, 134, 'Freemium', 4.5, 10, false, false, ARRAY['In-depth writing analysis.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'sudowrite', 'sudowrite', 'Sudowrite', 'AI writing partner for fiction.', 'Sudowrite helps novelists with scenes, dialogue, and creative brainstorming.', 'Sparkle', 'https://www.sudowrite.com', 'https://www.google.com/s2/favicons?domain=sudowrite.com&sz=128', 'ai-writing', ARRAY['Fiction','Creative'], 390, 55, 'Paid', 4.5, 10, false, false, ARRAY['AI writing partner for fiction.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'novelai', 'novelai', 'NovelAI', 'AI-assisted storytelling.', 'NovelAI provides lorebooks, memory, and prose generation for fiction writers.', 'Sparkle', 'https://novelai.net', 'https://www.google.com/s2/favicons?domain=novelai.net&sz=128', 'ai-writing', ARRAY['Fiction','Story'], 420, 162, 'Paid', 4.5, 10, false, false, ARRAY['AI-assisted storytelling.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'hyperwrite', 'hyperwrite', 'HyperWrite', 'Personal writing assistant in Chrome.', 'HyperWrite drafts emails, documents, and replies contextually in your browser.', 'Sparkle', 'https://www.hyperwriteai.com', 'https://www.google.com/s2/favicons?domain=hyperwriteai.com&sz=128', 'ai-writing', ARRAY['Chrome','Assistant'], 360, 63, 'Freemium', 4.5, 10, false, false, ARRAY['Personal writing assistant in Chrome.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'lex', 'lex', 'Lex', 'Modern document editor with AI.', 'Lex is a collaborative writing app with AI outlining and drafting built in.', 'Sparkle', 'https://lex.page', 'https://www.google.com/s2/favicons?domain=lex.page&sz=128', 'ai-writing', ARRAY['Docs','Editor'], 310, 76, 'Freemium', 4.5, 10, false, false, ARRAY['Modern document editor with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'hemingway-editor', 'hemingway-editor', 'Hemingway Editor', 'Bold, clear writing feedback.', 'Hemingway highlights complex sentences and suggests simpler alternatives.', 'Sparkle', 'https://hemingwayapp.com', 'https://www.google.com/s2/favicons?domain=hemingwayapp.com&sz=128', 'ai-writing', ARRAY['Clarity','Editor'], 450, 173, 'Freemium', 4.5, 10, false, false, ARRAY['Bold, clear writing feedback.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'writer', 'writer', 'Writer', 'Enterprise AI writing platform.', 'Writer enforces brand voice and terminology across marketing and support teams.', 'Sparkle', 'https://writer.com', 'https://www.google.com/s2/favicons?domain=writer.com&sz=128', 'ai-writing', ARRAY['Enterprise','Brand'], 340, 119, 'Paid', 4.5, 10, false, false, ARRAY['Enterprise AI writing platform.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'longshot', 'longshot', 'Longshot AI', 'Fact-checked long-form content.', 'Longshot researches topics and generates blog posts with citations.', 'Sparkle', 'https://www.longshot.ai', 'https://www.google.com/s2/favicons?domain=longshot.ai&sz=128', 'ai-writing', ARRAY['Blog','SEO'], 280, 118, 'Freemium', 4.5, 10, false, false, ARRAY['Fact-checked long-form content.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'hypotenuse', 'hypotenuse', 'Hypotenuse AI', 'Product descriptions at scale.', 'Hypotenuse generates ecommerce copy, ads, and blog content from product data.', 'Sparkle', 'https://www.hypotenuse.ai', 'https://www.google.com/s2/favicons?domain=hypotenuse.ai&sz=128', 'ai-writing', ARRAY['Ecommerce','Copy'], 300, 53, 'Freemium', 4.5, 10, false, false, ARRAY['Product descriptions at scale.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'textcortex', 'textcortex', 'TextCortex', 'AI writing in 25+ languages.', 'TextCortex creates and edits content inside browsers with custom personas.', 'Sparkle', 'https://textcortex.com', 'https://www.google.com/s2/favicons?domain=textcortex.com&sz=128', 'ai-writing', ARRAY['Multilingual','Personas'], 320, 56, 'Freemium', 4.5, 10, false, false, ARRAY['AI writing in 25+ languages.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'scribe', 'scribe', 'Scribe', 'How-to guides from screen recordings.', 'Scribe auto-generates step-by-step documentation from your workflow captures.', 'Sparkle', 'https://scribehow.com', 'https://www.google.com/s2/favicons?domain=scribehow.com&sz=128', 'ai-writing', ARRAY['Docs','SOP'], 410, 144, 'Freemium', 4.5, 10, false, false, ARRAY['How-to guides from screen recordings.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'photoroom', 'photoroom', 'Photoroom', 'AI product photos and backgrounds.', 'Photoroom removes backgrounds and generates studio-quality product shots instantly.', 'Sparkle', 'https://www.photoroom.com', 'https://www.google.com/s2/favicons?domain=photoroom.com&sz=128', 'image-generation', ARRAY['Ecommerce','Background'], 650, 91, 'Freemium', 4.5, 10, false, false, ARRAY['AI product photos and backgrounds.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'remove-bg', 'remove-bg', 'remove.bg', 'One-click background removal.', 'Remove.bg extracts subjects from photos with high accuracy for designers and shops.', 'Sparkle', 'https://www.remove.bg', 'https://www.google.com/s2/favicons?domain=remove.bg&sz=128', 'image-generation', ARRAY['Cutout','API'], 590, 83, 'Freemium', 4.5, 10, false, false, ARRAY['One-click background removal.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'freepik-ai', 'freepik-ai', 'Freepik AI', 'Stock plus generative image suite.', 'Freepik combines stock assets with AI image generation and editing tools.', 'Sparkle', 'https://www.freepik.com/ai', 'https://www.google.com/s2/favicons?domain=freepik.com&sz=128', 'image-generation', ARRAY['Stock','Generate'], 520, 91, 'Freemium', 4.5, 10, false, false, ARRAY['Stock plus generative image suite.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'krea-ai', 'krea-ai', 'Krea AI', 'Real-time generative canvas.', 'Krea offers live image generation and upscaling for designers iterating fast.', 'Sparkle', 'https://www.krea.ai', 'https://www.google.com/s2/favicons?domain=krea.ai&sz=128', 'image-generation', ARRAY['Realtime','Canvas'], 470, 181, 'Freemium', 4.5, 10, true, false, ARRAY['Real-time generative canvas.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'recraft', 'recraft', 'Recraft', 'Vector and brand-style image AI.', 'Recraft generates consistent brand illustrations and vector graphics.', 'Sparkle', 'https://www.recraft.ai', 'https://www.google.com/s2/favicons?domain=recraft.ai&sz=128', 'image-generation', ARRAY['Vector','Brand'], 380, 146, 'Freemium', 4.5, 10, false, false, ARRAY['Vector and brand-style image AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'getimg-ai', 'getimg-ai', 'getimg.ai', 'All-in-one AI image toolkit.', 'getimg.ai provides generation, inpainting, and upscaling in one web studio.', 'Sparkle', 'https://getimg.ai', 'https://www.google.com/s2/favicons?domain=getimg.ai&sz=128', 'image-generation', ARRAY['Toolkit','Inpaint'], 340, 48, 'Freemium', 4.5, 10, false, false, ARRAY['All-in-one AI image toolkit.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'haiper', 'haiper', 'Haiper', 'Creative AI video generation.', 'Haiper turns prompts and images into stylized short video clips.', 'Sparkle', 'https://haiper.ai', 'https://www.google.com/s2/favicons?domain=haiper.ai&sz=128', 'video-generation', ARRAY['Creative','Short'], 410, 144, 'Freemium', 4.5, 10, false, false, ARRAY['Creative AI video generation.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'pixverse', 'pixverse', 'PixVerse', 'AI video from text and images.', 'PixVerse creates cinematic clips with motion control and style presets.', 'Sparkle', 'https://pixverse.ai', 'https://www.google.com/s2/favicons?domain=pixverse.ai&sz=128', 'video-generation', ARRAY['Cinematic','Motion'], 380, 160, 'Freemium', 4.5, 10, false, false, ARRAY['AI video from text and images.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'colossyan', 'colossyan', 'Colossyan', 'AI video for L&D teams.', 'Colossyan builds training videos with avatars and PPT-to-video workflows.', 'Sparkle', 'https://www.colossyan.com', 'https://www.google.com/s2/favicons?domain=colossyan.com&sz=128', 'video-generation', ARRAY['Training','Avatar'], 350, 49, 'Paid', 4.5, 10, false, false, ARRAY['AI video for L&D teams.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'elai', 'elai', 'Elai.io', 'Text to video with avatars.', 'Elai generates presenter videos from slides and scripts in minutes.', 'Sparkle', 'https://elai.io', 'https://www.google.com/s2/favicons?domain=elai.io&sz=128', 'video-generation', ARRAY['Avatar','Slides'], 320, 90, 'Freemium', 4.5, 10, false, false, ARRAY['Text to video with avatars.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'kapwing', 'kapwing', 'Kapwing', 'Collaborative video editor with AI.', 'Kapwing offers subtitles, resizing, and AI edits for social video teams.', 'Sparkle', 'https://www.kapwing.com', 'https://www.google.com/s2/favicons?domain=kapwing.com&sz=128', 'video-generation', ARRAY['Social','Editor'], 440, 169, 'Freemium', 4.5, 10, false, false, ARRAY['Collaborative video editor with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'cline', 'cline', 'Cline', 'Autonomous coding agent in VS Code.', 'Cline plans and executes multi-file edits with terminal access in your IDE.', 'Sparkle', 'https://cline.bot', 'https://www.google.com/s2/favicons?domain=cline.bot&sz=128', 'coding', ARRAY['Agent','VS Code'], 580, 183, 'Open Source', 4.5, 10, true, false, ARRAY['Autonomous coding agent in VS Code.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'aider', 'aider', 'Aider', 'AI pair programming in the terminal.', 'Aider edits git-tracked codebases via CLI with GPT and Claude models.', 'Sparkle', 'https://aider.chat', 'https://www.google.com/s2/favicons?domain=aider.chat&sz=128', 'coding', ARRAY['CLI','Git'], 490, 154, 'Open Source', 4.5, 10, false, false, ARRAY['AI pair programming in the terminal.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'jetbrains-ai', 'jetbrains-ai', 'JetBrains AI', 'AI assistant in IntelliJ and family.', 'JetBrains AI adds chat, completion, and refactoring across JetBrains IDEs.', 'Sparkle', 'https://www.jetbrains.com/ai/', 'https://www.google.com/s2/favicons?domain=jetbrains.com&sz=128', 'coding', ARRAY['IDE','Java'], 420, 103, 'Freemium', 4.5, 10, false, false, ARRAY['AI assistant in IntelliJ and family.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'poolside', 'poolside', 'Poolside', 'Enterprise code generation platform.', 'Poolside trains and deploys private models for large engineering organizations.', 'Sparkle', 'https://poolside.ai', 'https://www.google.com/s2/favicons?domain=poolside.ai&sz=128', 'coding', ARRAY['Enterprise','Private'], 220, 92, 'Paid', 4.5, 10, false, false, ARRAY['Enterprise code generation platform.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'sweep-ai', 'sweep-ai', 'Sweep AI', 'AI junior developer for GitHub.', 'Sweep opens pull requests that fix bugs and implement small features from issues.', 'Sparkle', 'https://sweep.dev', 'https://www.google.com/s2/favicons?domain=sweep.dev&sz=128', 'coding', ARRAY['GitHub','PR'], 360, 151, 'Freemium', 4.5, 10, false, false, ARRAY['AI junior developer for GitHub.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'linear-ai', 'linear-ai', 'Linear', 'AI-assisted issue tracking.', 'Linear speeds up product teams with AI summaries, triage, and project insights.', 'Sparkle', 'https://linear.app', 'https://www.google.com/s2/favicons?domain=linear.app&sz=128', 'productivity', ARRAY['PM','Issues'], 480, 67, 'Freemium', 4.5, 10, false, false, ARRAY['AI-assisted issue tracking.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'todoist-ai', 'todoist-ai', 'Todoist', 'Smart task planning with AI.', 'Todoist uses AI to break down goals, schedule tasks, and draft action plans.', 'Sparkle', 'https://todoist.com', 'https://www.google.com/s2/favicons?domain=todoist.com&sz=128', 'productivity', ARRAY['Tasks','Planning'], 520, 91, 'Freemium', 4.5, 10, false, false, ARRAY['Smart task planning with AI.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'clickup-ai', 'clickup-ai', 'ClickUp AI', 'AI across docs, tasks, and wikis.', 'ClickUp embeds writing, summarization, and automation in one workspace.', 'Sparkle', 'https://clickup.com/ai', 'https://www.google.com/s2/favicons?domain=clickup.com&sz=128', 'productivity', ARRAY['Workspace','PM'], 450, 79, 'Freemium', 4.5, 10, false, false, ARRAY['AI across docs, tasks, and wikis.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'coda-ai', 'coda-ai', 'Coda AI', 'Docs that run your team workflows.', 'Coda combines documents, tables, and AI automations for ops teams.', 'Sparkle', 'https://coda.io', 'https://www.google.com/s2/favicons?domain=coda.io&sz=128', 'productivity', ARRAY['Docs','Automation'], 390, 150, 'Freemium', 4.5, 10, false, false, ARRAY['Docs that run your team workflows.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
INSERT INTO tools (id, slug, name, tagline, description, icon, url, logo_url, category_id, tags, votes, bookmarks_count, pricing, rating, reviews_count, is_trending, is_featured, features, status) VALUES (
  'read-ai', 'read-ai', 'Read AI', 'Meeting summaries and search.', 'Read captures meeting notes, highlights, and coaching across Zoom and Teams.', 'Sparkle', 'https://www.read.ai', 'https://www.google.com/s2/favicons?domain=read.ai&sz=128', 'productivity', ARRAY['Meetings','Summary'], 410, 158, 'Freemium', 4.5, 10, false, false, ARRAY['Meeting summaries and search.'], 'published'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, tagline = EXCLUDED.tagline, description = EXCLUDED.description,
  url = EXCLUDED.url, logo_url = EXCLUDED.logo_url, category_id = EXCLUDED.category_id,
  tags = EXCLUDED.tags, votes = EXCLUDED.votes, bookmarks_count = EXCLUDED.bookmarks_count,
  pricing = EXCLUDED.pricing, status = 'published';
