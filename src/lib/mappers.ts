import { AITool, Category, ToolSubmission } from '../types';
import type { Database } from './database.types';
import { faviconFromUrl } from '../data/catalogHelpers';
import { ensureArray } from './safeArray';

type ToolRow = Database['public']['Tables']['tools']['Row'];
type CategoryRow = Database['public']['Tables']['categories']['Row'];
type SubmissionRow = Database['public']['Tables']['tool_submissions']['Row'];

export function mapToolFromDb(row: ToolRow): AITool {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    icon: row.icon,
    logoUrl: row.logo_url || faviconFromUrl(row.url),
    url: row.url,
    category: row.category_id,
    subCategory: row.sub_category ?? undefined,
    tags: ensureArray<string>(row.tags),
    votes: row.votes,
    bookmarks: row.bookmarks_count,
    pricing: row.pricing,
    rating: Number(row.rating),
    reviewsCount: row.reviews_count,
    isTrending: row.is_trending,
    isFeatured: row.is_featured,
    addedAt: row.created_at,
    features: ensureArray<string>(row.features),
  };
}

export function mapCategoryFromDb(row: CategoryRow, count = 0): Category {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    description: row.description,
    count,
  };
}

export function mapSubmissionFromDb(row: SubmissionRow): ToolSubmission {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    url: row.url,
    category: row.category_id,
    pricing: row.pricing,
    tags: row.tags,
    submittedBy: row.submitted_by,
    status: row.status,
    submittedAt: new Date(row.created_at).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
}
