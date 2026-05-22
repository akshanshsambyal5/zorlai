import { buildTool, type CategorySeed, type ToolSeed } from './catalogHelpers';

export const CATEGORY_SEEDS: CategorySeed[] = [
  { id: 'image-generation', name: 'Image Generation', icon: 'Palette', description: 'AI image creators, editors, and upscalers.', sort_order: 1 },
  { id: 'video-generation', name: 'Video Generation', icon: 'Video', description: 'Text-to-video, avatars, and video editing AI.', sort_order: 2 },
  { id: 'coding', name: 'Coding', icon: 'Code2', description: 'AI coding assistants, agents, and app builders.', sort_order: 3 },
  { id: 'chatbots', name: 'Chatbots', icon: 'Brain', description: 'Conversational AI assistants and LLM chat apps.', sort_order: 4 },
  { id: 'productivity', name: 'Productivity', icon: 'Calendar', description: 'Writing, notes, meetings, and workflow automation.', sort_order: 5 },
  { id: 'voice-ai', name: 'Voice AI', icon: 'Volume2', description: 'Voice cloning, TTS, transcription, and dubbing.', sort_order: 6 },
  { id: 'music-ai', name: 'Music AI', icon: 'Speech', description: 'AI music composition and audio generation.', sort_order: 7 },
  { id: 'research-ai', name: 'Research AI', icon: 'Compass', description: 'Literature search, citations, and academic tools.', sort_order: 8 },
  { id: 'marketing-ai', name: 'Marketing AI', icon: 'Activity', description: 'Copy, ads, SEO, and social content generation.', sort_order: 9 },
  { id: 'design-ai', name: 'Design AI', icon: 'Layers', description: 'UI, branding, presentations, and design automation.', sort_order: 10 },
];

const img = 'image-generation';
const vid = 'video-generation';
const code = 'coding';
const chat = 'chatbots';
const prod = 'productivity';
const voice = 'voice-ai';
const music = 'music-ai';
const research = 'research-ai';
const mkt = 'marketing-ai';
const design = 'design-ai';

