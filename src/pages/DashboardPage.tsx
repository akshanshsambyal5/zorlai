import type { MouseEvent } from 'react';
import { Dashboard } from '../components/Dashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { usePageMeta } from '../hooks/usePageMeta';
import { navigate } from '../lib/router';
import { AITool, ToolSubmission } from '../types';

interface DashboardPageProps {
  bookmarks: AITool[];
  likedTools: AITool[];
  submissions: ToolSubmission[];
  isAdmin: boolean;
  onRemoveBookmark: (id: string, e: MouseEvent) => void;
  onApproveSubmission: (id: string) => void;
  onRejectSubmission: (id: string) => void;
  onSelectTool: (tool: AITool) => void;
}

export function DashboardPage(props: DashboardPageProps) {
  usePageMeta({
    title: 'Dashboard — ZorlAI',
    description: 'Your bookmarks, liked tools, and submissions on ZorlAI.',
    canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard`,
  });

  return (
    <ProtectedRoute>
      <Dashboard
        isOpen
        onClose={() => navigate('/')}
        {...props}
      />
    </ProtectedRoute>
  );
}
