import quickStart from "./guide/quick-start.md";
import troubeShooting from "./guide/trouble-shooting.md"

// Map of local markdown imports
const localDocumentations: Record<string, string> = {
  "quick-start": quickStart,
  "trouble-shooting": troubeShooting,
};

/**
 * Get markdown content by path ID
 * @param pathId The local path ID for the markdown file
 * @returns The markdown content or null if not found
 */
export const getLocalDoc = (pathId: string): string | null => {
  return localDocumentations[pathId] || null;
};