export const TOOL_SEEDS: ToolSeed[] = [
  // Image Generation (12)
  buildTool('midjourney', 'Midjourney', 'High-quality AI art from text prompts.', 'Midjourney generates stunning images from natural language prompts with strong aesthetic control and community workflows.', 'https://www.midjourney.com', img, { tags: ['Art', 'Diffusion'], pricing: 'Paid', icon: 'Palette', is_featured: true, is_trending: true, votes: 920 }),
  buildTool('dalle', 'DALL·E', 'OpenAI image generation inside ChatGPT.', 'Create and edit images with DALL·E integrated in ChatGPT for quick concept art and marketing visuals.', 'https://chat.openai.com', img, { tags: ['OpenAI', 'Editing'], pricing: 'Freemium', icon: 'Sparkles', votes: 880 }),
  buildTool('stable-diffusion', 'Stable Diffusion', 'Open ecosystem for generative image models.', 'Stability AI provides open and commercial diffusion models for local and cloud image generation.', 'https://stability.ai', img, { tags: ['Open Source', 'API'], pricing: 'Freemium', icon: 'Layers', votes: 760 }),
  buildTool('leonardo-ai', 'Leonardo AI', 'Game assets and creative image workflows.', 'Leonardo AI offers fine-tuned models for characters, textures, and production-ready creative assets.', 'https://leonardo.ai', img, { tags: ['Gaming', 'Assets'], pricing: 'Freemium', votes: 540 }),
  buildTool('adobe-firefly', 'Adobe Firefly', 'Commercial-safe generative images in Creative Cloud.', 'Firefly integrates generative fill and text-to-image across Photoshop and Express with IP-safe training.', 'https://firefly.adobe.com', img, { tags: ['Adobe', 'Commercial'], pricing: 'Freemium', votes: 610 }),
  buildTool('ideogram', 'Ideogram', 'AI images with reliable text rendering.', 'Ideogram excels at typography inside images for posters, logos, and social creatives.', 'https://ideogram.ai', img, { tags: ['Typography', 'Design'], pricing: 'Freemium', is_trending: true, votes: 490 }),
  buildTool('flux', 'FLUX', 'Frontier open-weight image models by Black Forest Labs.', 'FLUX delivers photorealistic generation with fast inference and developer-friendly APIs.', 'https://blackforestlabs.ai', img, { tags: ['Photorealistic', 'API'], pricing: 'Freemium', votes: 430 }),
  buildTool('playground-ai', 'Playground AI', 'Freeform canvas for image generation and editing.', 'Playground combines diffusion models with inpainting and style controls for creators.', 'https://playground.com', img, { tags: ['Canvas', 'Inpaint'], pricing: 'Freemium', votes: 380 }),
  buildTool('canva-ai', 'Canva AI', 'Magic design tools inside Canva.', 'Generate images, layouts, and copy directly in Canva for marketing and social teams.', 'https://www.canva.com', img, { tags: ['Marketing', 'Templates'], pricing: 'Freemium', votes: 720 }),
  buildTool('clipdrop', 'Clipdrop', 'AI photo editing and cleanup by Stability.', 'Remove backgrounds, upscale, relight, and edit photos with one-click AI tools.', 'https://clipdrop.co', img, { tags: ['Editing', 'Upscale'], pricing: 'Freemium', votes: 350 }),
  buildTool('nightcafe', 'NightCafe', 'Community-driven AI art generator.', 'NightCafe offers multiple algorithms and daily challenges for AI art enthusiasts.', 'https://creator.nightcafe.studio', img, { tags: ['Community', 'Art'], pricing: 'Freemium', votes: 290 }),
  buildTool('craiyon', 'Craiyon', 'Free AI image generator from text.', 'Formerly DALL·E mini, Craiyon provides quick free image generation for experiments.', 'https://www.craiyon.com', img, { tags: ['Free', 'Quick'], pricing: 'Free', votes: 410 }),

  // Video Generation (12)
  buildTool('runway', 'Runway', 'Professional AI video and Gen-3 models.', 'Runway powers text-to-video, image-to-video, and advanced editing for filmmakers and creators.', 'https://runwayml.com', vid, { tags: ['Gen-3', 'Film'], pricing: 'Freemium', icon: 'Video', is_featured: true, is_trending: true, votes: 850 }),
  buildTool('pika', 'Pika', 'Creative text and image to video.', 'Pika generates short cinematic clips with camera motion and style presets.', 'https://pika.art', vid, { tags: ['Short-form', 'Social'], pricing: 'Freemium', votes: 620 }),
  buildTool('synthesia', 'Synthesia', 'AI avatar videos for business.', 'Create presenter videos from text in 140+ languages with custom avatars.', 'https://www.synthesia.io', vid, { tags: ['Avatars', 'Enterprise'], pricing: 'Paid', votes: 580 }),
  buildTool('heygen', 'HeyGen', 'AI video avatars and translation.', 'HeyGen produces marketing and training videos with realistic avatars and voice sync.', 'https://www.heygen.com', vid, { tags: ['Avatars', 'Marketing'], pricing: 'Freemium', votes: 540 }),
  buildTool('luma-dream-machine', 'Luma Dream Machine', 'High-quality video from text and images.', 'Luma AI Dream Machine generates coherent motion and cinematic shots from prompts.', 'https://lumalabs.ai', vid, { tags: ['Cinematic', '3D'], pricing: 'Freemium', is_trending: true, votes: 490 }),
  buildTool('kling-ai', 'Kling AI', 'Long-form AI video generation.', 'Kling creates detailed video clips with strong physics and character consistency.', 'https://klingai.com', vid, { tags: ['Long-form', 'Motion'], pricing: 'Freemium', votes: 450 }),
  buildTool('capcut', 'CapCut', 'AI editing and effects for short video.', 'CapCut includes auto-captions, AI effects, and templates for TikTok and Reels.', 'https://www.capcut.com', vid, { tags: ['Editing', 'Social'], pricing: 'Free', votes: 780 }),
  buildTool('descript', 'Descript', 'Edit video by editing text.', 'Descript combines transcription, overdub, and AI video editing in one timeline.', 'https://www.descript.com', vid, { tags: ['Podcast', 'Edit'], pricing: 'Freemium', votes: 520 }),
  buildTool('invideo-ai', 'InVideo AI', 'Script to published video in minutes.', 'Turn a topic into a full video with stock, voiceover, and scene generation.', 'https://invideo.io', vid, { tags: ['Marketing', 'Templates'], pricing: 'Freemium', votes: 440 }),
  buildTool('fliki', 'Fliki', 'Text to video with AI voices.', 'Fliki converts blog posts and scripts into narrated videos with media libraries.', 'https://fliki.ai', vid, { tags: ['Voiceover', 'Blog'], pricing: 'Freemium', votes: 360 }),
  buildTool('veed', 'VEED.IO', 'Online video editor with AI tools.', 'VEED offers subtitles, background removal, and AI avatars for quick video production.', 'https://www.veed.io', vid, { tags: ['Subtitles', 'Editor'], pricing: 'Freemium', votes: 400 }),
  buildTool('opus-clip', 'Opus Clip', 'Turn long videos into viral shorts.', 'Opus uses AI to find highlights and reframe clips for social platforms.', 'https://www.opus.pro', vid, { tags: ['Clips', 'Social'], pricing: 'Freemium', votes: 470 }),

  // Coding (14)
  buildTool('github-copilot', 'GitHub Copilot', 'AI pair programmer in your IDE.', 'Copilot suggests code, tests, and explanations across VS Code, JetBrains, and more.', 'https://github.com/features/copilot', code, { tags: ['IDE', 'Microsoft'], pricing: 'Paid', icon: 'Terminal', is_featured: true, votes: 950 }),
  buildTool('cursor', 'Cursor', 'AI-first code editor.', 'Cursor is a VS Code fork with deep AI chat, codebase context, and agentic edits.', 'https://cursor.com', code, { tags: ['Editor', 'Agent'], pricing: 'Freemium', is_trending: true, votes: 890 }),
  buildTool('windsurf', 'Windsurf', 'Agentic IDE by Codeium.', 'Windsurf flows between planning and multi-file edits with strong context awareness.', 'https://codeium.com/windsurf', code, { tags: ['Agent', 'IDE'], pricing: 'Freemium', votes: 620 }),
  buildTool('replit', 'Replit', 'Build and deploy apps with AI.', 'Replit Agent generates full-stack apps, runs code in the cloud, and deploys instantly.', 'https://replit.com', code, { tags: ['Deploy', 'Full-stack'], pricing: 'Freemium', votes: 580 }),
  buildTool('codeium', 'Codeium', 'Free AI autocomplete and chat.', 'Codeium provides fast completions and chat for 70+ languages with a generous free tier.', 'https://codeium.com', code, { tags: ['Free', 'Autocomplete'], pricing: 'Free', votes: 540 }),
  buildTool('tabnine', 'Tabnine', 'Private AI code completion.', 'Tabnine offers on-prem and local models for enterprises needing code privacy.', 'https://www.tabnine.com', code, { tags: ['Enterprise', 'Privacy'], pricing: 'Freemium', votes: 380 }),
  buildTool('amazon-q-developer', 'Amazon Q Developer', 'AWS AI assistant for building on cloud.', 'Q Developer helps with AWS services, infrastructure code, and application debugging.', 'https://aws.amazon.com/q/developer/', code, { tags: ['AWS', 'Cloud'], pricing: 'Freemium', votes: 320 }),
  buildTool('sourcegraph-cody', 'Sourcegraph Cody', 'AI that knows your entire codebase.', 'Cody answers questions and writes patches using enterprise code search context.', 'https://sourcegraph.com/cody', code, { tags: ['Enterprise', 'Search'], pricing: 'Freemium', votes: 350 }),
  buildTool('continue', 'Continue', 'Open-source AI code assistant.', 'Continue connects Ollama, OpenAI, and other models inside VS Code and JetBrains.', 'https://continue.dev', code, { tags: ['Open Source', 'Local'], pricing: 'Open Source', votes: 410 }),
  buildTool('bolt-new', 'bolt.new', 'Prompt to full-stack web app.', 'StackBlitz bolt.new generates and runs React apps in the browser from a single prompt.', 'https://bolt.new', code, { tags: ['Web', 'React'], pricing: 'Freemium', is_trending: true, votes: 720 }),
  buildTool('v0', 'v0 by Vercel', 'Generative UI with shadcn and Tailwind.', 'v0 turns prompts into production-ready React components and pages.', 'https://v0.dev', code, { tags: ['UI', 'Vercel'], pricing: 'Freemium', votes: 680 }),
  buildTool('lovable', 'Lovable', 'AI app builder for startups.', 'Lovable ships full-stack apps with auth, database, and deploy from natural language.', 'https://lovable.dev', code, { tags: ['Startup', 'Full-stack'], pricing: 'Freemium', votes: 560 }),
  buildTool('phind', 'Phind', 'AI search for developers.', 'Phind combines web search with code-aware answers for debugging and learning.', 'https://www.phind.com', code, { tags: ['Search', 'Debug'], pricing: 'Freemium', votes: 440 }),
  buildTool('mintlify', 'Mintlify', 'AI documentation for codebases.', 'Mintlify auto-generates and maintains developer docs from your repository.', 'https://mintlify.com', code, { tags: ['Docs', 'DevRel'], pricing: 'Freemium', votes: 290 }),

  // Chatbots (12)
  buildTool('chatgpt', 'ChatGPT', 'OpenAI conversational assistant.', 'ChatGPT offers GPT-4o reasoning, browsing, code, images, and custom GPTs for everyday tasks.', 'https://chat.openai.com', chat, { tags: ['GPT-4', 'General'], pricing: 'Freemium', icon: 'Brain', is_featured: true, is_trending: true, votes: 1200 }),
  buildTool('claude', 'Claude', 'Anthropic AI assistant for work.', 'Claude excels at long documents, analysis, coding, and safe enterprise deployments.', 'https://claude.ai', chat, { tags: ['Anthropic', 'Enterprise'], pricing: 'Freemium', votes: 980 }),
  buildTool('gemini', 'Google Gemini', 'Google multimodal AI assistant.', 'Gemini integrates Search, Workspace, and deep reasoning across text, image, and video.', 'https://gemini.google.com', chat, { tags: ['Google', 'Multimodal'], pricing: 'Freemium', votes: 900 }),
  buildTool('perplexity', 'Perplexity', 'Answer engine with live citations.', 'Perplexity searches the web and cites sources for research-grade answers.', 'https://www.perplexity.ai', research, { tags: ['Search', 'Citations'], pricing: 'Freemium', is_featured: true, votes: 860 }),
  buildTool('poe', 'Poe', 'Access many AI models in one app.', 'Poe lets you chat with GPT, Claude, Gemini, and community bots in a single interface.', 'https://poe.com', chat, { tags: ['Multi-model', 'Bots'], pricing: 'Freemium', votes: 520 }),
  buildTool('microsoft-copilot', 'Microsoft Copilot', 'AI across Windows and Microsoft 365.', 'Copilot assists with Office, Edge, and Windows using GPT and enterprise data.', 'https://copilot.microsoft.com', chat, { tags: ['Microsoft', 'Office'], pricing: 'Freemium', votes: 640 }),
  buildTool('mistral-le-chat', 'Le Chat', 'Mistral AI European assistant.', 'Le Chat runs Mistral large models with fast inference and open-weight options.', 'https://chat.mistral.ai', chat, { tags: ['Mistral', 'EU'], pricing: 'Freemium', votes: 380 }),
  buildTool('character-ai', 'Character.AI', 'Chat with custom AI personas.', 'Create and talk to characters for entertainment, roleplay, and creative writing.', 'https://character.ai', chat, { tags: ['Personas', 'Creative'], pricing: 'Freemium', votes: 710 }),
  buildTool('pi', 'Pi', 'Personal intelligence by Inflection.', 'Pi offers empathetic, conversational assistance focused on everyday support.', 'https://pi.ai', chat, { tags: ['Personal', 'Voice'], pricing: 'Free', votes: 340 }),
  buildTool('huggingchat', 'HuggingChat', 'Open models chat by Hugging Face.', 'Chat with open-source LLMs hosted on Hugging Face with community models.', 'https://huggingface.co/chat', chat, { tags: ['Open Source', 'OSS'], pricing: 'Free', votes: 360 }),
  buildTool('you-com', 'You.com', 'AI search and chat portal.', 'You.com combines AI answers with web results and specialized agents.', 'https://you.com', chat, { tags: ['Search', 'Agents'], pricing: 'Freemium', votes: 310 }),
  buildTool('meta-ai', 'Meta AI', 'AI assistant across Instagram and WhatsApp.', 'Meta AI generates images and answers inside Meta apps and on the web.', 'https://www.meta.ai', chat, { tags: ['Meta', 'Social'], pricing: 'Free', votes: 450 }),

  // Productivity (12)
  buildTool('notion-ai', 'Notion AI', 'AI writing inside Notion workspaces.', 'Summarize, draft, and organize knowledge across docs and wikis with Notion AI.', 'https://www.notion.so/product/ai', prod, { tags: ['Notes', 'Wiki'], pricing: 'Freemium', icon: 'Calendar', votes: 720 }),
  buildTool('otter-ai', 'Otter.ai', 'AI meeting notes and transcription.', 'Otter records, transcribes, and summarizes meetings with speaker identification.', 'https://otter.ai', prod, { tags: ['Meetings', 'Transcription'], pricing: 'Freemium', votes: 580 }),
  buildTool('fireflies', 'Fireflies.ai', 'Conversation intelligence for teams.', 'Fireflies captures meeting notes, action items, and CRM integrations automatically.', 'https://fireflies.ai', prod, { tags: ['CRM', 'Teams'], pricing: 'Freemium', votes: 490 }),
  buildTool('motion', 'Motion', 'AI calendar and task planner.', 'Motion auto-schedules tasks and meetings based on priorities and deadlines.', 'https://www.usemotion.com', prod, { tags: ['Calendar', 'Tasks'], pricing: 'Paid', votes: 420 }),
  buildTool('reclaim-ai', 'Reclaim.ai', 'Smart scheduling for busy teams.', 'Reclaim defends focus time and syncs habits across Google Calendar.', 'https://reclaim.ai', prod, { tags: ['Scheduling', 'Focus'], pricing: 'Freemium', votes: 360 }),
  buildTool('mem-ai', 'Mem', 'Self-organizing AI notes.', 'Mem captures ideas and surfaces relevant notes with AI tagging and search.', 'https://mem.ai', prod, { tags: ['Notes', 'Search'], pricing: 'Freemium', votes: 280 }),
  buildTool('taskade', 'Taskade', 'AI project management and agents.', 'Taskade builds workflows, mind maps, and autonomous agents for team productivity.', 'https://www.taskade.com', prod, { tags: ['Projects', 'Agents'], pricing: 'Freemium', votes: 340 }),
  buildTool('grammarly', 'Grammarly', 'AI writing assistant for clarity.', 'Grammarly checks grammar, tone, and clarity across email, docs, and browsers.', 'https://www.grammarly.com', prod, { tags: ['Writing', 'Grammar'], pricing: 'Freemium', votes: 810 }),
  buildTool('superhuman', 'Superhuman', 'Fast email with AI triage.', 'Superhuman uses AI to summarize threads, draft replies, and prioritize inbox.', 'https://superhuman.com', prod, { tags: ['Email', 'Speed'], pricing: 'Paid', votes: 390 }),
  buildTool('trello-ai', 'Atlassian Intelligence', 'AI in Jira and Confluence.', 'Atlassian embeds AI for summarization, generation, and automation across work tools.', 'https://www.atlassian.com/software/artificial-intelligence', prod, { tags: ['Jira', 'Enterprise'], pricing: 'Freemium', votes: 320 }),
  buildTool('slack-ai', 'Slack AI', 'Summaries and search in Slack.', 'Slack AI recaps channels, answers questions, and drafts messages from workspace data.', 'https://slack.com/features/ai', prod, { tags: ['Teams', 'Chat'], pricing: 'Paid', votes: 450 }),
  buildTool('zoom-ai', 'Zoom AI Companion', 'Meeting summaries in Zoom.', 'Zoom AI Companion provides recaps, action items, and chat assistance after calls.', 'https://www.zoom.com/en/products/ai-companion/', prod, { tags: ['Meetings', 'Video'], pricing: 'Freemium', votes: 410 }),

  // Voice AI (11)
  buildTool('elevenlabs', 'ElevenLabs', 'Realistic AI voice and cloning.', 'ElevenLabs offers TTS, voice cloning, dubbing, and sound effects for creators.', 'https://elevenlabs.io', voice, { tags: ['TTS', 'Clone'], pricing: 'Freemium', icon: 'Volume2', is_featured: true, votes: 820 }),
  buildTool('murf-ai', 'Murf AI', 'Studio-quality voiceovers.', 'Murf provides 120+ voices for videos, presentations, and e-learning.', 'https://murf.ai', voice, { tags: ['Voiceover', 'Video'], pricing: 'Freemium', votes: 480 }),
  buildTool('speechify', 'Speechify', 'Text to speech for reading.', 'Speechify reads articles and PDFs aloud with natural celebrity-style voices.', 'https://speechify.com', voice, { tags: ['TTS', 'Accessibility'], pricing: 'Freemium', votes: 520 }),
  buildTool('play-ht', 'Play.ht', 'AI voice generator for content.', 'Generate and clone voices for podcasts, videos, and IVR systems.', 'https://play.ht', voice, { tags: ['Podcast', 'IVR'], pricing: 'Freemium', votes: 360 }),
  buildTool('resemble-ai', 'Resemble AI', 'Custom brand voices at scale.', 'Resemble builds bespoke neural voices with emotion control and real-time API.', 'https://www.resemble.ai', voice, { tags: ['API', 'Brand'], pricing: 'Paid', votes: 290 }),
  buildTool('wellsaid-labs', 'WellSaid Labs', 'Enterprise AI narration.', 'WellSaid creates consistent corporate voice avatars for training and marketing.', 'https://wellsaidlabs.com', voice, { tags: ['Enterprise', 'Narration'], pricing: 'Paid', votes: 250 }),
  buildTool('listnr', 'Listnr', 'Podcast and voice AI platform.', 'Listnr generates podcasts from text with realistic multi-speaker audio.', 'https://www.listnr.tech', voice, { tags: ['Podcast', 'Multi-speaker'], pricing: 'Freemium', votes: 220 }),
  buildTool('assemblyai', 'AssemblyAI', 'Speech-to-text API for developers.', 'AssemblyAI transcribes audio with summarization, moderation, and entity detection.', 'https://www.assemblyai.com', voice, { tags: ['API', 'STT'], pricing: 'Freemium', votes: 340 }),
  buildTool('deepgram', 'Deepgram', 'Fast speech recognition API.', 'Deepgram offers real-time transcription and voice agents with low latency.', 'https://deepgram.com', voice, { tags: ['API', 'Realtime'], pricing: 'Freemium', votes: 310 }),
  buildTool('rev-ai', 'Rev AI', 'Accurate transcription services.', 'Rev provides human and AI transcription for media and legal workflows.', 'https://www.rev.com', voice, { tags: ['Transcription', 'Legal'], pricing: 'Paid', votes: 280 }),
  buildTool('lovo-ai', 'LOVO AI', 'Genny voiceover and video suite.', 'LOVO combines voice synthesis with video editing for marketing content.', 'https://lovo.ai', voice, { tags: ['Video', 'Marketing'], pricing: 'Freemium', votes: 300 }),

  // Music AI (10)
  buildTool('suno', 'Suno', 'Generate full songs from text.', 'Suno creates vocals, lyrics, and instrumentals in many genres from a simple prompt.', 'https://suno.com', music, { tags: ['Songs', 'Vocals'], pricing: 'Freemium', icon: 'Speech', is_trending: true, is_featured: true, votes: 780 }),
  buildTool('udio', 'Udio', 'AI music creation with high fidelity.', 'Udio produces studio-quality tracks with detailed style and structure control.', 'https://www.udio.com', music, { tags: ['Music', 'Studio'], pricing: 'Freemium', votes: 620 }),
  buildTool('aiva', 'AIVA', 'AI composer for soundtracks.', 'AIVA generates orchestral and emotional scores for film, games, and ads.', 'https://www.aiva.ai', music, { tags: ['Orchestral', 'Film'], pricing: 'Freemium', votes: 340 }),
  buildTool('soundraw', 'Soundraw', 'Royalty-free AI music generator.', 'Customize mood, genre, and length for background music without copyright issues.', 'https://soundraw.io', music, { tags: ['Royalty-free', 'BGM'], pricing: 'Freemium', votes: 380 }),
  buildTool('boomy', 'Boomy', 'Create and release songs instantly.', 'Boomy lets anyone make music and distribute to streaming platforms.', 'https://boomy.com', music, { tags: ['Distribution', 'Beginner'], pricing: 'Freemium', votes: 260 }),
  buildTool('mubert', 'Mubert', 'Generative music streams and API.', 'Mubert generates endless royalty-free streams for apps, videos, and focus.', 'https://mubert.com', music, { tags: ['API', 'Stream'], pricing: 'Freemium', votes: 290 }),
  buildTool('beatoven', 'Beatoven.ai', 'AI music for video creators.', 'Beatoven scores videos with mood-based composition and stem control.', 'https://www.beatoven.ai', music, { tags: ['Video', 'Mood'], pricing: 'Freemium', votes: 270 }),
  buildTool('splash-pro', 'Splash Pro', 'AI music for brands and apps.', 'Splash Pro offers composition tools and APIs for interactive music experiences.', 'https://splashmusic.com', music, { tags: ['Brands', 'API'], pricing: 'Freemium', votes: 210 }),
  buildTool('loudly', 'Loudly', 'AI music for social and ads.', 'Loudly generates tracks matched to video length and platform requirements.', 'https://www.loudly.com', music, { tags: ['Social', 'Ads'], pricing: 'Freemium', votes: 230 }),
  buildTool('stable-audio', 'Stable Audio', 'Generative audio by Stability AI.', 'Stable Audio creates music and sound effects with diffusion models.', 'https://stableaudio.com', music, { tags: ['SFX', 'Stability'], pricing: 'Freemium', votes: 320 }),

  // Research AI (11)
  buildTool('elicit', 'Elicit', 'AI research assistant for papers.', 'Elicit finds papers, extracts claims, and compares methods for literature review.', 'https://elicit.com', research, { tags: ['Papers', 'Review'], pricing: 'Freemium', icon: 'Compass', votes: 520 }),
  buildTool('consensus', 'Consensus', 'Scientific answers from peer-reviewed sources.', 'Consensus searches millions of papers to answer yes/no research questions with citations.', 'https://consensus.app', research, { tags: ['Science', 'Citations'], pricing: 'Freemium', is_featured: true, votes: 480 }),
  buildTool('semantic-scholar', 'Semantic Scholar', 'Free AI-powered academic search.', 'Semantic Scholar surfaces influential papers, citations, and TLDR summaries.', 'https://www.semanticscholar.org', research, { tags: ['Academic', 'Free'], pricing: 'Free', votes: 610 }),
  buildTool('scite', 'scite', 'Smart citations and credibility checks.', 'scite shows how papers are supported or contradicted by later research.', 'https://scite.ai', research, { tags: ['Citations', 'Trust'], pricing: 'Freemium', votes: 340 }),
  buildTool('research-rabbit', 'Research Rabbit', 'Visual literature discovery.', 'Research Rabbit maps paper networks and recommends relevant new research.', 'https://www.researchrabbit.ai', research, { tags: ['Discovery', 'Graph'], pricing: 'Free', votes: 380 }),
  buildTool('connected-papers', 'Connected Papers', 'Explore paper graphs visually.', 'Connected Papers generates similarity graphs to find seminal and derivative work.', 'https://www.connectedpapers.com', research, { tags: ['Graph', 'Discovery'], pricing: 'Free', votes: 420 }),
  buildTool('scispace', 'SciSpace', 'Understand papers with AI copilot.', 'SciSpace explains tables, methods, and PDFs with citation-backed chat.', 'https://typeset.io', research, { tags: ['PDF', 'Copilot'], pricing: 'Freemium', votes: 450 }),
  buildTool('arxiv', 'arXiv', 'Open preprint repository for science.', 'arXiv hosts cutting-edge ML, physics, and CS preprints from researchers worldwide.', 'https://arxiv.org', research, { tags: ['Preprints', 'Open'], pricing: 'Free', votes: 890 }),
  buildTool('zotero', 'Zotero', 'Reference manager with AI plugins.', 'Zotero organizes citations and integrates with AI tools for academic writing.', 'https://www.zotero.org', research, { tags: ['Citations', 'Manager'], pricing: 'Free', votes: 520 }),
  buildTool('iris-ai', 'Iris.ai', 'Enterprise research discovery.', 'Iris.ai helps R&D teams map literature and extract structured insights.', 'https://iris.ai', research, { tags: ['Enterprise', 'R&D'], pricing: 'Paid', votes: 180 }),
  buildTool('paperpal', 'Paperpal', 'AI academic writing assistant.', 'Paperpal improves grammar and structure for journal submissions.', 'https://paperpal.com', research, { tags: ['Writing', 'Academic'], pricing: 'Freemium', votes: 310 }),

  // Marketing AI (12)
  buildTool('jasper', 'Jasper', 'AI marketing copilot for teams.', 'Jasper generates brand-consistent copy, campaigns, and images for enterprises.', 'https://www.jasper.ai', mkt, { tags: ['Copy', 'Brand'], pricing: 'Paid', icon: 'Activity', is_featured: true, votes: 640 }),
  buildTool('copy-ai', 'Copy.ai', 'GTM AI for sales and marketing.', 'Copy.ai writes emails, ads, and workflows with templates for growth teams.', 'https://www.copy.ai', mkt, { tags: ['Sales', 'GTM'], pricing: 'Freemium', votes: 520 }),
  buildTool('writesonic', 'Writesonic', 'SEO and content automation.', 'Writesonic creates articles, landing pages, and ads optimized for search.', 'https://writesonic.com', mkt, { tags: ['SEO', 'Content'], pricing: 'Freemium', votes: 480 }),
  buildTool('surfer-seo', 'Surfer SEO', 'Data-driven content optimization.', 'Surfer analyzes SERPs and guides outlines, keywords, and on-page SEO with AI.', 'https://surferseo.com', mkt, { tags: ['SEO', 'SERP'], pricing: 'Paid', votes: 450 }),
  buildTool('adcreative', 'AdCreative.ai', 'AI ad banners and creatives.', 'AdCreative generates conversion-focused ad images and copy for paid social.', 'https://www.adcreative.ai', mkt, { tags: ['Ads', 'Creative'], pricing: 'Freemium', votes: 410 }),
  buildTool('predis', 'Predis.ai', 'Social media content at scale.', 'Predis creates posts, carousels, and schedules content for Instagram and LinkedIn.', 'https://predis.ai', mkt, { tags: ['Social', 'Schedule'], pricing: 'Freemium', votes: 360 }),
  buildTool('omneky', 'Omneky', 'AI-powered omnichannel ads.', 'Omneky tests and generates ad variants across platforms with performance insights.', 'https://www.omneky.com', mkt, { tags: ['Ads', 'Performance'], pricing: 'Paid', votes: 240 }),
  buildTool('phrasee', 'Phrasee', 'AI brand language for enterprise.', 'Phrasee optimizes marketing language for email, push, and ads at scale.', 'https://phrasee.co', mkt, { tags: ['Enterprise', 'Language'], pricing: 'Paid', votes: 220 }),
  buildTool('hubspot-ai', 'HubSpot AI', 'CRM and marketing AI tools.', 'HubSpot embeds content, email, and sales AI across its customer platform.', 'https://www.hubspot.com/products/artificial-intelligence', mkt, { tags: ['CRM', 'Email'], pricing: 'Freemium', votes: 540 }),
  buildTool('mailchimp-ai', 'Mailchimp AI', 'AI email and campaign tools.', 'Mailchimp generates subject lines, content, and send-time optimization.', 'https://mailchimp.com/features/ai/', mkt, { tags: ['Email', 'Campaigns'], pricing: 'Freemium', votes: 380 }),
  buildTool('buffer-ai', 'Buffer AI Assistant', 'Social posts and ideas with AI.', 'Buffer drafts captions, repurposes content, and suggests posting schedules.', 'https://buffer.com/ai-assistant', mkt, { tags: ['Social', 'Schedule'], pricing: 'Freemium', votes: 320 }),
  buildTool('anyword', 'Anyword', 'Performance marketing copy AI.', 'Anyword predicts copy performance scores before you run ads.', 'https://anyword.com', mkt, { tags: ['Performance', 'Copy'], pricing: 'Freemium', votes: 290 }),

  // Design AI (12)
  buildTool('figma-ai', 'Figma AI', 'AI features inside Figma design.', 'Figma adds generative fill, asset search, and wireframe-to-design workflows.', 'https://www.figma.com', design, { tags: ['UI', 'Collaboration'], pricing: 'Freemium', icon: 'Layers', is_featured: true, votes: 760 }),
  buildTool('uizard', 'Uizard', 'Wireframes to UI with AI.', 'Uizard scans sketches and generates editable mockups and prototypes.', 'https://uizard.io', design, { tags: ['Wireframe', 'Prototype'], pricing: 'Freemium', votes: 420 }),
  buildTool('galileo-ai', 'Galileo AI', 'Generative UI from text prompts.', 'Galileo produces high-fidelity interface designs exportable to Figma.', 'https://www.usegalileo.ai', design, { tags: ['UI', 'Figma'], pricing: 'Freemium', is_trending: true, votes: 510 }),
  buildTool('framer-ai', 'Framer', 'AI website builder and hosting.', 'Framer generates responsive marketing sites with animations and CMS.', 'https://www.framer.com', design, { tags: ['Web', 'No-code'], pricing: 'Freemium', votes: 580 }),
  buildTool('looka', 'Looka', 'AI logo and brand kit generator.', 'Looka creates logos, colors, and brand assets for startups.', 'https://looka.com', design, { tags: ['Logo', 'Branding'], pricing: 'Paid', votes: 440 }),
  buildTool('designs-ai', 'Designs.ai', 'Logos, videos, and mockups suite.', 'Designs.ai bundles copy, voice, video, and design tools for marketers.', 'https://designs.ai', design, { tags: ['Suite', 'Marketing'], pricing: 'Freemium', votes: 320 }),
  buildTool('khroma', 'Khroma', 'AI color palette generator.', 'Khroma learns your taste and generates unlimited color combinations for UI.', 'https://www.khroma.co', design, { tags: ['Color', 'UI'], pricing: 'Free', votes: 280 }),
  buildTool('magician-figma', 'Magician for Figma', 'AI design plugin by Diagram.', 'Magician generates icons, copy, and images inside Figma with one click.', 'https://magician.design', design, { tags: ['Plugin', 'Figma'], pricing: 'Freemium', votes: 350 }),
  buildTool('relume', 'Relume', 'AI sitemap and wireframe for Webflow.', 'Relume builds site maps, wireframes, and style guides for agencies.', 'https://www.relume.io', design, { tags: ['Webflow', 'Sitemap'], pricing: 'Freemium', votes: 390 }),
  buildTool('beautiful-ai', 'Beautiful.ai', 'AI presentation designer.', 'Beautiful.ai formats slides automatically with smart templates and charts.', 'https://www.beautiful.ai', design, { tags: ['Slides', 'Deck'], pricing: 'Freemium', votes: 410 }),
  buildTool('tome', 'Tome', 'AI storytelling presentations.', 'Tome generates narrative decks with images and layouts from prompts.', 'https://tome.app', design, { tags: ['Story', 'Deck'], pricing: 'Freemium', votes: 360 }),
  buildTool('microsoft-designer', 'Microsoft Designer', 'AI graphic design with DALL·E.', 'Designer creates social posts, invitations, and visuals with Copilot integration.', 'https://designer.microsoft.com', design, { tags: ['Microsoft', 'Social'], pricing: 'Free', votes: 480 }),
];

export const TOOL_COUNT = TOOL_SEEDS.length;
