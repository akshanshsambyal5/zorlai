import type { MouseEvent } from 'react';
import { AITool, Category } from '../types';
import { PageShell } from '../components/layout/PageShell';
import { ToolsGrid, buildCategoryNameMap } from '../components/tools/ToolsGrid';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { usePageMeta } from '../hooks/usePageMeta';
import { paths } from '../lib/router';

interface SavedToolsPageProps {
  tools: AITool[];
  categories: Category[];
  loading: boolean;
  bookmarkedIds: string[];
  onBookmarkToggle: (id: string, e: MouseEvent) => void;
  onVote: (id: string, e: MouseEvent) => void;
  onOpenDetails: (tool: AITool) => void;
  onOpenToolPage: (tool: AITool) => void;
}

export function SavedToolsPage(props: SavedToolsPageProps) {
  usePageMeta({
    title: 'Saved Tools — ZorlAI',
    description: 'Your bookmarked AI tools on ZorlAI.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${paths.saved()}`,
  });

  return (
    <ProtectedRoute>
      <PageShell title="Saved tools" subtitle="Bookmarks you've saved while exploring the directory" badge="Your library">
        <ToolsGrid
          tools={props.tools}
          loading={props.loading}
          error={null}
          bookmarkedIds={props.bookmarkedIds}
          categoryNames={buildCategoryNameMap(props.categories)}
          onBookmarkToggle={props.onBookmarkToggle}
          onVote={props.onVote}
          onOpenDetails={props.onOpenDetails}
          onOpenToolPage={props.onOpenToolPage}
        />
      </PageShell>
    </ProtectedRoute>
  );
}
