export type PricingTier = 'Free' | 'Freemium' | 'Paid' | 'Open Source';
export type SubmissionStatus = 'pending' | 'approved' | 'rejected';
export type ToolStatus = 'draft' | 'published';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          is_admin?: boolean;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          description: string;
          sort_order: number;
          created_at: string;
        };
      };
      tools: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string;
          description: string;
          icon: string;
          logo_url: string | null;
          url: string;
          category_id: string;
          sub_category: string | null;
          tags: string[];
          votes: number;
          bookmarks_count: number;
          pricing: PricingTier;
          rating: number;
          reviews_count: number;
          is_trending: boolean;
          is_featured: boolean;
          features: string[];
          status: ToolStatus;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          name: string;
          tagline?: string;
          description?: string;
          icon?: string;
          logo_url?: string | null;
          url: string;
          category_id: string;
          sub_category?: string | null;
          tags?: string[];
          votes?: number;
          bookmarks_count?: number;
          pricing?: PricingTier;
          rating?: number;
          reviews_count?: number;
          is_trending?: boolean;
          is_featured?: boolean;
          features?: string[];
          status?: ToolStatus;
        };
        Update: {
          votes?: number;
          bookmarks_count?: number;
          status?: ToolStatus;
        };
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          tool_id: string;
        };
      };
      tool_votes: {
        Row: {
          id: string;
          user_id: string;
          tool_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          tool_id: string;
        };
      };
      tool_submissions: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          tagline: string;
          description: string;
          url: string;
          category_id: string;
          pricing: PricingTier;
          tags: string;
          submitted_by: string;
          status: SubmissionStatus;
          reviewed_at: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          tagline?: string;
          description?: string;
          url: string;
          category_id: string;
          pricing?: PricingTier;
          tags?: string;
          submitted_by: string;
          user_id?: string | null;
        };
        Update: {
          status?: SubmissionStatus;
          reviewed_at?: string | null;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
        };
        Insert: {
          email: string;
        };
        Update: Record<string, never>;
      };
    };
  };
}
