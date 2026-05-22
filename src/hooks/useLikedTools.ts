import { useCallback, useEffect, useState } from 'react';
import { AITool } from '../types';
import { ApiError, fetchLikedTools } from '../lib/api';
import { ensureArray } from '../lib/safeArray';

export function useLikedTools(isAuthenticated: boolean) {
  const [likedTools, setLikedTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setLikedTools([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const tools = await fetchLikedTools();
      setLikedTools(ensureArray(tools));
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setLikedTools([]);
        return;
      }
      setError(err instanceof ApiError ? err.message : 'Failed to load liked tools');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  return { likedTools, loading, error, reload: load };
}
