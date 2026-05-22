import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import { getSupabaseAdmin } from '../lib/supabase';
const router = Router();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: { headers: { 'User-Agent': 'zorlai-directory' } },
      });
    }
  }
  return aiClient;
}

async function fetchCatalogContext() {
  try {
    const supabase = getSupabaseAdmin();
    const { data } = await supabase
      .from('tools')
      .select('name, category_id, pricing, tagline, description')
      .eq('status', 'published')
      .order('votes', { ascending: false })
      .limit(50);

    return (data || []).map((t) => ({
      name: t.name,
      category: t.category_id,
      pricing: t.pricing,
      tagline: t.tagline,
      description: t.description,
    }));
  } catch {
    return [];
  }
}

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Uplink telemetry query parameter prompt is required.' });
  }

  const catalog = await fetchCatalogContext();
  const toolNames = catalog.map((t) => t.name).join(', ');

  const client = getGeminiClient();

  if (client && catalog.length > 0) {
    try {
      const systemInstruction = `You are "ZorlAI Scout Assistant", a premium cybernetic AI directory routing expert.
Analyze the user's software/engineering requirements and map them to relevant tools from our live catalog.

Our current Directory Catalog is:
${JSON.stringify(catalog, null, 2)}

Guidelines:
1. Answer in standard, objective, highly professional Markdown format.
2. Propose 1-2 exact tools that perfectly fit the request. State their Name, category, pricing, and how they solve the user's specific query.
3. If no tool directly fits, suggest the closest matching directory utility and offer a concise technical explanation why.
4. Do not hallucinate tools; stick strictly to our catalog: ${toolNames}.
5. Tone should be futuristic, extremely clean, concise, and helpful.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: prompt,
        config: { systemInstruction, temperature: 0.7 },
      });

      const text = response.text || 'Lapse in downlink stream. Try repeating query parameters.';
      return res.json({ text });
    } catch (err) {
      console.error('Gemini error:', err);
    }
  }

  const query = String(prompt).toLowerCase();
  let matched = catalog.filter(
    (t) =>
      query.includes(t.name.toLowerCase()) ||
      t.name.toLowerCase().split(' ').some((word) => query.includes(word)) ||
      query.includes(t.category.toLowerCase().replace('-', ' ')) ||
      t.tagline.toLowerCase().split(' ').some((word) => word.length > 4 && query.includes(word))
  );

  if (matched.length === 0 && catalog.length > 0) {
    matched = catalog.slice(0, 2);
  }

  const simulatedResponse = `### Directory Analyzer Uplink (Diagnostics Fallback Mode)

Active search metrics matched **${matched.length} node(s)** in ZorlAI directories:

${matched
  .map(
    (t) => `- **${t.name}** [${t.pricing}] • Category: *${t.category}*
  *Tagline*: _${t.tagline}_
  *Utility Context*: ${t.description}
`
  )
  .join('\n')}

*(Note: Configure **GEMINI_API_KEY** in .env.local for full neural routing.)*`;

  return res.json({ text: simulatedResponse });
});

export default router;
