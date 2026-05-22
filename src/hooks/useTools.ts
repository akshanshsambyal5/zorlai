import { useCallback, useEffect, useState } from 'react';
import { AITool } from '../types';
import { ApiError, fetchTools, fetchToolBySlug, voteTool, ToolsQuery } from '../lib/api';
import { ensureArray } from '../lib/safeArray';

export function useTools(query: ToolsQuery = {}) {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTools(query);
      setTools(ensureArray<AITool>(data));
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to load tools';
      setError(message);
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, [query.search, query.category, query.pricing, query.trending]);

  useEffect(() => {
    load();
  }, [load]);

  const vote = async (toolId: string) => {
    try {
      const updated = await voteTool(toolId);
      setTools((prev) => prev.map((t) => (t.id === toolId ? updated : t)));
      return updated;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Failed to vote';
      setError(message);
      throw err;
    }
  };

  const addTool = (tool: AITool) => {
    setTools((prev) => [tool, ...prev]);
  };

  return { tools, loading, error, reload: load, vote, addTool, setTools };
}

export function useToolDetail(slug: string | null) {
  const [tool, setTool] = useState<AITool | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setTool(null);
      return;
    }

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchToolBySlug(slug);
        setTool(data);
      } catch (err) {
        setError(err instanceof ApiError ? err.message : 'Failed to load tool');
        setTool(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  return { tool, loading, error };
}
