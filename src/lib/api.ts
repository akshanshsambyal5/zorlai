import { AITool, Category, ToolSubmission } from '../types';
import { getSupabase } from './supabase';
import { ensureArray } from './safeArray';
import { normalizeTool } from './normalizeTool';
import {
  getFallbackCategories,
  getFallbackToolBySlug,
  getFallbackTools,
} from './catalogFallback';
import {
  fetchCategoriesFromSupabase,
  fetchToolBySlugFromSupabase,
  fetchToolsFromSupabase,
} from './supabaseCatalog';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/** Express API — works on localhost (`npm run dev`), not on Vercel static hosting. */
const USE_EXPRESS_API =
  import.meta.env.VITE_USE_EXPRESS_API === 'true' ||
  (import.meta.env.DEV && import.meta.env.VITE_USE_EXPRESS_API !== 'false');

async function getAuthHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  try {
    const { data } = await getSupabase().auth.getSession();
    const token = data.session?.access_token;
    if (token) headers.Authorization = `Bearer ${token}`;
  } catch {
    // unauthenticated requests are allowed for public endpoints
  }
  return headers;
}

function isJsonResponse(response: Response): boolean {
  const ct = response.headers.get('content-type') || '';
  return ct.includes('application/json');
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const headers = await getAuthHeaders();
    const response = await fetch(path, {
      ...options,
      headers: { ...headers, ...options.headers },
    });

    if (!isJsonResponse(response)) {
      return null;
    }

    const payload = await response.json().catch(() => null);
    if (!payload || typeof payload !== 'object') return null;

    if (!response.ok) {
      const errBody = payload as { error?: string };
      throw new ApiError(errBody.error || 'Request failed', response.status);
    }

    return payload as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    return null;
  }
}

export interface ToolsQuery {
  search?: string;
  category?: string | null;
  pricing?: string;
  trending?: boolean;
}

async function fetchToolsFromExpressApi(query: ToolsQuery): Promise<AITool[] | null> {
  if (!USE_EXPRESS_API) return null;

  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.category) params.set('category', query.category);
  if (query.pricing && query.pricing !== 'All') params.set('pricing', query.pricing);
  if (query.trending) params.set('trending', 'true');

  const qs = params.toString();
  const data = await request<{ tools?: unknown }>(`/api/tools${qs ? `?${qs}` : ''}`);
  if (!data) return null;

  const tools = ensureArray<AITool>(data.tools).map((t) => normalizeTool(t));
  return tools.length > 0 ? tools : null;
}

/** Tools: Express API → Supabase (browser) → bundled catalog (always works on Vercel). */
export async function fetchTools(query: ToolsQuery = {}): Promise<AITool[]> {
  try {
    const fromApi = await fetchToolsFromExpressApi(query);
    if (fromApi?.length) return fromApi;
  } catch {
    // try next source
  }

  try {
    const fromDb = await fetchToolsFromSupabase(query);
    if (fromDb.length > 0) return fromDb;
  } catch {
    // try fallback
  }

  return getFallbackTools(query);
}

export async function fetchToolBySlug(slug: string): Promise<AITool | null> {
  if (USE_EXPRESS_API) {
    try {
      const data = await request<{ tool?: unknown }>(`/api/tools/${encodeURIComponent(slug)}`);
      if (data?.tool && typeof data.tool === 'object') {
        return normalizeTool(data.tool as AITool);
      }
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // continue to other sources
      } else if (!(err instanceof ApiError)) {
        // network — try other sources
      } else {
        throw err;
      }
    }
  }

  try {
    const fromDb = await fetchToolBySlugFromSupabase(slug);
    if (fromDb) return fromDb;
  } catch {
    // fallback
  }

  return getFallbackToolBySlug(slug);
}

export async function fetchCategories(): Promise<Category[]> {
  if (USE_EXPRESS_API) {
    try {
      const data = await request<{ categories?: unknown }>('/api/categories');
      const categories = ensureArray<Category>(data?.categories);
      if (categories.length > 0) return categories;
    } catch {
      // try next source
    }
  }

  try {
    const fromDb = await fetchCategoriesFromSupabase();
    if (fromDb.length > 0) return fromDb;
  } catch {
    // fallback
  }

  return getFallbackCategories();
}

export async function voteTool(toolId: string): Promise<AITool> {
  const data = await request<{ tool?: unknown }>(`/api/tools/${encodeURIComponent(toolId)}/vote`, {
    method: 'POST',
  });
  if (!data?.tool || typeof data.tool !== 'object') {
    throw new ApiError('Voting requires the API server. Run locally or configure Supabase.', 503);
  }
  return normalizeTool(data.tool as AITool);
}

export async function fetchBookmarks(): Promise<AITool[]> {
  const data = await request<{ bookmarks?: unknown }>('/api/bookmarks');
  if (!data) return [];
  return ensureArray<AITool>(data.bookmarks).map((t) => normalizeTool(t));
}

export async function addBookmark(toolId: string): Promise<void> {
  const ok = await request('/api/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ toolId }),
  });
  if (ok === null) throw new ApiError('Bookmarks require sign-in and API server.', 503);
}

export async function removeBookmark(toolId: string): Promise<void> {
  const ok = await request(`/api/bookmarks/${encodeURIComponent(toolId)}`, { method: 'DELETE' });
  if (ok === null) throw new ApiError('Bookmarks require sign-in and API server.', 503);
}

export async function fetchSubmissions(): Promise<ToolSubmission[]> {
  const data = await request<{ submissions?: unknown }>('/api/submissions');
  if (!data) return [];
  return ensureArray<ToolSubmission>(data.submissions);
}

export async function submitTool(
  submission: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>
): Promise<ToolSubmission> {
  const data = await request<{ submission?: ToolSubmission }>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(submission),
  });
  if (!data?.submission) throw new ApiError('Submissions require the API server.', 503);
  return data.submission;
}

export async function approveSubmission(id: string): Promise<{ submission: ToolSubmission; tool?: AITool }> {
  const result = await request<{ submission: ToolSubmission; tool?: unknown }>(
    `/api/admin/submissions/${encodeURIComponent(id)}/approve`,
    { method: 'POST' }
  );
  if (!result?.submission) throw new ApiError('Admin API unavailable.', 503);
  return {
    submission: result.submission,
    tool: result.tool ? normalizeTool(result.tool as AITool) : undefined,
  };
}

export async function rejectSubmission(id: string): Promise<ToolSubmission> {
  const data = await request<{ submission?: ToolSubmission }>(
    `/api/admin/submissions/${encodeURIComponent(id)}/reject`,
    { method: 'POST' }
  );
  if (!data?.submission) throw new ApiError('Admin API unavailable.', 503);
  return data.submission;
}

export async function fetchLikedTools(): Promise<AITool[]> {
  const data = await request<{ tools?: unknown }>('/api/me/liked-tools');
  if (!data) return [];
  return ensureArray<AITool>(data.tools).map((t) => normalizeTool(t));
}

export async function subscribeNewsletter(email: string): Promise<void> {
  const ok = await request('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  if (ok === null) {
    // Newsletter is optional on static deploy — do not crash the UI
    console.warn('Newsletter API unavailable on static hosting.');
  }
}
