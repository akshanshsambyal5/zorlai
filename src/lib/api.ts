import { AITool, Category, ToolSubmission } from '../types';
import { getSupabase } from './supabase';

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
    throw new ApiError(payload.error || 'Request failed', response.status);
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
  const data = await request<{ tools: AITool[] }>(`/api/tools${qs ? `?${qs}` : ''}`);
  return data.tools;
}

export async function fetchToolBySlug(slug: string): Promise<AITool | null> {
  try {
    const data = await request<{ tool: AITool }>(`/api/tools/${encodeURIComponent(slug)}`);
    return data.tool;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await request<{ categories: Category[] }>('/api/categories');
  return data.categories;
}

export async function voteTool(toolId: string): Promise<AITool> {
  const data = await request<{ tool: AITool }>(`/api/tools/${encodeURIComponent(toolId)}/vote`, {
    method: 'POST',
  });
  return data.tool;
}

export async function fetchBookmarks(): Promise<AITool[]> {
  const data = await request<{ bookmarks: AITool[] }>('/api/bookmarks');
  return data.bookmarks;
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
  const data = await request<{ submissions: ToolSubmission[] }>('/api/submissions');
  return data.submissions;
}

export async function submitTool(
  submission: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>
): Promise<ToolSubmission> {
  const data = await request<{ submission: ToolSubmission }>('/api/submissions', {
    method: 'POST',
    body: JSON.stringify(submission),
  });
  return data.submission;
}

export async function approveSubmission(id: string): Promise<{ submission: ToolSubmission; tool?: AITool }> {
  return request(`/api/admin/submissions/${encodeURIComponent(id)}/approve`, { method: 'POST' });
}

export async function rejectSubmission(id: string): Promise<ToolSubmission> {
  const data = await request<{ submission: ToolSubmission }>(
    `/api/admin/submissions/${encodeURIComponent(id)}/reject`,
    { method: 'POST' }
  );
  return data.submission;
}

export async function fetchLikedTools(): Promise<AITool[]> {
  const data = await request<{ tools: AITool[] }>('/api/me/liked-tools');
  return data.tools;
}

export async function subscribeNewsletter(email: string): Promise<void> {
  await request('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
