export interface AITool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  logoUrl: string;
  url: string;
  category: string;
  subCategory?: string;
  tags: string[];
  votes: number;
  bookmarks: number;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  rating: number;
  reviewsCount: number;
  isTrending: boolean;
  isFeatured: boolean;
  addedAt: string;
  features: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  readTime: string;
  publishedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface ToolSubmission {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source';
  tags: string;
  submittedBy: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}
