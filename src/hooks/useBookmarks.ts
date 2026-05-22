import { useCallback, useEffect, useState } from 'react';
import { AITool } from '../types';
import { ApiError, addBookmark, fetchBookmarks, removeBookmark } from '../lib/api';

export function useBookmarks(isAuthenticated: boolean) {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [savedTools, setSavedTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setBookmarkedIds([]);
      setSavedTools([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const bookmarks = await fetchBookmarks();
      setSavedTools(bookmarks);
      setBookmarkedIds(bookmarks.map((t) => t.id));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setBookmarkedIds([]);
        setSavedTools([]);
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  const toggle = async (toolId: string) => {
    const isSaved = bookmarkedIds.includes(toolId);
    try {
      if (isSaved) {
        await removeBookmark(toolId);
        setBookmarkedIds((prev) => prev.filter((id) => id !== toolId));
        setSavedTools((prev) => prev.filter((t) => t.id !== toolId));
      } else {
        await addBookmark(toolId);
        setBookmarkedIds((prev) => [...prev, toolId]);
      }
      setError(null);
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Bookmark action failed';
      setError(message);
      throw err;
    }
  };

  const isBookmarked = (toolId: string) => bookmarkedIds.includes(toolId);

  return {
    bookmarkedIds,
    savedTools,
    loading,
    error,
    reload: load,
    toggle,
    isBookmarked,
  };
}
