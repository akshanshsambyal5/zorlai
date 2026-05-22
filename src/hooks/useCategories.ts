import { useCallback, useEffect, useState } from 'react';
import { Category } from '../types';
import { ApiError, fetchCategories } from '../lib/api';
import { ensureArray } from '../lib/safeArray';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setCategories(ensureArray(data));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load categories');
      const { getFallbackCategories } = await import('../lib/catalogFallback');
      const fallback = getFallbackCategories();
      setCategories(fallback);
      if (fallback.length > 0) setError(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { categories, loading, error, reload: load };
}
