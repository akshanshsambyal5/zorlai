import type { AITool } from '../types';
import { ensureArray } from './safeArray';

/** Normalize tool payloads so tags/features are always arrays (safe for .map / spread). */
export function normalizeTool(tool: AITool): AITool {
  return {
    ...tool,
    tags: ensureArray<string>(tool.tags),
    features: ensureArray<string>(tool.features),
  };
}
