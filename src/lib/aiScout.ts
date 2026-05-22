import type { AITool } from '../types';
import { ensureArray } from './safeArray';

export interface ScoutMatch {
  tool: AITool;
  score: number;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'image-generation': ['image', 'art', 'photo', 'picture', 'visual', 'diffusion', 'midjourney', 'dalle'],
  'video-generation': ['video', 'film', 'avatar', 'animation', 'clip'],
  coding: ['code', 'coding', 'developer', 'programming', 'typescript', 'javascript', 'agent', 'app'],
  chatbots: ['chat', 'llm', 'assistant', 'gpt', 'conversation', 'copilot'],
  productivity: ['writing', 'notes', 'meeting', 'workflow', 'productivity', 'document'],
  'voice-ai': ['voice', 'audio', 'speech', 'podcast', 'transcription', 'tts', 'vocal'],
  'music-ai': ['music', 'song', 'audio', 'sound'],
  'research-ai': ['research', 'paper', 'citation', 'academic', 'literature'],
  'marketing-ai': ['marketing', 'seo', 'ads', 'copy', 'social'],
  'design-ai': ['design', 'ui', 'brand', 'presentation', 'figma'],
  'ai-writing': ['writing', 'copy', 'blog', 'essay', 'grammar', 'rewrite', 'content'],
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function rankToolsForQuery(prompt: string, tools: AITool[]): ScoutMatch[] {
  const safeTools = ensureArray(tools);
  if (!safeTools.length) return [];

  const query = prompt.toLowerCase().trim();
  const tokens = tokenize(query);

  const scored = safeTools.map((tool) => {
    let score = 0;
    const haystack = [
      tool.name,
      tool.tagline,
      tool.description,
      tool.category,
      ...tool.tags,
    ]
      .join(' ')
      .toLowerCase();

    if (query.includes(tool.name.toLowerCase())) score += 120;

    for (const token of tokens) {
      if (haystack.includes(token)) score += 12;
      if (tool.name.toLowerCase().includes(token)) score += 18;
      if (tool.tags.some((t) => t.toLowerCase().includes(token))) score += 10;
    }

    const catKeywords = CATEGORY_KEYWORDS[tool.category] ?? [];
    for (const kw of catKeywords) {
      if (query.includes(kw)) score += 25;
    }

    score += tool.rating * 2 + (tool.isTrending ? 8 : 0);
    return { tool, score };
  });

  return scored
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export function formatScoutFallbackResponse(prompt: string, tools: AITool[]): string {
  const matches = rankToolsForQuery(prompt, tools);

  if (matches.length === 0) {
    const top = [...ensureArray(tools)]
      .sort((a, b) => b.votes - a.votes)
      .slice(0, 3);

    if (top.length === 0) {
      return '### AI Scout\n\nNo tools are loaded in the directory yet. Check your Supabase connection or refresh the page.';
    }

    return `### AI Scout (offline mode)\n\nI could not find a strong match for **"${prompt}"**. Here are widely used tools you can explore:\n\n${top
      .map(
        (t) =>
          `- **${t.name}** (${t.pricing}) — ${t.tagline}\n  Category: *${t.category.replace(/-/g, ' ')}*`
      )
      .join('\n\n')}\n\n_Tip: run \`npm run dev\` with \`GEMINI_API_KEY\` for full neural routing._`;
  }

  return `### AI Scout matches\n\nFound **${matches.length}** tool(s) for: *"${prompt}"*\n\n${matches
    .map(
      ({ tool }, i) =>
        `${i + 1}. **${tool.name}** (${tool.pricing})\n   - ${tool.tagline}\n   - Category: *${tool.category.replace(/-/g, ' ')}*\n   - ${tool.description.slice(0, 160)}${tool.description.length > 160 ? '…' : ''}`
    )
    .join('\n\n')}\n\n_Select a tool name in the directory to open its page._`;
}

export async function askAIScout(prompt: string, tools: AITool[]): Promise<{ text: string; source: 'api' | 'local' }> {
  const trimmed = prompt.trim();
  if (!trimmed) {
    return { text: 'Please enter a question about the kind of AI tools you need.', source: 'local' };
  }

  try {
    const response = await fetch('/api/gemini/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: trimmed }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = (await response.json()) as { text?: string };
      if (data.text?.trim()) {
        return { text: data.text.trim(), source: 'api' };
      }
    }
  } catch {
    // fall through to local scout
  }

  return { text: formatScoutFallbackResponse(trimmed, tools), source: 'local' };
}
