export type PricingTier = 'Free' | 'Freemium' | 'Paid' | 'Open Source';

export interface CategorySeed {
  id: string;
  name: string;
  icon: string;
  description: string;
  sort_order: number;
}

export interface ToolSeed {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category_id: string;
  icon: string;
  logo_url: string;
  tags: string[];
  pricing: PricingTier;
  rating: number;
  reviews_count: number;
  votes: number;
  is_trending: boolean;
  is_featured: boolean;
  features: string[];
}

export function faviconFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${host}&sz=128`;
  } catch {
    return 'https://www.google.com/s2/favicons?domain=google.com&sz=128';
  }
}

export function buildTool(
  slug: string,
  name: string,
  tagline: string,
  description: string,
  url: string,
  category_id: string,
  options: {
    tags?: string[];
    pricing?: PricingTier;
    icon?: string;
    rating?: number;
    reviews_count?: number;
    votes?: number;
    is_trending?: boolean;
    is_featured?: boolean;
    features?: string[];
  } = {}
): ToolSeed {
  const safeUrl = url.startsWith('http') ? url : `https://${url}`;
  return {
    id: slug,
    slug,
    name,
    tagline,
    description,
    url: safeUrl,
    category_id,
    icon: options.icon ?? 'Sparkle',
    logo_url: faviconFromUrl(safeUrl),
    tags: options.tags ?? [],
    pricing: options.pricing ?? 'Freemium',
    rating: options.rating ?? 4.5,
    reviews_count: options.reviews_count ?? 10,
    votes: options.votes ?? 100 + (slug.length * 17) % 500,
    is_trending: options.is_trending ?? false,
    is_featured: options.is_featured ?? false,
    features: options.features ?? [tagline],
  };
}
