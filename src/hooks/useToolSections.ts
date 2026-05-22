import { useMemo } from 'react';
import { AITool } from '../types';
import {
  filterTools,
  getHomeToolSections,
  ToolsListMode,
  type HomeToolSections,
} from '../lib/toolFilters';

interface UseToolSectionsOptions {
  search?: string;
  pricing?: string;
  limit?: number;
}

/** Derive section lists from one catalog fetch — no extra API calls */
export function useToolSections(tools: AITool[] | null | undefined) {
  const homeSections = useMemo(() => getHomeToolSections(tools), [tools]);

  const getFiltered = useMemo(
    () => (mode: ToolsListMode, options?: UseToolSectionsOptions) =>
      filterTools(tools, mode, options),
    [tools]
  );

  return { homeSections, getFiltered };
}

export type { HomeToolSections };
