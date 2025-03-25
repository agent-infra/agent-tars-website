import announcingAgentTarsApp from "./announcing-agent-tars-app.md";
import mcpBringsANewParadigmToLayeredAIApplicationDevelopment from "./mcp-brings-a-new-paradigm-to-layered-ai-application-development.md";
// Map of local markdown imports
const localBlogPosts: Record<string, string> = {
  "announcing-agent-tars-app": announcingAgentTarsApp,
  "mcp-brings-a-new-paradigm-to-layered-ai-application-development":
    mcpBringsANewParadigmToLayeredAIApplicationDevelopment,
};

/**
 * Get blog content by ID
 * @param postId The ID of the blog post
 * @returns The blog content or null if not found
 */
export const getBlogContent = (postId: string): string | null => {
  return localBlogPosts[postId] || null;
};
