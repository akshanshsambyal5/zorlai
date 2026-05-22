import { useCallback, useEffect, useState } from 'react';
import { ToolSubmission } from '../types';
import {
  ApiError,
  approveSubmission,
  fetchSubmissions,
  rejectSubmission,
  submitTool,
} from '../lib/api';

export function useSubmissions(isAuthenticated: boolean, isAdmin: boolean) {
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isAuthenticated) {
      setSubmissions([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (payload: Omit<ToolSubmission, 'id' | 'status' | 'submittedAt'>) => {
    try {
      const created = await submitTool(payload);
      setSubmissions((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Submission failed';
      setError(message);
      throw err;
    }
  };

  const approve = async (id: string) => {
    if (!isAdmin) throw new Error('Admin required');
    try {
      const { submission, tool } = await approveSubmission(id);
      setSubmissions((prev) => prev.map((s) => (s.id === id ? submission : s)));
      return { submission, tool };
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Approval failed';
      setError(message);
      throw err;
    }
  };

  const reject = async (id: string) => {
    if (!isAdmin) throw new Error('Admin required');
    try {
      const updated = await rejectSubmission(id);
      setSubmissions((prev) => prev.map((s) => (s.id === id ? updated : s)));
      return updated;
    } catch (err) {
      const message = err instanceof ApiError ? err.message : 'Rejection failed';
      setError(message);
      throw err;
    }
  };

  return { submissions, loading, error, reload: load, submit, approve, reject, setSubmissions };
}
