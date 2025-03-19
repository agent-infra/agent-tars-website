import announcingAgentTarsPreview from "./announcing-agent-tars-preview.md";

// Map of local markdown imports
const localBlogPosts: Record<string, string> = {
  "announcing-agent-tars-preview": announcingAgentTarsPreview,
};

/**
 * Get blog content by ID
 * @param postId The ID of the blog post
 * @returns The blog content or null if not found
 */
export const getBlogContent = (postId: string): string | null => {
  return localBlogPosts[postId] || null;
};
