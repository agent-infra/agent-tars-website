import announcingAgentTarsPreview from "../blog/announcing-agent-tars-preview.md";

// Map of local markdown imports
const localBlogPosts: Record<string, string> = {
  "announcing-agent-tars": announcingAgentTarsPreview,
  // Add more blog posts here
};

/**
 * Get blog content by ID
 * @param postId The ID of the blog post
 * @returns The blog content or null if not found
 */
export const getBlogContent = (postId: string): string | null => {
  return localBlogPosts[postId] || null;
};

/**
 * Check if a blog post exists
 * @param postId The ID of the blog post to check
 * @returns True if the blog post exists
 */
export const hasBlogPost = (postId: string): boolean => {
  return !!localBlogPosts[postId];
};
