import quickStart from "../docs/quick-start.md";

// Map of local markdown imports
const localMarkdowns: Record<string, string> = {
  "quick-start": quickStart,
  // Add more local markdown files here
};

/**
 * Get markdown content by path ID
 * @param pathId The local path ID for the markdown file
 * @returns The markdown content or null if not found
 */
export const getLocalMarkdown = (pathId: string): string | null => {
  return localMarkdowns[pathId] || null;
};

/**
 * Check if a local markdown file exists
 * @param pathId The local path ID to check
 * @returns True if the local markdown exists
 */
export const hasLocalMarkdown = (pathId: string): boolean => {
  return !!localMarkdowns[pathId];
};
