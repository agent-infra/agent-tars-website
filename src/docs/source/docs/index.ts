import quickStart from "./guide/quick-start.md";
import troubeShooting from "./guide/trouble-shooting.md"

// Map of local markdown imports
const localDocumentations: Record<string, string> = {
  "quick-start": quickStart,
  "trouble-shooting": troubeShooting,
};

/**
 * Get markdown content by ID
 * @param docId The document ID
 * @returns The markdown content or null if not found
 */
export const getLocalDoc = (docId: string): string | null => {
  return localDocumentations[docId] || null;
};
