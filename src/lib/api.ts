import { AITool, Category, ToolSubmission } from '../types';
import { getSupabase } from './supabase';
import { ensureArray } from './safeArray';
import { normalizeTool } from './normalizeTool';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = await getAuthHeaders();
  const response = await fetch(path, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errBody = payload as { error?: string };
    throw new ApiError(errBody.error || 'Request failed', response.status);
  }

  return payload as T;
}

export interface ToolsQuery {
  search?: string;
  category?: string | null;
  pricing?: string;
  trending?: boolean;
}

export async function fetchTools(query: ToolsQuery = {}): Promise<AITool[]> {
  const params = new URLSearchParams();
  if (query.search) params.set('search', query.search);
  if (query.category) params.set('category', query.category);
  if (query.pricing && query.pricing !== 'All') params.set('pricing', query.pricing);
  if (query.trending) params.set('trending', 'true');

  const qs = params.toString();
  const data = await request<{ tools?: unknown }>(`/api/tools${qs ? `?${qs}` : ''}`);
  return ensureArray<AITool>(data.tools).map((t) => normalizeTool(t));
}

export async function fetchToolBySlug(slug: string): Promise<AITool | null> {
  try {
    const data = await request<{ tool?: unknown }>(`/api/tools/${encodeURIComponent(slug)}`);
    if (!data.tool || typeof data.tool !== 'object') return null;
    return normalizeTool(data.tool as AITool);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await request<{ categories?: unknown }>('/api/categories');
  return ensureArray<Category>(data.categories);
}

export async function voteTool(toolId: string): Promise<AITool> {
  const data = await request<{ tool?: unknown }>(`/api/tools/${encodeURIComponent(toolId)}/vote`, {
    method: 'POST',
  });
  if (!data.tool || typeof data.tool !== 'object') {
    throw new ApiError('Invalid vote response', 500);
  }
  return normalizeTool(data.tool as AITool);
}

export async function fetchBookmarks(): Promise<AITool[]> {
  const data = await request<{ bookmarks?: unknown }>('/api/bookmarks');
  return ensureArray<AITool>(data.bookmarks).map((t) => normalizeTool(t));
}

export async function addBookmark(toolId: string): Promise<void> {
  await request('/api/bookmarks', {
    method: 'POST',
    body: JSON.stringify({ toolId }),
  });
}

export async function removeBookmark(toolId: string): Promise<void> {
  await request(`/api/bookmarks/${encodeURIComponent(toolId)}`, { method: 'DELETE' });
}

export async function fetchSubmissions(): Promise<ToolSubmission[]> {
  const data = await request<{ submissions?: unknown }>('/api/submissions');
  return ensureArray<ToolSubmission>(data.submissions);
}

export async function submitTool(
  submission: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>
): Promise<ToolSubmission> {
  const data = await request<{ submission?: ToolSubmission }>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(submission),
  });
  if (!data.submission) throw new ApiError('Invalid submission response', 500);
  return data.submission;
}

export async function approveSubmission(id: string): Promise<{ submission: ToolSubmission; tool?: AITool }> {
  const result = await request<{ submission: ToolSubmission; tool?: unknown }>(
    `/api/admin/submissions/${encodeURIComponent(id)}/approve`,
    { method: 'POST' }
  );
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
  if (!data.submission) throw new ApiError('Invalid rejection response', 500);
  return data.submission;
}

export async function fetchLikedTools(): Promise<AITool[]> {
  const data = await request<{ tools?: unknown }>('/api/me/liked-tools');
  return ensureArray<AITool>(data.tools).map((t) => normalizeTool(t));
}

export async function subscribeNewsletter(email: string): Promise<void> {
  await request('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
